// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('ServicesModule')
    .factory('MapService', function($rootScope, NgMap, DataService){

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return

        // Array of locations obtained from API calls
        var locations = [];

        // Selected Location 
        var selectedLat = 41.379799;
        var selectedLong =  2.1729903;



        // Handling Clicks and location selection
        // googleMapService.clickLat  = 0;
        // googleMapService.clickLong = 0;


        DataService.getAllCourts()
            .then( courts => {
                $rootScope.courts = courts;
                return getHomeMap()
            })
            .then( (map) => {

                const locations = convertToMapPoints ( $rootScope.courts );
                const markers = locations.map( createMarker.bind(null, map) );
                zoomToIncludeMarkers( map, locations )


            })


       
        function getHomeMap () {
            return NgMap.getMap({ id: 'home-map' })
        }

        function zoomToIncludeMarkers( map, locations ) {
            const bounds = new google.maps.LatLngBounds();

            locations.forEach( location => bounds.extend(location.latlon) );

            map.fitBounds(bounds);
        };

        function createMarker (map, location) {

            var marker = new google.maps.Marker({
                position: location.latlon,
                map: map,
                title: "Playable court",
                icon: "../basketball.png",
            });

            // For each marker created, add a listener that checks for clicks
            google.maps.event.addListener(marker, 'click', function(e){

                // When clicked, open the selected marker's message
                location.message.open(map, marker);
                
            });

            return marker;
        }

        // Functions
        // --------------------------------------------------------------
        // Refresh the Map with new data. Function will take new latitude and longitude coordinates.
       

        function refresh(latitude, longitude){

            // Clears the holding array of locations
            locations = [];

            // Set the selected lat and long equal to the ones provided on the refresh() call
            selectedLat = +latitude;
            selectedLong = +longitude;

            // Perform an AJAX call to get all of the records in the db.
            $http.get('/api/courts').success(function(response){

            // Convert the results into Google Map Format
            locations = convertToMapPoints(response);

            // Then initialize the map.
            initialize(latitude, longitude);

            }).error(function(){});
        };
       
        // Initializes the map
        function initialize(latitude, longitude) {

            // Uses the selected lat, long as starting point
            var myLatLng = {lat: selectedLat, lng: selectedLong};

            // If map has not been created already...
            if (!map){

                // Create a new map and place in the index.html page
                var map = new google.maps.Map(document.getElementById('map_courts'), {
                    zoom: 12,
                    center: myLatLng,
                    clickableIcons : false
                });
            }
    
            // Loop through each location in the array and place a marker
            // var markers = locations.map( createMarker.bind(null, map) );

            // Set initial location as a bouncing blue marker
            var initialLocation = new google.maps.LatLng(latitude, longitude);
            var marker = new google.maps.Marker({
                position: initialLocation,
                // animation: google.maps.Animation.BOUNCE,
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            });
            lastMarker = marker;

            // Function for moving to a selected location
            map.panTo(new google.maps.LatLng(latitude, longitude));

            // Clicking on the Map moves the bouncing blue marker
            google.maps.event.addListener(map, 'click', function(e){
                var marker = new google.maps.Marker({
                    position: e.latLng,
                    // animation: google.maps.Animation.BOUNCE,
                    map: map,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                });

                // When a new spot is selected, delete the old blue bouncing marker
                if(lastMarker){
                    lastMarker.setMap(null);
                }

                // Create a new blue bouncing marker and move to it
                lastMarker = marker;
                map.panTo(marker.position);

                // Update Broadcasted Variable (lets the panels know to change their lat, long values)
                // googleMapService.clickLat = marker.getPosition().lat();
                // googleMapService.clickLong = marker.getPosition().lng();
                $rootScope.$broadcast("clicked");
            });

        };

        // Refresh the page upon window load. Use the initial latitude and longitude
        // google.maps.event.addDomListener(window, 'load',
        //     googleMapService.refresh(selectedLat, selectedLong));

        return { refresh, createMarker, getHomeMap } 

    })