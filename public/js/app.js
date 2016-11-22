angular.module('myBasketApp', ['ngRoute','mapCtrl','gservice'])
	.config(function ($routeProvider){
		$routeProvider
			.when('/', {
				templateUrl: '/views/home.html',
				controller : 'mapCtrl'
			})
			.when('/searchCourts',{
				templateUrl: '/views/searchCourts.html'
			})
			.otherwise({redirectTo: '/'});

			
	})