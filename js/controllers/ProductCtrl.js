angular.module('store')
	.controller('ProductCtrl', ['$scope', '$route', '$http', 'ApiFactory', 'StorageFactory', function ($scope, $route, $http, ApiFactory, StorageFactory) {

		getProduct();

		function getProduct() {
			var paramID = parseInt($route.current.params.id, 10);
			if (!isNaN(paramID)) {
				var product = StorageFactory.getProducts(paramID - 1);
				if (product && product.id === paramID) {
					$scope.product = product;
				} else if (product === paramID - 1) {
					$scope.errorProduct = true;
				} else {
					requestProducts();
				}
			} else {
				$scope.error = true;
			}
		}

		function requestProducts() {
			var url = ApiFactory.get('products');
			$http.get(url).then(successProducts, errorProducts);
		};

		function successProducts(response) {
			StorageFactory.setProducts(response);
			getProduct();
		};

		function errorProducts(response) {
			$scope.error = true;
		}
}]);