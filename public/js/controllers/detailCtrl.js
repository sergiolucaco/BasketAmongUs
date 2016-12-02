angular.module('ControllersModule')
	.controller('detailCtrl', function(
		$rootScope,
		$scope,
		$routeParams,
		MapService,
		DataService,
		$location
		){

		const id = $routeParams.id;

		// In this case, a data service which allow us to filter through the db by id parameter is called .
		DataService.getCourtsDetails( id )
		.then( singleCourt => {
			$scope.singleCourt = singleCourt
			return singleCourt

		})
		.catch( console.log )

		$scope.redirectToHome = function (){
			return $location.path('/');
		}

	})
