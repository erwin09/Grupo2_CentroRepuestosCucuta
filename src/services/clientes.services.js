const ClienteModel = require('../models/clientes.model');
const bcrypt = require('bcrypt');

const crearCliente = async (clienteData) => {
  const { Num_doc, tip_doc, nombre_usuario, apellidos, telefono, email, rol, estado, direccion, contrasena, fecha_registro } = clienteData;
  if (!Num_doc || !tip_doc || !nombre_usuario || !apellidos || !telefono || !email || !rol || !estado || !direccion || !contrasena || !fecha_registro) {
    throw new Error('Todos los campos son necesarios');
  }
  console.log("clientedata", clienteData);
  

  const saltRounds = 10;
  const contraseñaHash = await bcrypt.hash(contrasena, saltRounds);
  const nuevoCliente = { Num_doc, tip_doc, nombre_usuario, apellidos, telefono, email, rol, estado, direccion, contrasena: contraseñaHash, fecha_registro };
console.log(" nuevocliente", nuevoCliente);
  return await ClienteModel.create(nuevoCliente);
};


const obtenerClientes = async () => {
  return new Promise((resolve, reject) => {
    ClienteModel.getAll((err, clientes) => {
      if (err) return reject(err);
      resolve(clientes);
    });
  });
};

const obtenerPorId = async (idData) => {
  return new Promise((resolve, reject) => {
    ClienteModel.getById(idData, (err, cliente) => {
      if (err) return reject(err);
      resolve(cliente);
    });
  });
};

const actualizarUsuario = async (idData, cliente) => {
  const pasword = cliente.contrasena;
  if (pasword) {
    const saltRounds = 10;
    const contraseñaHash = await bcrypt.hash(pasword, saltRounds);
    cliente.contrasena = contraseñaHash;
  }
  return new Promise((resolve, reject) => {
    ClienteModel.update(idData, cliente, (err, datos) => {
      if (err) return reject(err);
      resolve(datos);
    });
  });
};

module.exports = {
  crearCliente,
  obtenerClientes,
  obtenerPorId,
  actualizarUsuario
};