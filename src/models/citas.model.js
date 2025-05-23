const db = require('../config/db');

const Citas = {
    create: (cita, callback) => {
    const query = `INSERT INTO citas SET ?`;
    db.query(query, cita, (err, results) => {
      if (err) {
        console.error(err);
      return callback(err);
      }
      callback(null, results);
    });
  },

  getAll: (callback) => {
    db.query('SELEct * FROM citas', (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  getById: (idCita, callback) => {
    db.query('SELECT * FROM citas WHERE Id_cita = ?', [idCita], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  update: (idCita, cita, callback) => {
    const query = ('UPDATE Citas SET ? WHERE Id_cita = ?');
    db.query(query, [cita, idCita], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  delete : (idCita, callback) => {
    db.query('DELET FROM Citas WHERE Id_cita = ?', [idCita], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  }

};

module.exports = Citas;