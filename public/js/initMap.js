// function initMap() {
//   var myLatLng = {lat: 41.390205, lng: 2.154007};
//   var map = new google.maps.Map(document.getElementById('basketball_court'), {
//     zoom: 15,
//     center: myLatLng
//   });
//   var marker = new google.maps.Marker({
//     position: myLatLng,
//     map: map
// //   });
//   google.maps.event.addListener(map, "click", function(event) {
//       // get lat/lon of click
//       var clickLat = event.latLng.lat();
//       var clickLon = event.latLng.lng();
//       // show in input box
//       document.getElementById("lat").value = clickLat.toFixed(5);
//       document.getElementById("lon").value = clickLon.toFixed(5);
//   });
// }

console.log("out of line... ")

var map;

function initMap() {

  map = new google.maps.Map(document.getElementById('basketball_court'), {

    scaleControlOptions: false,
    streetViewControl: false,
    mapTypeControl: false,
    zoom: 12
  });


  var infoWindow = new google.maps.InfoWindow({
    map: map
  });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        console.log(`${pos.lat} latitud y ${pos.lng} longitud`)

        var marker = new google.maps.Marker({
          position: pos,
          map: map,
          title: 'This is your current position'
        })

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
      }

      google.maps.event.addListener(map, "click", function(event) {

        // get lat/lon of click
        var clickLat = event.latLng.lat();
        var clickLon = event.latLng.lng();
        // var location = [clickLat,clickLon];
        // console.log(location);
        // // show in input box
        document.getElementById("lat").value = clickLat.toFixed(5);
        document.getElementById("lon").value = clickLon.toFixed(5);


      });



      $.ajax({
        url: '/api/courts'
      })
      .success( oCourts => {
        var aCoorsCourts = oCourts.map( oCourt => oCourt.location )
        aCoorsCourts.forEach( coorCourt => {
          const lng = coorCourt[0]
          const lat = coorCourt[1]
        // var bounds = new google.maps.LatLngBounds();
        new google.maps.Marker({
          position: { lat, lng },
          map: map,
          title: 'This is your current position'
        })/*.setIcon('./basketball.png');*/
        // bounds.extend(coorCourt);
      })
      // map.fitbounds (bounds);
    })

    }

    $("#addLocation").on('click', function() {
        var lon = $("#lon").val();
        var lat = $("#lat").val();
        console.log(typeof ($("#lat").val()))

        var slocation = [$("#lon").val(),$("#lat").val()]
        var nlocation = slocation.map(Number);
        console.log($("#lat").val() + " Valor latitud")
        console.log(typeof ($("#lat").val())+ " Typeof latitud")
        console.log( nlocation )



        var courtLocation = {
          courtname : 'Just a sample 3',
          location : nlocation

        };
        console.log(courtLocation)
      // console.log(`${location[0]} and ${courtLocation.location.lon}  This is the current location of the click event`)

      $.ajax({
        type: 'POST',
        url: '/addCourts',
        contentType: 'application/json',
        data: JSON.stringify(courtLocation)
      })
      // .done(()=>{
      //   console.log(`The court ${courtLocation.courtname} was sent succesfully.`)
      // })


      // .success( data => {
      //   console.log("data send!")
      //   console.log(data)
    })

    // console.log(typeof(+courtLocation.location.lat))
    // console.log(typeof(+courtLocation.location.lon))

    // var markerCourts = new google.maps.Marker({
    //     position: {
    //         lat: +courtLocation.location.lat,
    //         lng: +courtLocation.location.lon
    //     },
    //     map: map,
    //     title: courtLocation.name
    // })

