        // Private Inner Functions
        // --------------------------------------------------------------
        // Convert a JSON of users into map points
        var convertToMapPoints = function( courts ){

            // Clear the locations holder
            var locations = [];
            // var infoWindow = new google.maps.InfoWindow();
            // Loop through all of the JSON entries provided in the courts
            for(var i= 0; i < courts.length; i++) {
                var court = courts[i];

                // Create popup windows for each record
                var  contentString =
                    '<p><b>Courtname</b>: ' + court.courtname +
                    '<br><b>Address</b>: ' + court.address + '<br><b>Tipology</b>' + court.cover +  
                    '</p>';
                    
                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).
                locations.push({
                    latlon: new google.maps.LatLng(+court.location[1], +court.location[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    courtname: court.courtname,
                    address: court.address,
                    
            });
        }
        // location is now an array populated with records in Google Maps format
        return locations;
    };
