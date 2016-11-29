const express = require( 'express' )
const router = express.Router();

const getAllCourts = require( './handlers/getAllCourts' )

router.get( '/courts', getAllCourts );

module.exports = router;