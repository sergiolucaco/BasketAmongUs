// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('ServicesModule')
    .factory('MapService', function($rootScope, NgMap, DataService){
        //This service interacts and deals with google maps API.

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return

        

        // Array of locations obtained from API calls
        var locations = [];

        // Selected Location 
        var selectedLat = 41.379799;
        var selectedLong =  2.1729903;

       // Generate home map .
        function getHomeMap () {
            return NgMap.getMap({ id: 'home-map' })
        }

        // Generate search map .
         function getSearchMap () {
            return NgMap.getMap({ id: 'search-map' })
        }

        // Include all the markers in the map and center into their location.
        function zoomToIncludeMarkers( map, locations ) {
            const bounds = new google.maps.LatLngBounds();

            locations.forEach( location => bounds.extend(location.latlon) );

            map.fitBounds(bounds);
        };


        //Create a new marker in every location listed in DB.
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

        function getContentWindow(courtname, address, tipology) {
            return `<p><b>Courtname</b>: ${courtname}<br><b>Address</b>: ${address} <br><b>Tipology</b>: ${tipology}</p>`;
        }


        // Load every JSON record and transform it to readable google location. 
        // Also put a infoWindow to every marker.
        function convertToMapPoints( courts ){

            // Clear the locations holder
            var locations = [];
          
            // Loop through all of the JSON entries provided in the courts
            for(var i= 0; i < courts.length; i++) {
                var court = courts[i];
                const { courtname, address, tipology} = court
                // Create popup windows for each record
                var  contentString = getContentWindow(courtname, address, tipology);
                   
                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).
                locations.push({
                    latlon: new google.maps.LatLng(+court.location[1], +court.location[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    })
                    // ,
                    // courtname: court.courtname,
                    // address: court.address,
                    // tipology: court.tipology
                        
                });
        }
        // location is now an array populated with records in Google Maps format
        return locations;
    
    };



        return { createMarker, getHomeMap, getSearchMap, zoomToIncludeMarkers, convertToMapPoints, getContentWindow } 

    })