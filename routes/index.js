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
        var query = Court.find({});
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
};  