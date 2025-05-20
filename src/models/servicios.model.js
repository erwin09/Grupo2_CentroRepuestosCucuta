const db = require('../config/db')

const Servicio = {
    create: (servicio, callback) => {
    const query = `INSERT INTO servicios SET ?`;
    db.query(query, servicio, (err, results) => {
      if (err) {
        console.error(err);
      return callback(err);
      }
      callback(null, results);
    });
  },

  getAll: (callback) => {
    db.query('SELEct * FROM servicios', (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  getById: (Id_servicios, callback) => {
    db.query('SELECT * FROM servicios WHERE Id_servicios = ?', [Id_servicios], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  update: (Id_servicios, servicio, callback) => {
    const query = ('UPDATE servicios SET ? WHERE Id_servicios = ?');
    db.query(query, [servicio, Id_servicios], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  delete : (Id_servicios, callback) => {
    db.query('DELET FROM servicios WHERE Id_servicios = ?', [Id_servicios], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  }

};

module.exports = Servicio;