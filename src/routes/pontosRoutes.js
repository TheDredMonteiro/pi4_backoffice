const express = require('express');
const router = express.Router();
const jwt_middleware = require('../midllewers/jwt_middleware')
const pontosController = require('../controllers/pontosControllers')

router.get('/', (req, res) => {
    res.send('estás dentro de /pontos/')
})

router.get('/list', pontosController.list)
router.post('/addvisita', pontosController.addvisita)
router.get('/listreservas', pontosController.listreservas)
router.get('/listvisitas', pontosController.listvisitas)
router.get('/selectvisita', pontosController.selectvisita)
router.get('/list1', pontosController.list1)
router.get('/regiao2', pontosController.regiao2)
router.get('/listregiao', pontosController.listregiao)
router.get('/listtipo', pontosController.listtipo)
router.get('/count', pontosController.count);


//router.post('/new', pedidosController.new)

module.exports = router;