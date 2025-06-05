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

  update: (IdProducto, IdProveedor, callback) => {
    const query = ('UPDATE detalles_proveedor SET ? WHERE ID_producto = ? AND ID_proveedor = ?');
    db.query(query, [IdProducto, IdProveedor], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  delete : (IdProducto, IdProveedor, callback) => {
    db.query('DELET FROM detalles_proveedor WHERE ID_producto = ? AND ID_proveedor', [IdProducto, IdProveedor], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  }

};

module.exports = DetalleProveedor;