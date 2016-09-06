angular.module('store')
	.controller('ProductsCtrl', ['$scope', '$http', 'ApiFactory', 'StorageFactory', function ($scope, $http, ApiFactory, StorageFactory) {
		$scope.requestProducts = requestProducts;

		function requestProducts() {
			var url = ApiFactory.get('products');
			$http.get(url).then(successProducts, errorProducts);
		};

		function successProducts(response) {
			$scope.products = response.data;
			StorageFactory.setProducts(response);
		};

		function errorProducts(response) {
			$scope.error = true;
		};
}]);