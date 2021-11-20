const { Router } = require('express');
const tareasRoutes = require('./tareas');

const router = Router();

router.use('/tareas', tareasRoutes);

module.exports = router;
