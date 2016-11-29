const express = require('express')
const router = express.Router();

const postNewCourt = require('./handlers/postNewCourt')

router.post('/courts', postNewCourt);

module.exports = router;