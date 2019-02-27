const express = require('express');
const router = express.Router();
const DiseaseController = require('../controllers/DiseaseController');

router.get('/', DiseaseController.findAll);

module.exports = router;