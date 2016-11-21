angular.module('myBasketApp', ['ngRoute','mapCtrl','gservice'])
	.config(function ($routeProvider){
		$routeProvider
			.when('/', {
				templateUrl: '/views/home.html',
				controller : 'mapCtrl'
			})
			.otherwise({redirectTo: '/'});
			
	})