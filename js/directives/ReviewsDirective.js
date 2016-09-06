angular.module('store')
	.directive('myReviews', ['$http', '$route', 'StorageFactory', 'ApiFactory', function ($http, $route, StorageFactory, ApiFactory) {
		return {
			restrict: 'A',
			templateUrl: 'template/reviews.html',
			controller: ['$scope', function ($scope) {
				var data;
				var review;
				var url = ApiFactory.get('reviews') + parseInt($route.current.params.id, 10);
				
				requestReviews();

				$scope.rate = 0;
				$scope.max = 5;
				$scope.isReadonly = false;

				$scope.hoveringOver = function (value) {
					$scope.overStar = value;
				};

				$scope.ratingStates = [
					{
						stateOn: 'glyphicon-star',
						stateOff: 'glyphicon-star-empty'
					}
				];

				function requestReviews() {
					$http.get(url).then(successReviews, errorReviews);
				};

				function successReviews(response) {
					if (response.data.length) {
						$scope.reviews = response.data;
					} else {
						$scope.errorReviews = true;
					}
				};

				function errorReviews(response) {
					$scope.error = true;
				};

				$scope.reviewsAdd = function (rate, text) {
					$scope.rateErr = false;
					$scope.textErr = false;
					if (StorageFactory.getToken()) {
						$scope.authErr = false;
						if (rate && text) {
							$scope.text = '';
							$scope.rate = 0;
							review = {
								rate: parseInt(rate, 10),
								text: text
							};
							data = $scope.reviews;
							$http.post(url, review, {
								headers: {
									Authorization: 'Token ' + StorageFactory.getToken()
								}
							}).then(successAddReviews, errorAddReviews);
						} else if (!rate) {
							$scope.rateErr = true;
						} else if (!text) {
							$scope.textErr = true;
						}
					} else {
						$scope.authErr = true;
					}
				};

				function successAddReviews(response) {
					if (response.data.success) {
						$scope.reviewAddErr = false;
						requestReviews();
					} else {
						$scope.reviewAddErr = true;
					}
				};

				function errorAddReviews(response) {
					$scope.error = true;
				};
			}]
		}
	}]);