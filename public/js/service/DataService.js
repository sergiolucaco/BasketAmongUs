// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('ServicesModule')
    .factory('DataService', function($http){

    	function getAllCourts() {
    		return $http.get('/api/courts')
    						.then( d => d.data )
    	}

    	return { getAllCourts }
    })