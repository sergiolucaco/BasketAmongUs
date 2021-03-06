// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('ServicesModule')
    .factory('MapService', function($rootScope, NgMap, DataService,$geolocation){
        //This service interacts and deals with google maps API.

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return

        

        // Array of locations obtained from API calls
        var locations = [];


        function getCurrentPosition() {
            return $geolocation.getCurrentPosition({
                timeout: 60000
             })
        }


       // Generate home map .
        function getHomeMap () {
            return NgMap.getMap({ id: 'home-map' })
        }

        // Generate search map .
         function getSearchMap () {
            return NgMap.getMap({ id: 'search-map' })
        }

        //Generate detail map .
         function getDetailMap () {
            return NgMap.getMap( { id : 'detail-map'} )
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
                icon: "../supportImages/basketball.png",
            });

            // For each marker created, add a listener that checks for clicks
            google.maps.event.addListener(marker, 'click', function(e){

                // When clicked, open the selected marker's message
                location.message.open(map, marker);

            });

            return marker;
        }

        function getPageReload (){
            return window.location.reload();
        }

        function getContentWindow(courtname, address, tipology,_id) {
            return `<p><b>Courtname</b>: <a href ="#/detailCourt/${_id}">${courtname}</a><br><b>Address</b>: ${address} <br><b>Tipology</b>: ${tipology}</p>`;
        }


        // Load every JSON record and transform it to readable google location. 
        // Also put a infoWindow to every marker.
        function convertToMapPoints( courts ){

            // Clear the locations holder
            var locations = [];
          
            // Loop through all of the JSON entries provided in the courts
            for(var i= 0; i < courts.length; i++) {
                var court = courts[i];
                const {courtname, address, tipology,_id} = court
                // Create popup windows for each record
                var  contentString = getContentWindow(courtname, address, tipology,_id);
                   
                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).
                locations.push({
                    latlon: new google.maps.LatLng(+court.location[1], +court.location[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    })
 
                });
        }
        // location is now an array populated with records in Google Maps format
        return locations;
    
    };



        return { getCurrentPosition, createMarker, getHomeMap, getSearchMap, zoomToIncludeMarkers, convertToMapPoints, getContentWindow, getDetailMap, getPageReload } 

    })