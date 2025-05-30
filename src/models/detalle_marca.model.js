const db = require('../config/db');

const DetalleMarca = {
    create: (cita, callback) => {
    const query = `INSERT INTO detalles_marca SET ?`;
    db.query(query, cita, (err, results) => {
      if (err) {
        console.error(err);
      return callback(err);
      }
      callback(null, results);
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

  update: (IDproducto, Idmarca, callback) => {
    const query = ('UPDATE detalles_marca SET ? WHERE ID_producto = ? AND ID_marca = ?');
    db.query(query, [IDproducto, Idmarca], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  delete : (IDproducto, Idmarca, callback) => {
    db.query('DELET FROM detalles_marca WHERE ID_producto = ? AND ID_marca', [IDproducto, Idmarca], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  }

};

module.exports = DetalleMarca;