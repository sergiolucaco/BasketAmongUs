const Court = require( '../../../models/courtSchema.js' );

function getCourtsById(req,res){
    const { id } = req.params;
    Court.findById( id )
        .then( court => res.json(court) )
        .catch( err => new Error (err) )

}

module.exports = getCourtsById;