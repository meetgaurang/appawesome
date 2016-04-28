angular.module('GPApp').
	config(['$routeProvider', function($routeProvider) {
		// Route mapping
		$routeProvider.
			when("/home", {
				templateUrl: "partials/home.html", 
				controller: "homeController"}
			).
			otherwise({redirectTo: '/home'});
		}]);