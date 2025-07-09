const db = require('../config/db');

const Proveedor = {
  create: (proveedor, callback) => {
    const query = `INSERT INTO proveedores SET ?`;
    db.query(query, proveedor, (err, results) => {
      if (err) {
        console.error(err);
        return callback(err);
      } 
      
      const insertedId = proveedor.Id_proveedor;
      const selectQuery = `SELECT * FROM proveedores WHERE Id_proveedor = ?`;
      db.query(selectQuery, [insertedId], (err, rows) => {
        if (err) {
          console.error(err);
          return callback(err);
        }

        callback(null, rows[0]);
      });
    });
  },

  createUpdate: (datos) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO proveedor SET ?', [datos], (err, result) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        resolve(result);
      });
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

  getByName: (nameProveedor) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM proveedores WHERE nombre = ?', [nameProveedor], (err, result) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        resolve(result);
      });
    });
  },

  update: (idProveedor, proveedor, callback) => {
    const query = ('UPDATE proveedores SET ? WHERE Id_proveedor = ?');
    db.query(query, [proveedor, idProveedor], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  delete: (idProveedor, callback) => {
    db.query('DELET FROM proveedores WHERE Id_proveedor = ?', [idProveedor], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  }

};

module.exports = Proveedor;