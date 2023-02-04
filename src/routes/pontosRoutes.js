const express = require('express');
const router = express.Router();
const jwt_middleware = require('../midllewers/jwt_middleware')
const pontosController = require('../controllers/pontosControllers')

router.get('/', (req, res) => {
    res.send('estás dentro de /pontos/')
})

router.get('/list', pontosController.list)
router.get('/listtipo', pontosController.listtipo)


//router.post('/new', pedidosController.new)

module.exports = router;