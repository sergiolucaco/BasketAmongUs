angular.module('ControllersModule')
	.controller('detailCtrl', function(
		$rootScope,
		$scope,
		$routeParams,
		MapService,
		DataService
		){

		const id = $routeParams.id;


		DataService.getCourtsDetails( id )
		.then( singleCourt => {
			$scope.singleCourt = singleCourt
			return singleCourt

		})
		.catch( console.log )

	})
