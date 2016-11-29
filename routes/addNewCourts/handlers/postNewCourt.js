const Court = require( '../../../models/courtSchema.js' );

function postNewCourt (req, res){

    // Creates a new User based on the Mongoose schema and the post body
    var newcourt = new Court(req.body);

    // New User is saved in the db.
    newcourt.save(function(err){
        if(err)
            res.send(err);

        // If no errors are found, it responds with a JSON of the new user
        res.json(req.body);
    });
};

module.exports = postNewCourt;