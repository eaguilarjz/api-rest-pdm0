const { Router } = require('express');
const tareasController = require('../controllers/tareas');
const jwt = require('express-jwt');

const router = Router();

router.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }));

router.get('', tareasController.listarTareas);

router.post('', tareasController.crearTarea);

router.patch('/:id', tareasController.modificarTarea);

router.delete('/:id', tareasController.borrarTarea);

module.exports = router;
