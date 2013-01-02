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

Ea.Requirement = {};

Ea.Requirement._Base = extend(Ea.Types.Named, {},
{
	meta: {
		//id: "RequirementID",
		api: "Requirement",
		objectType: 9
	},

	getType: function(source) {
		return this._deriveType(source, this._type);
	},

	/**
	 * @type {Number}
	 */
	_id: property({api: "RequirementID"}),
	
	/**
	 * @type {Ea.DataTypes.Date}
	 */
	_modified: property({api: "LastUpdate"}),
	
	_notes: property({api: "Notes"}),
	
	_priority: property({api: "Priority"}),
	
	_stability: property({api: "Stability"}),
	
	_status: property({api: "Status"}),
	
	_difficulty: property({api: "Difficulty"}),
	
	_type: property({api: "Type"})
});
