const express = require('express');
const router = express.Router();
const HistoryController = require('../controllers/HistoryController');
const { isLogin } = require('../middlewares');

router.use(isLogin);

router.get('/', HistoryController.getHistory);

router.post('/', HistoryController.addHistory);

router.delete('/:id', HistoryController.deleteHistory);

module.exports = router;

