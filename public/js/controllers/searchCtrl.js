// Creates the addCtrl Module and Controller. Note that it depends on 'geolocation' and 'MapService' modules.
angular.module('ControllersModule')
    .controller('searchCtrl', function($scope, $log, $http, $rootScope, /* geolocation, */ MapService){

        // Initializes Variables
        // ----------------------------------------------------------------------------
        $scope.formData = {};
        var queryBody = {};

        // Functions
        // ----------------------------------------------------------------------------

        // Get User's actual coordinates based on HTML5 at window load
        // geolocation.getLocation().then(function(data){
        //     coords = {lat:data.coords.latitude, long:data.coords.longitude};

        //     // Set the latitude and longitude equal to the HTML5 coordinates
        //     $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
        //     $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
        // });

        // Get coordinates based on mouse click. When a click event is detected....
        $rootScope.$on("clicked", function(){

            // Run the MapService functions associated with identifying coordinates
            $scope.$apply(function(){
                $scope.formData.latitude = parseFloat(MapService.clickLat).toFixed(3);
                $scope.formData.longitude = parseFloat(MapService.clickLong).toFixed(3);
            });
        });

        // Take query parameters and incorporate into a JSON queryBody
        $scope.queryCourts = function(){

            // Assemble Query Body
            queryBody = {
                longitude: parseFloat($scope.formData.longitude),
                latitude: parseFloat($scope.formData.latitude),
                distance: parseFloat($scope.formData.distance),
                covered: $scope.formData.cover,
                uncovered: $scope.formData.uncover

            };

            // Post the queryBody to the /query POST route to retrieve the filtered results
            $http.post('/searchCourts', queryBody)

                // Store the filtered results in queryResults
                .success(function(queryResults){

                    // Pass the filtered results to the Google Map Service and refresh the map
                    MapService.refresh(queryBody.latitude, queryBody.longitude, queryResults);

                    // Count the number of records retrieved for the panel-footer
                    $scope.queryCount = queryResults.length;
                })
                .error(function(queryResults){
                    console.log('Error ' + queryResults);
                })
        };
    });
