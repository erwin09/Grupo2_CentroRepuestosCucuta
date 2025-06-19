const db = require('../config/db');

const DetalleProducto = {
    create: (producto, callback) => {
    const query = `INSERT INTO detalles_producto SET ?`;
    db.query(query, producto, (err, results) => {
      if (err) {
        console.error(err);
      return callback(err);
      }
      callback(null, results);
    });
  },

  getAll: (callback) => {
    db.query('SELEct * FROM detalles_producto', (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  getById: (Idproducto, IdMantenimiento, callback) => {
    db.query('SELECT * FROM detalles_producto WHERE ID_producto = ? AND ID_mantenimiento = ?', [Idproducto, IdMantenimiento], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  update: (Idproducto, IdMantenimiento, callback) => {
    const query = ('UPDATE detalles_producto SET ? WHERE ID_producto = ? AND ID_mantenimiento = ?');
    db.query(query, [Idproducto, IdMantenimiento], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  delete : (Idproducto, IdMantenimiento, callback) => {
    db.query('DELET FROM detalles_producto WHERE ID_producto = ? AND ID_mantenimiento', [Idproducto, IdMantenimiento], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  }

};

module.exports = DetalleProducto;