/*
   Copyright 2011 300 D&C

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

include("Sys@Sys");
include("Sys.IO@Sys");
include("Ea@Ea");

Search = {
	params: {
		
	},

	file: null,
	found: new Core.Types.Collection(),
	application: null,

	execute: function(params) {

		this.application = Ea.initializeDefaultApplication(params);

		info("=== START ===");
		
		var _package = this.application.getRepository().getSelectedPackage();
		
		if (this.params.file) {
			this.file = new Sys.IO.File(this.params.file, Sys.IO.Mode.WRITE);
		}
		
		this.processElement(_package);
		
		this.processOutput();

		info("=== FINISHED ===");
	},
	
	xml: "",
	out: function(xml) {
		this.xml = this.xml + xml;
		if (this.file) {
			this.file.writeLine(xml);
		}
	},
	
	processOutput: function() {
		this.out("<?xml version=\"1.0\" encoding=\"windows-1250\"?>"); 
		this.out("<ReportViewData UID=\"MySearchID\">");
		this.out("<Fields>");
		this.out("<Field name=\"CLASSGUID\"/>");
		this.out("<Field name=\"CLASSTYPE\"/>");
		var columns = Search.params.output;
		for (var column in columns) {
			this.out("<Field name=\"" + column + "\"/>");
			var def = columns[column];
			columns[column] = {
				def: def,
				fn: new Function("return " + def + ";")
			};
		}
		this.out("</Fields>");
		this.out("<Rows>");

		var columns = this.params.output;
		this.found.forEach(function(element) {
			this.out("<Row>");
			this.out("<Field name=\"CLASSGUID\" value=\"" + element.getGuid() + "\"/>");
			this.out("<Field name=\"CLASSTYPE\" value=\"" + element._getType() + "\"/>");
			for (var column in columns) {
				var fn = columns[column].fn;
				var value = fn.call(element);
				value = value ? (value + "").replace(/"/g, "'").replace(/</g, "&lt;").replace(/>/g, "&gt;") : "";
				this.out("<Field name=\"" + column + "\" value=\"" + value + "\"/>");
			}
			this.out("</Row>");
		});
		
		this.out("</Rows>");
		this.out("</ReportViewData>");

		this.application.getRepository().renderSearchResults(this.xml);
	},
	
	processElement: function(element) {
		Ea.log(element);
		this.found.addAll(element.getElements().filter(this.params.filter));
		if (!element.instanceOf(Ea.Package._Base)) {
			this.found.addAll(element.getEmbeddedElements().filter(this.params.filter));
		}
		
		element.getElements().forEach(function(element) {
			this.processElement(element);
		});
		if (element.instanceOf(Ea.Package._Base)) {
			element.getPackages().forEach(function(element) {
				this.processElement(element);
			});
		}
		else {
			element.getEmbeddedElements().forEach(function(element) {
				this.processElement(element);
			});
		}
	}
	
};
