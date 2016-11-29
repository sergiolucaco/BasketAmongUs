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


		DataService.getCourtsDetails( id )
		.then( singleCourt => {
			$scope.singleCourt = singleCourt
			// $scope.currentDetailPosition = [singleCourt.location[1], singleCourt.location[0] ]

		})
		.catch( console.log )

	})
