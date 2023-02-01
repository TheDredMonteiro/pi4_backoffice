const express = require('express');
const router = express.Router();
const jwt_middleware = require('../jwt_middleware');
const userControllers = require('../controllers/userControllers')

const {login, verificaCodigo} = require('../controllers/userControllers');

router.post('/login', userControllers.login);
router.post('/login1', userControllers.login1);
router.post('/login2', userControllers.login2);
router.put('/update_estado', userControllers.update_estado)
router.get('/list', jwt_middleware.checkToken, userControllers.list);
router.post('/otp', verificaCodigo);

module.exports = router;