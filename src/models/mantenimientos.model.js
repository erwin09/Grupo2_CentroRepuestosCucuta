const db = require('../config/db');

const Mantenimiento = {
    create: (mantenimiento, callback) => {
    const query = `INSERT INTO mantenimientos SET ?`;
    db.query(query, mantenimiento, (err, results) => {
      if (err) {
        console.error(err);
      return callback(err);
      }
      callback(null, results);
    });
  },

  getAll: (callback) => {
    db.query('SELEct * FROM mantenimientos', (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  getById: (idMantenimiento, callback) => {
    db.query('SELECT * FROM mantenimientos WHERE Id_mantenimientos = ?', [idMantenimiento], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  update: (idMantenimiento, mantenimiento, callback) => {
    const query = ('UPDATE mantenimientos SET ? WHERE Id_mantenimientos = ?');
    db.query(query, [mantenimiento, idMantenimiento], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  delete : (idMantenimiento, callback) => {
    db.query('DELET FROM mantenimientos WHERE Id_mantenimientos = ?', [idMantenimiento], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  }

};

module.exports = Mantenimiento;