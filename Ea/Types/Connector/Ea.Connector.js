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

Ea.register("Ea.ConnectorEnd@Ea.Types.Connector", 22);

Ea.Connector = {};

Ea.Connector._Base = extend(Ea.Types.Namespace, {
	
	_features: null,
	
	_clientAttribute: null,
	_clientMethod: null,
	_supplierAttribute: null,
	_supplierMethod: null,
	
	_getFeatures: function() {
		if (!this._features || Ea.mm) {
			var features = this._features = {
				client: null,
				supplier: null,
				unknown: null
			};
			var _features = this._getStyleEx();
			_features = _features.replace(/LF([SE])P=(\{[0-9a-z\-]+\})([LR]);/gi, function(match, z1, guid, z2, replaced) {
				var direction = (z1 == "E" ? "supplier" : (z1 == "S" ? "client" : "unknown"));
				features[direction] = guid;
				return "";
			});
			if (this._features.client) {
				this._clientAttribute = this._source.getApplication().getRepository().getByGuid(Ea.Attribute._Base, this._features.client);
				this._clientMethod = this._source.getApplication().getRepository().getByGuid(Ea.Method._Base, this._features.client);
			}
			if (this._features.supplier) {
				this._supplierAttribute = this._source.getApplication().getRepository().getByGuid(Ea.Attribute._Base, this._features.supplier);
				this._supplierMethod = this._source.getApplication().getRepository().getByGuid(Ea.Method._Base, this._features.supplier);
			}
		}
	},
	
	getClientAttribute: function() {
		this._getFeatures();
		return this._clientAttribute;
	},
	
	getClientMethod: function() {
		this._getFeatures();
		return this._clientMethod;
	},
	
	getSupplierAttribute: function() {
		this._getFeatures();
		return this._supplierAttribute;
	},
	
	getSupplierMethod: function() {
		this._getFeatures();
		return this._supplierMethod;
	},
	
	getRelation: function(client) {
		return client ? "links from" : "links to";
	},
	
	_otherEnd: null,
	
	getOtherEnd: function(thisEnd) {
		if (!this._otherEnd || Ea.mm) {
			this._otherEnd = this.getClient() == thisEnd ? this.getSupplier() : this.getClient();
		}
		return this._otherEnd;
	},
	
	_toString: function() {
		var client = this.getClientEnd().getRole();
		client = client ? " (" + client + ")" : "";
		client = this.getClient()._toString() + client;
		
		var supplier = this.getSupplierEnd().getRole();
		supplier = supplier ? " (" + supplier + ")" : "";
		supplier = this.getSupplier()._toString() + supplier;
		
		var connection = "--" + this.getName() + "-->";
		return client + " " + connection + " " + supplier + " [" + this._class + "]";
	}
},
{
	api: "Connector",
	
	_id: attribute({api: "ConnectorID", type: Number, id: "id"}),
	_guid: attribute({api: "ConnectorGUID", id: "guid"}),
	_type: attribute({api: "Type"}),
	
	_alias: attribute({api: "Alias"}),
	_notes: attribute({api: "Notes"}),
	_stereotype: attribute({api: "Stereotype"}),
	_direction: attribute({api: "Direction"}),

	_eventFlags: attribute({api: "EventFlags", type: Ea.DataTypes.Map}),
	_stateFlags: attribute({api: "StateFlags", type: Ea.DataTypes.Map}),
	_metaType: attribute({api: "MetaType", private: true}),
	_miscData0: attribute({api: "MiscData", private: true, index: 0}),
	_miscData1: attribute({api: "MiscData", private: true, index: 1}),
	_miscData2: attribute({api: "MiscData", private: true, index: 2}),
	_miscData3: attribute({api: "MiscData", private: true, index: 3}),
	_miscData4: attribute({api: "MiscData", private: true, index: 4}),

	_client: attribute({api: "ClientID", type: "Ea.Element._Base", referenceBy: "id"}),
	_supplier: attribute({api: "SupplierID", type: "Ea.Element._Base", referenceBy: "id"}),
	
	_clientAttribute: derived({getter: "getClientAttribute", type: "Ea.Attribute._Base"}),
	_clientMethod: derived({getter: "getClientMethod", type: "Ea.Method._Base"}),
	_supplierAttribute: derived({getter: "getSupplierAttribute", type: "Ea.Attribute._Base"}),
	_supplierMethod: derived({getter: "getSupplierMethod", type: "Ea.Method._Base"}),
	
	_clientEnd: attribute({api: "ClientEnd", type: "Ea.ConnectorEnd._Base", aggregation: "composite"}),
	_supplierEnd: attribute({api: "SupplierEnd", type: "Ea.ConnectorEnd._Base", aggregation: "composite"}),
	
	_styleEx: attribute({api: "StyleEx", private: true}),

	_guard: attribute({api: "TransitionGuard"}),
	_transitionAction: attribute({api: "TransitionAction"}),
	_transitionEvent: attribute({api: "TransitionEvent"}),
	_virtualInheritance: attribute({api: "VirtualInheritance"}),

	_tags: attribute({api: "TaggedValues", type: "Ea.Collection.Map", elementType: "Ea.ConnectorTag._Base", key: "this.getName()", value: "this", aggregation: "composite"}),
	_constraints: attribute({api: "Constraints", type: "Ea.Collection._Base", elementType: "Ea.ConnectorConstraint._Base", aggregation: "composite"}),
	_customProperties: attribute({api: "CustomProperties", type: "Ea.Collection.Map", elementType: "Ea.CustomProperty._Base", key: "this.getName()", value: "this.getValue()", aggregation: "composite"}),
	_properties: attribute({api: "Properties", type: "Ea.Properties._Base", elementType: "Ea.Property._Base", key: "this.getName()", value: "this", aggregation: "composite"}),

	getType: function(source) {
		return this._deriveType(source, this._type);
	}
});

Ea.Connector.Aggregation = extend(Ea.Connector._Base, {
	getRelation: function(client) {
		return client ? "composed of" : "part of";
	}
});

Ea.Connector.ControlFlow = extend(Ea.Connector._Base, {
	getRelation: function(client) {
		return client ? "transition from" : "transition to";
	}
});

Ea.Connector.Dependency = extend(Ea.Connector._Base, {
	getRelation: function(client) {
		return client ? "needed by" : "depends on";
	}
});

Ea.Connector.Generalization = extend(Ea.Connector._Base, {
	getRelation: function(client) {
		return client ? "supertype of" : "subtype of";
	}
});

Ea.Connector.Nesting = extend(Ea.Connector._Base, {
	getRelation: function(client) {
		return client ? "owns" : "owned by";
	}
});

Ea.Connector.ObjectFlow = extend(Ea.Connector._Base, {
	getRelation: function(client) {
		return client ? "transition from" : "transition to";
	}
});

Ea.Connector.Realisation = extend(Ea.Connector._Base, {
	getRelation: function(client) {
		return client ? "realized by" : "implements";
	}
});

Ea.Connector.StateFlow = extend(Ea.Connector._Base, {
	getRelation: function(client) {
		return client ? "transition from" : "transition to";
	}
});

Ea.Connector.Sequence = extend(Ea.Connector._Base, {},
{
	_sequenceNo: attribute({api: "SequenceNo", type: Number})
});

Ea.register("Ea.ConnectorTag@Ea.Types.Connector", 36);
Ea.register("Ea.ConnectorConstraint@Ea.Types.Connector", 37);
