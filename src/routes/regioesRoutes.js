const express = require('express');
const router = express.Router();
const jwt_middleware = require('../midllewers/jwt_middleware')
const regioesController = require('../controllers/regioesControllers')

router.get('/', (req, res) => {
    res.send('estás dentro de /regioes/')
})

router.get('/list', regioesController.list)
router.get('/regiao', regioesController.regiao)
router.post('/add', regioesController.add);
router.put('/update', regioesController.update);

//router.post('/new', pedidosController.new)

module.exports = router;