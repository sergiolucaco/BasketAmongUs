// Creates the addCtrl Module and Controller. Note that it depends on 'geolocation' and 'MapService' modules.
angular.module('ControllersModule')
.controller('searchCtrl', function($scope, $rootScope, MapService, DataService){

        // Initializes Variables
        // ----------------------------------------------------------------------------
        
        $rootScope.formData = $rootScope.formData || {} ;
        var queryBody = {};
        var markersShowed;


        //Get the logic setted in the MapService to get current position
        // and connect those values into the inputs and the position of the marker setted with NgMap directive.
        
        MapService.getCurrentPosition()
            .then(function(position) {

                $rootScope.myLatitude = position.coords.latitude;
                $rootScope.myLongitude = position.coords.longitude;

                $rootScope.formData.latitude = position.coords.latitude.toFixed(3) || 41.379;
                $rootScope.formData.longitude = position.coords.longitude.toFixed(3) || 2.172;
           
        });


        // Functions
        // ----------------------------------------------------------------------------

        // Take query parameters and incorporate into a JSON queryBody
        $scope.queryCourts = function(){

                // Assemble Query Body
                const { longitude,latitude,distance,covered,uncovered } = $scope.formData;
                
                const queryBody = {
                    longitude,
                    latitude,
                    distance,
                    covered,
                    uncovered

                };

                $scope.formData.distance = "";
                $scope.formData.covered ="";
                $scope.formData.uncovered ="";

            // With the filtered results the first thing that does the function is see if there are
            //markers already to erase them if they are. The next step is charge the correct map and 
            // then implement markers in every location result with google maps format and bounds. 
            
            DataService.postQuery( queryBody )
                .then( queryResults => {
                    removeMarkers();
                    $rootScope.queryResults = queryResults ;
                    return MapService.getSearchMap()
                })
                .then( map => {
                    const locations = MapService.convertToMapPoints($rootScope.queryResults);
                    markersShowed = locations.map( MapService.createMarker.bind(null,map) );
                    MapService.zoomToIncludeMarkers( map, locations );        
                
                })

                .catch( console.log )


        }

        function removeMarkers ( ) {
            if (markersShowed && markersShowed.length != 0 ){
                markersShowed.forEach( marker => marker.setMap(null) )
            }
        }
  });


