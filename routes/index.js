// Dependencies
const mongoose = require( 'mongoose' );
const Court = require( '../models/courtSchema.js' );


// // const routerShowAllCourts = require ( './showAllCourts' );
// // const routerAddNewCourt = require ( './addNewCourts' );
// const routerShowDetailCourtById = require ( './showDetailCourt' );
// // const routerShowFilteredCourts = require ( './showFilteredCourts' );

const routerCourts = require ( './courts' );
const routerCourt = require ( './court' );


// Opens App Routes
module.exports = function(app) {

    app.use ('/api/courts' , routerCourts )
    // GET Routes
    // --------------------------------------------------------
    // // Retrieve records for all courts in the db
    // app.use( '/api', routerShowAllCourts )
    // // Retrieve records for all courts in the db by Id.
    app.use( `/api/court`, routerCourt ) 

    // // POST Routes
    // // --------------------------------------------------------
    // // Provides method for saving new courts in the db
    // app.use( '/api', routerAddNewCourt )

    // // Retrieves JSON records for all users who meet a certain set of query conditions
    // app.use( '/filteredCourts', routerShowFilteredCourts )
};  






