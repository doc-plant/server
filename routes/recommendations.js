const express = require('express');
const router = express.Router();
const RecommendController = require('../controllers/RecommendationController');
const { isLogin } = require('../middlewares');

router.use(isLogin)

router.post('/:id', RecommendController.addRecommendation);

router.get('/:id', RecommendController.findAll);

router.get('/', RecommendController.findHistoryRecommend);

router.delete('/:recommendId', RecommendController.deleteRecommend);

module.exports = router