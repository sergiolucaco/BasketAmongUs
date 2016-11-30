const express = require( 'express' )
const router = express.Router();

const getAllCourts = require ( './handlers/getAllCourts' );
const postNewCourts = require ( './handlers/postNewCourts' );
const getCourtsFiltered = require( './handlers/getCourtsFiltered' );


router.get('',getAllCourts);
router.post('',postNewCourts);
router.post('/filtered',getCourtsFiltered);

module.exports = router;