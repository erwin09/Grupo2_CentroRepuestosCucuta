const db = require('../config/db');

const Productos = {
    create: (producto, callback) => {
    const query = `INSERT INTO productos SET ?`;
    db.query(query, producto, (err, results) => {
      if (err) {
        console.error(err);
      return callback(err);
      }
      callback(null, results);
    });
  },

  getAll: (callback) => {
    db.query('SELEct * FROM productos', (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  getById: (idProducto, callback) => {
    db.query('SELECT * FROM productos WHERE Id_producto = ?', [idProducto], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  update: (idProducto, producto, callback) => {
    const query = ('UPDATE productos SET ? WHERE Id_producto = ?');
    db.query(query, [producto, idProducto], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  delete : (idProducto, callback) => {
    db.query('DELET FROM productos WHERE Id_producto = ?', [idProducto], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  }

};

module.exports = Productos;