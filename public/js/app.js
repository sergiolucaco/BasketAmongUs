angular.module('myBasketApp', [
	'ControllersModule',
	'ServicesModule', 
	'ngRoute', 
	'ngMap',
	'ngGeolocation'

])
.config(function ($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/views/home.html',
			controller : 'mapCtrl'
		})
		.when('/searchCourts',{
			templateUrl: '/views/searchCourts.html',
			controller: 'searchCtrl'			
		})
		.when('/detailCourt/:id',{
			templateUrl: '/views/detailCourt.html',
			controller : 'detailCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});

		
})