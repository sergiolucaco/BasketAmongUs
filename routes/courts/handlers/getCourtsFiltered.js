const Court = require( '../../../models/courtSchema.js' );

const getFilterCoord  = require ( './getFilterCoord' );
const getFilterCoordAndCovered  = require ( './getFilterCoordAndCovered' );
const getFilterCoordAndUncovered = require ( './getFilterCoordAndUncovered' );


function getCourtsFiltered (req, res){

    // Grab all of the query parameters from the body.
    const { latitude, longitude, distance, covered, uncovered } = req.body
    // Opens a generic Mongoose Query. Depending on the post body we will...

    var filter = {} ;
    var filterAround;
    var filterAroundCover;
    var filterAroundUncover;

    if ( covered ){
        filter = { tipology : covered }
         var query = Court.find( filter )
    }if ( uncovered ){
        filter = { tipology : uncovered }
         var query = Court.find( filter )
    } 
    if ( distance ){
        filterAround = getFilterCoord(longitude,latitude,distance);
        var query = Court.find( filterAround )

    }if ( distance && covered){            
        filterAroundCover = getFilterCoordAndCovered(longitude,latitude,distance,covered);
        var query = Court.find( filterAroundCover )

    }if ( distance && uncovered ){            
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

    });
};

module.exports = getCourtsFiltered;