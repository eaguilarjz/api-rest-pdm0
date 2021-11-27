const { hash, compare } = require('bcryptjs');
const db = require('../db');
const { sign } = require('jsonwebtoken');

const generarToken = usuario => {
  const token = sign(
    { id: usuario.id, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return token;
};

const registrar = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const passwordHash = await hash(password, 12);

  const existente = await db('usuarios').first().where({ email: email });
  if (existente) {
    return res
      .status(409)
      .send({ status: 409, message: 'Este email ya está registrado' });
  }

  const [usuario] = await db('usuarios')
    .insert({ email: email, password: passwordHash })
    .returning('*');

  const token = generarToken(usuario);

  res.status(201).send({ token: token });
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const usuario = await db('usuarios').first().where({ email: email });
  if (!usuario) {
    return res
      .status(401)
      .send({ status: 401, message: 'Credenciales no válidas' });
  }

  const passwordValido = await compare(password, usuario.password);
  if (!passwordValido) {
    return res
      .status(401)
      .send({ status: 401, message: 'Credenciales no válidas' });
  }

  const token = generarToken(usuario);

  res.status(200).send({ token: token });
};

module.exports = {
  registrar,
  login,
};
