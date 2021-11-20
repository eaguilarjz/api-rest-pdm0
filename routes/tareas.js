const { Router } = require('express');
const tareasController = require('../controllers/tareas');

const router = Router();

router.get('', tareasController.listarTareas);

router.post('', tareasController.crearTarea);

router.patch('/:id', tareasController.modificarTarea);

router.delete('/:id', tareasController.borrarTarea);

module.exports = router;
