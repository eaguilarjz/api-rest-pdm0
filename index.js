require('dotenv').config();

const express = require('express');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Error desconocido';

  res.status(status).send({ status, message });
};

app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log('Servidor escuchando en el puerto ' + port);
});
