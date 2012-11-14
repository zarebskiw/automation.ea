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

Core.Target = {
	type: {
		info: 0,
		debug: 1,
		tree: 2
	}
};

Core.Target.AbstractTarget = define({
	
	_type: null,
	
	create: function(type) {
		_super.create();
		this._type = type;
	},
	
	write: function(message) {
		
	},
	
	isDebug: function() {
		return this._type == Core.Target.type.debug;
	}
});
