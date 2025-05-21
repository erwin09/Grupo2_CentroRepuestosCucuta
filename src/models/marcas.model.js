const db = require('../config/db');

const Marcas = {
    create: (marca, callback) => {
    const query = `INSERT INTO marcas SET ?`;
    db.query(query, marca, (err, results) => {
      if (err) {
        console.error(err);
      return callback(err);
      }
      callback(null, results);
    });
  },

  getAll: (callback) => {
    db.query('SELEct * FROM marcas', (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  getById: (idmarca, callback) => {
    db.query('SELECT * FROM marcas WHERE Id_marca = ?', [idmarca], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  update: (idmarca, marca, callback) => {
    const query = ('UPDATE marcas SET ? WHERE Id_marca = ?');
    db.query(query, [marca, idmarca], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  delete : (idmarca, callback) => {
    db.query('DELET FROM marcas WHERE Id_marca = ?', [idmarca], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  }

};

module.exports = Marcas;