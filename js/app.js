angular.module('store', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/products', {
				templateUrl: 'template/products.html',
				controller: 'ProductsCtrl'
			})
			.when('/product/:id', {
				templateUrl: 'template/product.html',
				controller: 'ProductCtrl'
			})
			.otherwise({
				redirectTo: '/products'
			});
	}]);