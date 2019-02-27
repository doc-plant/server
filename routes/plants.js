const express = require('express');
const router = express.Router();
const PlantController = require('../controllers/PlantController');

router.get('/', PlantController.findAll);

module.exports = router;