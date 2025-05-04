// src/models/cliente.model.js
const db = require('../config/db');

const Cliente = {
  // Crear un nuevo cliente
  create: (cliente, callback) => {
    const query = 'INSERT INTO usuarios SET ?';
    db.query(query, cliente, (err, results) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, results);
    });
  },

  // Obtener todos los clientes
  getAll: (callback) => {
    const query = 'SELECT * FROM usuarios';
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, results);
    });
  },

  // Obtener un cliente por su ID
  getById: (numdoc, callback) => {
    const query = 'SELECT * FROM usuarios WHERE Num_doc = ?';
    db.query(query, [numdoc], (err, results) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, results);
    });
  },

  // Actualizar un cliente
  update: (numdoc, cliente, callback) => {
    const query = 'UPDATE usuarios SET tip_doc = ?, nombre_usuario = ?,  apellidos = ?, telefomo = ?,  email = ?, rol = ?, estado = ?, direccion = ?, contraseña = ? WHERE Num_doc = ?';
    db.query(query, [cliente.tip_doc, cliente.nombre_usuario, cliente.apellidos, cliente.telefono, cliente.email, cliente.rol, cliente.estado, cliente.direccion, cliente.contraseña, numdoc], (err, results) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, results);
    });
  },

  // Eliminar un cliente
  delete: (numdoc, callback) => {
    const query = 'DELETE FROM usuarios WHERE Num_doc = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, results);
    });
  }
};

module.exports = Cliente;
