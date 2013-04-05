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

Ea.Constraint = {
		meta: {
			objectType: 11
		}
};

Ea.Constraint._Base = extend(Ea.Types.Named, {},
{
	determineType: function(source) {
		return this._deriveType(source, this._type);
	},

	/**
	 * Constraint notes
	 */
	_notes: property({api: "Notes"}),
	
	/**
	 * Constraint status
	 */
	_status: property({api: "Status"}),
	
	/**
	 * Constraint weight
	 * 
	 * @type {Number}
	 */
	_weight: property({api: "Weight"}),
	
	/**
	 * Constraint type
	 */
	_type: property({api: "Type"}),
	
	/**
	 * Constraint parent element
	 * 
	 * @private
	 * @readOnly
	 * @type {Ea.Element._Base}
	 */
	__parent: property({api: "ParentID", referenceBy: "id"})
});
