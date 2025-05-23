const db = require('../config/db');

const Historiales = {
    create: (historial, callback) => {
    const query = `INSERT INTO historiales SET ?`;
    db.query(query, historial, (err, results) => {
      if (err) {
        console.error(err);
      return callback(err);
      }
      callback(null, results);
    });
  },

  getAll: (callback) => {
    db.query('SELEct * FROM historiales', (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  getById: (idHistorial, callback) => {
    db.query('SELECT * FROM historiales WHERE Id_historial = ?', [idHistorial], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  update: (idHistorial, historial, callback) => {
    const query = ('UPDATE historiales SET ? WHERE Id_historial = ?');
    db.query(query, [historial, idHistorial], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  delete : (idHistorial, callback) => {
    db.query('DELET FROM historiales WHERE Id_historial = ?', [idHistorial], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  }

};

module.exports = Historiales;