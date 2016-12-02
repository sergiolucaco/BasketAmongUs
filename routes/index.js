// Dependencies
const mongoose = require( 'mongoose' );
const Court = require( '../models/courtSchema.js' );

const routerCourts = require ( './courts' );
const routerCourt = require ( './court' );


// Opens App Routes
module.exports = function(app) {

    app.use ('/api/courts' , routerCourts )

    app.use( `/api/court`, routerCourt ) 

};  






