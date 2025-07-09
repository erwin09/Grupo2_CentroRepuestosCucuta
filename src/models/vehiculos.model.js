const db = require('../config/db');

const Vehiculo = {
  create: (vehiculo, callback) => {
    const query = `
      INSERT INTO vehiculos SET ?`;
    db.query(query, vehiculo, (err, results) => {
      if (err) {
        console.error(err);
      return callback(err);
      }
      callback(null, results);
    });
  },

  getAll: (callback) => {
    db.query('SELEct * FROM vehiculos', (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  getById: (placa, callback) => {
    console.log("numero de documento en la consulta", placa);
    
    db.query('SELECT * FROM vehiculos WHERE placa = ?', [placa], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  getByIdUsuario: (ID_usuario, callback) => {
    console.log("numero de documento en la consulta", ID_usuario);
    
    db.query('SELECT * FROM vehiculos WHERE ID_usuario = ?', [ID_usuario], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  update: (placa, vehiculo, callback) => {
    const query = ('UPDATE vehiculos SET ? WHERE placa = ?');
    db.query(query, [vehiculo, placa], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  delete : (placa, callback) => {
    db.query('DELET FROM vehiculos WHERE placa = ?', [placa], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  }
};

module.exports = Vehiculo;
