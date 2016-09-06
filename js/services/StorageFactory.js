angular.module('store')
	.factory('StorageFactory', ['$http', function ($http) {
		var storage = {
			products: {},
			token: false
		};

		storage.setProducts = function (item) {
			storage.products = item;
		};

		storage.getProducts = function (id) {
			if (storage.products && storage.products.data) {
				return storage.products.data[id] || id;
			} else {
				return false;
			}
		};

		storage.setToken = function (token) {
			storage.token = token;
		};
		storage.getToken = function () {
			return storage.token;
		};

		return {
			setProducts: storage.setProducts,
			getProducts: storage.getProducts,
			setToken: storage.setToken,
			getToken: storage.getToken
		}
	}]);