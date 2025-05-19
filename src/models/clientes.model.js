// src/models/cliente.model.js
const db = require('../config/db');

const Cliente = {
  // Crear un nuevo cliente
  create: (cliente) => {
    const query = 'INSERT INTO usuarios SET ?';

    return new Promise((resolve, reject) => {
      db.query(query, cliente, (err, results) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(results)
        }
      });
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
    const camposPermitidos = ['nombre_usuario', 'apellidos', 'telefono', 'direccion', 'email'];
    const clienteFiltrado = {};

    camposPermitidos.forEach(campo => {
      if (cliente[campo] !== undefined) {
        clienteFiltrado[campo] = cliente[campo];
      }
    });
    const query = 'UPDATE usuarios SET ? WHERE Num_doc = ?';
    db.query(query, [cliente, numdoc], (err, results) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      db.query('SELECT * FROM usuarios WHERE Num_doc =?', [numdoc], (err2, rows) => {
        if (err2) {
          console.error(err2);
          return callback(err2);
        }
        callback(null, rows[0]);
      });
    });
  },

  // Eliminar un cliente
  delete: (numdoc, callback) => {
    const query = 'DELETE FROM usuarios WHERE Num_doc = ?';
    db.query(query, [numdoc], (err, results) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, results);
    });
  }
};

module.exports = Cliente;
