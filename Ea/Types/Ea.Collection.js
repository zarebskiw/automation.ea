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

Ea.Collection = {};

Ea.Collection._Base = extend(Core.Types.Collection, {
	create: function(params) {
		_super.create(params);
	}
},
{
	getType: function() {
		return Ea.Collection._Base;
	},

	_get: function(api, params) {
		
		var proxy = Ea.Any._createProxy.call(this, api, params);
		
		for (var e = 0; e < api.Count; e++) {
			var element = Ea.get(params.elementType, api.GetAt(e));
			proxy.add(element);
		}
		return proxy;
	}
	
});

Ea.Collection.Map = extend(Core.Types.Map, {
	create: function(params) {
		_super.create(null, params);
	}
},
{
	getType: function() {
		return Ea.Collection.Map;
	},

	_get: function(api, params) {
		
		var proxy = Ea.Any._createProxy.call(this, api, params);
		
		for (var e = 0; e < api.Count; e++) {
			var element = Ea.get(params.elementType, api.GetAt(e));
			proxy.add(element);
		}
		return proxy;
	}
});
