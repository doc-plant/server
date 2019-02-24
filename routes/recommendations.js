const express = require('express');
const router = express.Router();
const RecommendController = require('../controllers/RecommendationController');
const { isLogin } = require('../middlewares');

router.use(isLogin)

router.post('/:id', RecommendController.addRecommendation);

router.get('/:id', RecommendController.findAll);

module.exports = router