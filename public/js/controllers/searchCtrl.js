// Creates the addCtrl Module and Controller. Note that it depends on 'geolocation' and 'MapService' modules.
angular.module('ControllersModule')
.controller('searchCtrl', function($scope, $rootScope, /* geolocation, */ MapService, DataService){

        // Initializes Variables
        // ----------------------------------------------------------------------------
        $scope.formData = {};
        var queryBody = {};

        $scope.formData.latitude = 41.379;
        $scope.formData.longitude = 2.1729; 

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

                distance = "";
                covered ="";
                uncovered ="";

            // const latlon = new google.maps.LatLng(+queryBody.latitude, +queryBody.longitude);
            
            DataService.postQuery( queryBody )
            .then( queryResults => {

                $rootScope.queryResults = queryResults ;
                return MapService.getSearchMap()
            })
            .then( map => {
                const locations = MapService.convertToMapPoints($rootScope.queryResults);
                var markers = locations.map( MapService.createMarker.bind(null,map) );
                MapService.zoomToIncludeMarkers( map, locations );        
            
            })

            .catch( console.log )


                    // // console.log(typeof queryResults );
                    // $.each(queryResults.data,function (key,value){
                    //     var courtsFiltered = value;
                    //     var aLocationsFiltered = courtsFiltered.location;
                    //     // console.log(aLocationsFiltered[0] + " longitude of " + courtsFiltered.courtname);
                    //     // console.log(aLocationsFiltered[1] + " latitude of " + courtsFiltered.courtname);
                    //     var courtLatitudeCourtsFiltered = aLocationsFiltered[1];
                    //     var courtLongitudeCourtsFiltered = aLocationsFiltered[0];
                    //     latlon = new google.maps.LatLng( +courtLatitudeCourtsFiltered,+courtLongitudeCourtsFiltered )
                    //     console.log(`coordinates of ${courtsFiltered.courtname} : ${latlon} `)
                    //     MapService.getSearchMap()
                    //         .then(map => {
                    //             MapService.createMarker( map, {latlon})
                    //         })

                    // })


        }

        function removeMarkers ( markers ) {
            if (markers.length != 0 ){
                markers.forEach( marker => marker.setMap(null) )
            }
        }
  });


