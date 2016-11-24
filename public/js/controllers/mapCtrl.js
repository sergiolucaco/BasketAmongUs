angular.module('ControllersModule')
	.controller('mapCtrl', function($rootScope, $scope, MapService, DataService){

		console.log("mapCtrl...")

		$scope.formData = {};

		var coords = {};
		var lat = 0;
		var long = 0;



		$scope.formData.latitude = 41.379;
		$scope.formData.longitude = 2.1729; 


		DataService.getAllCourts()
		    .then( courts => {
		        $rootScope.courts = courts;
		        return MapService.getHomeMap()
		    })
		    .then( map => {

		        const locations = MapService.convertToMapPoints ( $rootScope.courts );
		        const markers = locations.map( MapService.createMarker.bind(null, map) );
		        MapService.zoomToIncludeMarkers( map, locations )
		    })

				// Get coordinates based on mouse click. When a click event is detected....
		$rootScope.$on("clicked", function(){

		    // // Run the MapService functions associated with identifying coordinates
		    // $scope.$apply(function(){
		    //     $scope.formData.latitude = parseFloat(MapService.clickLat).toFixed(3);
		    //     $scope.formData.longitude = parseFloat(MapService.clickLong).toFixed(3);
		        
		    // });

		});


		$scope.getCurrentCoords = function (e) {
			$scope.pos = this.getPosition();
     		$scope.formData.latitude = $scope.pos.lat().toFixed(3);
     		$scope.formData.longitude = $scope.pos.lng().toFixed(3);
		}

		// $scope.setNewPosition = function( event ) {
		// 	const location = {
		// 		latlon: event.latLng
		// 	}

		// 	MapService.getHomeMap()
		// 		.then( map=>{
		// 			MapService.createMarker( map, location)

	
		// 		})
		// }



			    // Functions
	    // ----------------------------------------------------------------------------
	    // Creates a new court based on the form fields
	    $scope.createCourt = function() {

	        // Grabs all of the text box fields
	        var courtData = {
	            courtname: $scope.formData.courtname,
	            address: $scope.formData.address,
	            location: [+$scope.formData.longitude, +$scope.formData.latitude],
	            tipology: $scope.formData.cover,
	        };

	        const latlon = new google.maps.LatLng(+courtData.location[1], +courtData.location[0]);

	        // Saves the court data to the db
	        DataService.addCourt( courtData )
	        	.then( data => {

	        		// Once complete, clear the form (except location)
	                $scope.formData.courtname = "";
	                $scope.formData.address ="";
	                $scope.formData.cover="";

					MapService.getHomeMap()
						.then( map => {
							MapService.createMarker( map, { latlon } )
						})

	                // MapService.refresh($scope.formData.latitude, $scope.formData.longitude);
	                console.log(data);

	        	})
	        	.catch( console.log  )
	        
	    };

		
	});