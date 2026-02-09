const express = require('express');
const router = express.Router();
const destinationsController = require('../controllers/destinationsController');

router.get('/', destinationsController.getAllDestinations);
router.get('/:name', destinationsController.getDestinationByName);

module.exports = router;
