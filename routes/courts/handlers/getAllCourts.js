const Court = require( '../../../models/courtSchema.js' );

function getAllCourts (req, res){
	// Uses Mongoose schema to run the search (empty conditions)
	var query = Court.find({}).sort({created_at: -1});

	query.exec(function(err, courts){
		if(err)
			res.send(err);

	    // If no errors are found, it responds with a JSON of all courts
	    res.json(courts);
	    
	});
};

module.exports = getAllCourts