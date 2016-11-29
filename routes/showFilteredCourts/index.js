const express = require ( 'express' );
const router = express.Router();

const getCourtsFiltered = require ( './handlers/getCourtsFiltered' );

router.post('', getCourtsFiltered );

module.exports = router;

