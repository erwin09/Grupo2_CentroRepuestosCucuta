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

  createCodigo: (Num_doc, codigo, fecha) => {
    console.log("esta en create codigo");

    return new Promise((resolve, reject) => {
      db.query('UPDATE usuarios SET codigo_recuperacion = ?, fecha_codigo = ? WHERE Num_doc = ?', [codigo, fecha, Num_doc], (err, results) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(results)
        }
      });
    });
  },

  verificarCodigosActualizar: (Num_doc, codigoIngresado, nuevaContrasenaHash, callback) => {
    db.query(
      'SELECT codigo_recuperacion, fecha_codigo FROM usuarios WHERE Num_doc = ?',
      [Num_doc],
      (err, result) => {
        if (err) return callback(err);

        if (!result || result.length === 0) {
          return callback(new Error('Usuario no encontrado'));
        }

        const usuario = result[0];

        if (usuario.codigo_recuperacion !== codigoIngresado) {
          return callback(new Error('Código incorrecto'));
        }

        const ahora = new Date();
        const fechaCodigo = new Date(usuario.fecha_codigo);
        const minutosPasados = (ahora - fechaCodigo) / 60000;

        if (minutosPasados > 10) {
          return callback(new Error('Código expirado'));
        }

        // Actualizar contraseña y limpiar código
        db.query(
          'UPDATE usuarios SET contrasena = ?, codigo_recuperacion = NULL, fecha_codigo = NULL WHERE Num_doc = ?',
          [nuevaContrasenaHash, Num_doc],
          (errUpdate, resultUpdate) => {
            if (errUpdate) return callback(errUpdate);
            callback(null, resultUpdate);
          }
        );
      }
    );
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
