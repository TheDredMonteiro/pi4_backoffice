const express = require('express');
const router = express.Router();
const jwt_middleware = require('../midllewers/jwt_middleware')
const recompensasController = require('../controllers/recompensasControllers')

router.get('/', (req, res) => {
    res.send('estás dentro de /recompensas/')
})

router.get('/list', recompensasController.list)
router.get('/recompensa', recompensasController.recompensa)
router.put('/update_disponivel', recompensasController.update_disponivel)
router.post('/add', recompensasController.add);
router.put('/update', recompensasController.update);

//router.post('/new', pedidosController.new)

module.exports = router;