const { promise, reject } = require('bcrypt/promises');
const ClienteModel = require('../models/clientes.model');
const bcrypt = require('bcrypt');


const crearCliente = async (clienteData) => {

  const { Num_doc, tip_doc, nombre_usuario, apellidos, telefono, email, rol, estado, direccion, contraseña, fecha_registro } = clienteData;
  if (!Num_doc || !tip_doc || !nombre_usuario || !apellidos || !telefono || !email || !rol || !estado || !direccion || !contraseña || !fecha_registro) {
    throw new Error('Todos los campos son necesarios');
  }
  const saltRounds = 10;
  const contraseñaHash = await bcrypt.hash(contraseña, saltRounds);
  const nuevoCliente = { Num_doc, tip_doc, nombre_usuario, apellidos, telefono, email, rol, estado, direccion, contraseña: contraseñaHash, fecha_registro };

  return new promise((resolve, reject) => {
    ClienteModel.create(nuevoCliente, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};


const obtenerClientes = async () => {
  return new promise((resolve, reject) => {
    ClienteModel.getAll((err, clientes) => {
      if (err) return reject(err);
      resolve(clientes);
    });
  });
};

module.exports = {
  crearCliente,
  obtenerClientes
};