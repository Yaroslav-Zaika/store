angular.module('store')
	.factory('ApiFactory',[ function () {
		var url = {
			register: 'http://smktesting.herokuapp.com/api/register/',
			login: 'http://smktesting.herokuapp.com/api/login/',
			products: 'http://smktesting.herokuapp.com/api/products/',
			reviews: 'http://smktesting.herokuapp.com/api/reviews/'
		};

		url.get = function (property) {
			return url[property];
		}
		return {
			get: url.get
		}
	}]);