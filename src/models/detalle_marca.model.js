const db = require('../config/db');

const DetalleMarca = {
  create: (datos, callback) => {
    const query = `INSERT INTO detalles_marca SET ?`;
    db.query(query, datos, (err, results) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, results);
    });
  },
   
  createUpdate: (datos) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO detalles_marca SET ?', [datos], (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
        resolve(result);
      });
    });
  },

  getAll: (callback) => {
    db.query('SELEct * FROM detalles_marca', (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  getById: (IDproducto, Idmarca, callback) => {
    db.query('SELECT * FROM detalles_marca WHERE ID_producto = ? AND ID_marca = ?', [IDproducto, Idmarca], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  getByIdUpdate: (IDproducto, Idmarca) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM detalles_marca WHERE ID_producto = ? AND ID_marca = ?', [IDproducto, Idmarca], (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
        resolve(result);
      });
    });
  },

  update: (IDproducto, Idmarca, datos, callback) => {
    const query = ('UPDATE detalles_marca SET ? WHERE ID_producto = ? AND ID_marca = ?');
    db.query(query, [IDproducto, Idmarca, datos], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  updateCantidad: (ID_producto, Id_marca, cantidad) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE detalles_marca SET cantidad = ? WHERE ID_producto = ? AND ID_marca = ?', [cantidad, ID_producto, Id_marca], (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
        resolve(result);
      });
    });
  },

  delete: (IDproducto, Idmarca, callback) => {
    db.query('DELET FROM detalles_marca WHERE ID_producto = ? AND ID_marca', [IDproducto, Idmarca], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  }

};

module.exports = DetalleMarca;