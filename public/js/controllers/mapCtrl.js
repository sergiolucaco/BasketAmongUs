angular.module('ControllersModule')
	.controller('mapCtrl', function($rootScope, $scope, MapService, DataService, geolocation){

		console.log("mapCtrl...")

		$scope.formData = {};

		$scope.formData.latitude = 41.379;
		$scope.formData.longitude = 2.1729; 

		var coords = {};

		var lat = 0;
		var long = 0;

		//Read all the documents listed on the collection DB and return the map created in MapService. The next step
		// is read that map and transform data to be readable inside google maps and add markers in every location.
		//The last step is needed to center the map to see all the markers.
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

			

		// Capture current coords at the end of the marker event "dragend" and put those values in the inputs.
		$rootScope.getCurrentCoords = function (e) {
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

	    	const { courtname, address, longitude, latitude, cover: tipology } = $scope.formData;
	        // Grabs all of the text box fields
	        var courtData = {
	            courtname,
	            address,
	            location: [+longitude, +latitude],
	            tipology
	        };
	        
	        const latlon = new google.maps.LatLng(+latitude, +longitude);
	        const message = new google.maps.InfoWindow({
                content: MapService.getContentWindow(courtname, address, tipology),
                maxWidth: 320
            })

	        // Saves the court data to the db
	        DataService.addCourt( courtData )
	        	.then( data => {

	        		// Once complete, clear the form (except location)
	                $scope.formData.courtname = "";
	                $scope.formData.address ="";
	                $scope.formData.cover="";

					MapService.getHomeMap()
						.then( map => {
							MapService.createMarker( map, { latlon, message } ) //Create a marker with the location captured in the form field
	                	
					})
						
	                

	        	})
	        	.catch( console.log  )
	        
	    };

		
	});