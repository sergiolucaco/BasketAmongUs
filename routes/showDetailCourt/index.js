const express = require( 'express' );
const router = express.Router();

const getCourtsById = require ('./handlers/getCourtsById')

router.get( `/:id` , getCourtsById );

module.exports = router;