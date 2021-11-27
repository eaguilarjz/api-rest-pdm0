const { Router } = require('express');
const usuariosController = require('../controllers/usuarios');

const router = Router();

router.post('/registrar', usuariosController.registrar);
router.post('/login', usuariosController.login);

module.exports = router;
