const db = require('../config/db');

const DetalleProveedor = {
  create: (proveedor, callback) => {
    const query = `INSERT INTO detalles_proveedor SET ?`;
    db.query(query, proveedor, (err, results) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, results);
    });
  },

  createUpdate: (datos) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO detalles_proveedor SET ?', [datos], (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
        resolve(result);
      });
    });
  },

  getAll: (callback) => {
    db.query('SELEct * FROM detalles_proveedor', (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  getById: (IdProducto, IdProveedor, callback) => {
    db.query('SELECT * FROM detalles_proveedor WHERE ID_producto = ? AND ID_proveedor = ?', [IdProducto, IdProveedor], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  getByIdUpdate: (IDproducto, ID_proveedor) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM detalles_proveedor WHERE ID_producto = ? AND ID_proveedor = ?', [IDproducto, ID_proveedor], (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
        resolve(result);
      });
    });
  },

  update: (IdProducto, IdProveedor, datos, callback) => {
    const query = ('UPDATE detalles_proveedor SET ? WHERE ID_producto = ? AND ID_proveedor = ?');
    db.query(query, [IdProducto, IdProveedor, datos], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  updateObservaciones: (ID_producto, ID_proveedor, observaciones) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE detalles_proveedor SET observaciones = ? WHERE ID_producto = ? AND ID_proveedor = ?', [observaciones, ID_producto, ID_proveedor], (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
        resolve(result);
      });
    });
  },

  delete: (IdProducto, IdProveedor, callback) => {
    db.query('DELET FROM detalles_proveedor WHERE ID_producto = ? AND ID_proveedor', [IdProducto, IdProveedor], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  }

};

module.exports = DetalleProveedor;