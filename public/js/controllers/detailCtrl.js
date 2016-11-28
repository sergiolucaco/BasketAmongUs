angular.module('ControllersModule')
	.controller('detailCtrl', function(
		$rootScope,
		$scope,
		$routeParams,
		MapService,
		DataService,
		geolocation
	){

		const id = $routeParams.id;
		console.log("hello world")

		DataService.getCourtsDetails( id )
		.then( singleCourt => {
			console.log("hello world2")
			$scope.singleCourt = singleCourt
			return singleCourt;
			console.log(singleCourt)					
		})


	})

