const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { isLogin } = require('../middlewares');

router.post('/', UserController.register);

router.post('/login', UserController.login);
router.post('/google', UserController.googleLogin);

router.use(isLogin);

router.get('/', UserController.checkLogin);

module.exports = router;