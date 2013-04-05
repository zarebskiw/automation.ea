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

Ea.Scenario = {
		meta: {
			guid: "ScenarioGUID",
			objectType: 10
		}
};

Ea.Scenario._Base = extend(Ea.Types.Namespace, {
	
	getContext: function() {
		return this._source.application.getRepository().getScenarioContext(this);
	}
},
{
	determineType: function(source) {
		return this._deriveType(source, this._type);
	},

	/**
	 * Scenario guid
	 */
	_guid: property({api: "ScenarioGUID"}),
	
	/**
	 * Scenario type
	 */
	_type: property({api: "Type"}),
	
	/**
	 * Scenario notes
	 */
	_notes: property({api: "Notes"}),

	/**
	 * Scenario steps collection
	 * 
	 * @type {Ea.Collection._Base<Ea.ScenarioStep._Base>}
	 * @qualifier {String} pos
	 * @aggregation composite
	 */
	_step: property({api: "Steps"}),
	
	/**
	 * Scenario context model
	 * 
	 * @derived
	 * @readOnly
	 * @type {Object}
	 */
	_context: property()
});

Ea.Scenario.BasicPath = extend(Ea.Scenario._Base, {});

include("Ea.ScenarioExtension@Ea.Types.Element.Scenario");
include("Ea.ScenarioStep@Ea.Types.Element.Scenario");
