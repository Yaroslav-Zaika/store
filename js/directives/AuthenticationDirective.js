angular.module('store')
	.directive('myAuthentication', ['$http', 'StorageFactory', 'ApiFactory', function ($http, StorageFactory, ApiFactory) {
		return {
			restrict: 'A',
			templateUrl: 'template/authentication.html',
			controller: ['$scope', function ($scope) {
				var url;

				$scope.register = function (user) {
					errorDefault();
					if (user && user.username && user.password) {
						url = ApiFactory.get('register');
						requestAuthentication(url, user, successRegister);
					} else {
						$scope.errorInput = true;
					}
				};

				$scope.login = function (user) {
					errorDefault();
					if (user && user.username && user.password) {
						url = ApiFactory.get('login');
						requestAuthentication(url, user, successLogin);
					} else {
						$scope.errorInput = true;
					}
				};

				$scope.exit = function () {
					StorageFactory.setToken(false);
					$scope.authentication = false;
				};

				function requestAuthentication(url, user, success) {
					$http.post(url, user).then(success, errorAuthentication);
				}

				function successRegister(response) {
					if (response.data.success) {
						$scope.disabled = false;
						$scope.authentication = response.data.success;
						StorageFactory.setToken(response.data.token);
					} else {
						$scope.errorRegister = true;
					}
				};

				function successLogin(response) {
					if (response.data.success) {
						$scope.disabled = false;
						$scope.authentication = response.data.success;
						StorageFactory.setToken(response.data.token);
					} else {
						$scope.errorLogin = true;
					}
				};

				function errorAuthentication(response) {
					$scope.error = true;
				};

				function errorDefault() {
					$scope.errorLogin = false;
					$scope.errorRegister = false;
					$scope.errorInput = false;
				}
			}]
		}
	}]);