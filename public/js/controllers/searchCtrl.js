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

        // Get User's actual coordinates based on HTML5 at window load
        // geolocation.getLocation().then(function(data){
        //     coords = {lat:data.coords.latitude, long:data.coords.longitude};

        //     // Set the latitude and longitude equal to the HTML5 coordinates
        //     $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
        //     $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
        // });

        // // Get coordinates based on mouse click. When a click event is detected....
        // $rootScope.$on("clicked", function(){

        //     // Run the MapService functions associated with identifying coordinates
        //     $scope.$apply(function(){
        //         $scope.formData.latitude = parseFloat(MapService.clickLat).toFixed(3);
        //         $scope.formData.longitude = parseFloat(MapService.clickLong).toFixed(3);
        //     });
        // });

        // Take query parameters and incorporate into a JSON queryBody
        $scope.queryCourts = function(){

            // Assemble Query Body
            queryBody = {
                longitude: parseFloat($scope.formData.longitude),
                latitude: parseFloat($scope.formData.latitude),
                distance: parseFloat($scope.formData.distance),
                covered: $scope.formData.covered,
                uncovered: $scope.formData.uncovered

            };

        $scope.formData.distance = "";
        $scope.formData.covered ="";
        $scope.formData.uncovered ="";

        // const latlon = new google.maps.LatLng(+queryBody.latitude, +queryBody.longitude);
        
            DataService.postQuery( queryBody )
                .then( queryResults => {
                    // console.log(typeof queryResults );
                    $.each(queryResults.data,function (key,value){
                        var courtsFiltered = value;
                        var aLocationsFiltered = courtsFiltered.location;
                        // console.log(aLocationsFiltered[0] + " longitude of " + courtsFiltered.courtname);
                        // console.log(aLocationsFiltered[1] + " latitude of " + courtsFiltered.courtname);
                        var courtLatitudeCourtsFiltered = aLocationsFiltered[1];
                        var courtLongitudeCourtsFiltered = aLocationsFiltered[0];
                        latlon = new google.maps.LatLng( +courtLatitudeCourtsFiltered,+courtLongitudeCourtsFiltered )
                        console.log(`coordinates of ${courtsFiltered.courtname} : ${latlon} `)
                        MapService.getSearchMap()
                            .then(map => {
                                MapService.createMarker( map, {latlon})
                            })

                    })

                    $scope.queryCount = queryResults.length;

                })
                .catch( console.log )


        };
    });

