const db = require('../config/db');

const Proveedor = {
    create: (proveedor, callback) => {
    const query = `INSERT INTO proveedores SET ?`;
    db.query(query, proveedor, (err, results) => {
      if (err) {
        console.error(err);
      return callback(err);
      }
      callback(null, results);
    });
  },

  getAll: (callback) => {
    db.query('SELEct * FROM proveedores', (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  getById: (idProveedor, callback) => {
    db.query('SELECT * FROM proveedores WHERE Id_proveedor = ?', [idProveedor], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  update: (idProveedor, proveedor, callback) => {
    const query = ('UPDATE proveedores SET ? WHERE Id_proveedor = ?');
    db.query(query, [proveedor, idProveedor], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  delete : (idProveedor, callback) => {
    db.query('DELET FROM proveedores WHERE Id_proveedor = ?', [idProveedor], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  }

};

module.exports = Proveedor;