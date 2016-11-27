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
        console.log("Resultado req body : ");
        console.log(req.body);
        const { latitude, longitude, distance, covered, uncovered } = req.body
        // Opens a generic Mongoose Query. Depending on the post body we will...


        var filter = {} ;
        var filterAround;
        var filterAroundCover;
        var filterAroundUncover;

        if ( covered ){
            console.log("covered is in...")
             filter = { tipology : covered }
             var query = Court.find( filter )
        }if ( uncovered ){
            console.log("uncovered is in...")
             filter = { tipology : uncovered }
             var query = Court.find( filter )
        } 
        if ( distance ){
            console.log("distance is in...")
            filterAround = getFilterCoord(longitude,latitude,distance);
            var query = Court.find( filterAround )

        }if ( distance && covered){
            console.log("distance && covered is in...")
            filterAroundCover = getFilterCoordAndCovered(longitude,latitude,distance,covered);
            var query = Court.find( filterAroundCover )

        }if ( distance && uncovered ){
            console.log("distance && uncovered is in...")
            filterAroundUncover = getFilterCoordAndUncovered(longitude,latitude,distance,uncovered);
            var query = Court.find( filterAroundUncover )            
        }           
        // console.log( JSON.stringify(filterAround)  ) // to see when array appears with "object"[object]
        else if( !covered && !uncovered && !distance ) {
             var query = Court.find( {} );
        }

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

        function getFilterCoordAndCovered( longitude, latitude, km, covered) {

            const type = "Point";
            const coordinates = [ longitude , latitude ];

            return { location : { $near: { $geometry: { type, coordinates }, $maxDistance: km*1000 } }, tipology : covered }
        }

        function getFilterCoordAndUncovered( longitude, latitude, km, uncovered) {

            const type = "Point";
            const coordinates = [ longitude , latitude ];

            return { location : { $near: { $geometry: { type, coordinates }, $maxDistance: km*1000 } }, tipology : uncovered }
        }