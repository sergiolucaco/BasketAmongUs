const mapCtrl = angular.module('mapCtrl',['gservice']);

	mapCtrl.controller('mapCtrl', function($rootScope,$scope,$http,gservice){

		$scope.formData = {};

		var coords = {};
		var lat = 0;
		var long = 0;

		$scope.formData.latitude = 41.379799;
		$scope.formData.longitude = 2.1729903; 

				// Get coordinates based on mouse click. When a click event is detected....
		$rootScope.$on("clicked", function(){

		    // Run the gservice functions associated with identifying coordinates
		    $scope.$apply(function(){
		        $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
		        $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
		        
		    });

		});



			    // Functions
	    // ----------------------------------------------------------------------------
	    // Creates a new user based on the form fields
	    $scope.createCourt = function() {

	        // Grabs all of the text box fields
	        var courtData = {
	            courtname: $scope.formData.courtname,
	            address: $scope.formData.address,
	            location: [$scope.formData.longitude, $scope.formData.latitude],
	            
	        };

	        // Saves the user data to the db
	        $http.post('/api/courts', courtData)
	            .success(function (data) {

	                // Once complete, clear the form (except location)
	                $scope.formData.courtname = "";
	                $scope.formData.address ="";

	                gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
	                console.log(data);
	            })
	            .error(function (data) {
	                console.log('Error: ' + data);
	            });
	    };

		
	});