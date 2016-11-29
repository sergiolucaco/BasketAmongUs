// Creates the addCtrl Module and Controller. Note that it depends on 'geolocation' and 'MapService' modules.
angular.module('ControllersModule')
.controller('searchCtrl', function($scope, $rootScope, /* geolocation, */ MapService, DataService){

        // Initializes Variables
        // ----------------------------------------------------------------------------
        $scope.formData = {};
        var queryBody = {};

        $scope.formData.latitude = 41.379;
        $scope.formData.longitude = 2.1729; 

        var markersShowed;

        

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


