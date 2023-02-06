const express = require('express');
const router = express.Router();
const jwt_middleware = require('../jwt_middleware');
const userControllers = require('../controllers/userControllers')

//const {login, verificaCodigo} = require('../controllers/userControllers');

router.get('/login', userControllers.login);
router.get('/roles', userControllers.roles);
router.get('/agente', userControllers.agente);
router.get('/utilizador', userControllers.utilizador);
router.post('/login1', userControllers.login1);
router.post('/login2', userControllers.login2);
router.put('/update_estado', userControllers.update_estado)
router.put('/update', userControllers.update)
router.put('/update_password', userControllers.update_password)
router.get('/list', jwt_middleware.checkToken, userControllers.list);
//router.post('/otp', verificaCodigo);

module.exports = router;