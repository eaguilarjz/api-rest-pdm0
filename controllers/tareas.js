const db = require('../db');

const listarTareas = async (req, res) => {
  try {
    const tareas = await db('tareas').select();
    res.status(200).send(tareas);
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};

const crearTarea = async (req, res) => {
  const titulo = req.body.titulo;
  const descripcion = req.body.descripcion || '';
  const completada = req.body.completada || false;
  if (!titulo)
    return res
      .status(400)
      .send({ status: 400, message: 'titulo es requerido' });

  try {
    const nuevasTareas = await db('tareas')
      .insert({
        titulo: titulo,
        descripcion: descripcion,
        completada: completada,
      })
      .returning('*');

    res.status(201).send(nuevasTareas[0]);
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};

const modificarTarea = async (req, res) => {
  const id = Number(req.params.id) || -1;
  try {
    const tareaAModificar = await db('tareas').first().where({ id: id });
    if (!tareaAModificar)
      return res.status(404).send({
        status: 404,
        message: 'La tarea con id ' + id + ' no existe.',
      });

    const titulo = req.body.titulo;
    const descripcion = req.body.descripcion;
    const completada = req.body.completada;

    // Actualización condicional de campos
    if (titulo) tareaAModificar.titulo = titulo;
    if (descripcion) tareaAModificar.descripcion = descripcion;
    if (completada != null) tareaAModificar.completada = completada;

    const tareas = await db('tareas')
      .update({
        titulo: tareaAModificar.titulo,
        descripcion: tareaAModificar.descripcion,
        completada: tareaAModificar.completada,
      })
      .where({ id: id })
      .returning('*');

    res.status(200).send(tareas[0]);
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};

const borrarTarea = async (req, res) => {
  const id = Number(req.params.id) || -1;
  try {
    const tareaABorrar = await db('tareas').first().where({ id: id });
    if (!tareaABorrar)
      return res.status(404).send({
        status: 404,
        message: 'La tarea con id ' + id + ' no existe.',
      });

    await db('tareas').delete().where({ id: id });

    res.status(204).send();
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};

module.exports = {
  listarTareas,
  crearTarea,
  modificarTarea,
  borrarTarea,
};
