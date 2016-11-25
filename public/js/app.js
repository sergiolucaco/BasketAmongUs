angular.module('myBasketApp', [
	'ControllersModule',
	'ServicesModule', 
	'ngRoute', 
	'ngMap',
	'geolocation'

])
.config(function ($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/views/home.html',
			controller : 'mapCtrl'
		})
		.when('/searchCourts',{
			templateUrl: '/views/searchCourts.html',
			
		})
		.otherwise({
			redirectTo: '/'
		});

		
})