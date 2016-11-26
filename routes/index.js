// Dependencies
var mongoose        = require('mongoose');
var Court           = require('../models/courtSchema.js');

// Opens App Routes
module.exports = function(app) {

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all courts in the db
    app.get('/api/courts', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        var query = Court.find({}).sort({created_at: -1});


        query.exec(function(err, courts){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all courts
            res.json(courts);
        });
    });

    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new courts in the db
    app.post('/api/courts', function(req, res){

        // Creates a new User based on the Mongoose schema and the post bo.dy
        var newcourt = new Court(req.body);

        // New User is saved in the db.
        newcourt.save(function(err){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of the new user
            res.json(req.body);
        });
    });



    // app.get('/filteredCourts/', function(req, res){

    //     // Uses Mongoose schema to run the search (empty conditions)
    //     var query = Court.find({})


    //     query.exec(function(err, courts){
    //         if(err)
    //             res.send(err);

    //         // If no errors are found, it responds with a JSON of all courts
    //         res.json(courts);
    //     });
    // });


    // Retrieves JSON records for all users who meet a certain set of query conditions
    app.post('/filteredCourts', function(req, res){

        // Grab all of the query parameters from the body.
        // var lat             = req.body.latitude;
        // var long            = req.body.longitude;
        // var distance        = req.body.distance;
        // var cover           = req.body.cover;
        // var uncover          = req.body.uncover;
        
        console.log("Resultado req body : ");
        console.log(req.body);
        const { latitude, longitude, distance, covered, uncovered } = req.body
        // Opens a generic Mongoose Query. Depending on the post body we will...


        var filter = {} ;

        // if ( covered ){
        //     filter = { tipology : covered }
        //     var query = Court.find( filter )
        // } if ( uncovered ){
        //     filter = { tipology : uncovered }
        //     var query = Court.find( filter )
        // } 
        if ( distance ){

            var filterAround=getFilterCoord(longitude,latitude,distance);
            console.log("El valor del filtro que se aplica al find del modelo :")
            console.log( JSON.stringify(filterAround)  )

            // filter = { distance : getFilterCoord(lat,long,distance) }
            var query = Court.find( filterAround )
        } 
         else if( !covered && !uncovered && !distance ) {
             var query = Court.find( {} );
        }






        // // ...include filter by Max Distance
        // if( distance ){

        //     console.log("I'm in")
        //     // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
        //     query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},

        //         // Converting meters to km. Specifying spherical geometry (for globe)
        //         maxDistance: distance * 1000, spherical: true});
        // }

        // // ...include filter by cover / uncover
        // if( cover || uncover ){
        //     query.or([{ 'tipology': cover }, { 'tipology': uncover }]);
        // }


        // Execute Query and Return the Query Results
        query.exec(function(err, courts){
            if(err)
                res.send(err);

            // If no errors, respond with a JSON of all courts that meet the criteria
            res.json(courts);
            console.log("Se hace un post de : ")
            console.log(courts)
        });
    });
};  
        function getFilterCoord( longitude, latitude, km) {

            const type = "Point";
            const coordinates = [ longitude , latitude ];

            return { location : { $near: { $geometry: { type, coordinates }, $maxDistance: km*1000 } } }
        }