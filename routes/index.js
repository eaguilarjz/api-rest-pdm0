const { Router } = require('express');
const tareasRoutes = require('./tareas');
const usuarioRoutes = require('./usuarios');

const router = Router();

router.use('/tareas', tareasRoutes);
router.use('/usuarios', usuarioRoutes);

module.exports = router;
