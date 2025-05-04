const db = require('../config/db');

const Vehiculo = {
  create: (vehiculo, callback) => {
    const query = `
      INSERT INTO vehiculos SET ?`;
    db.query(query, values, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  getAll: (callback) => {
    db.query('SELEct * FROM vehiculos', (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, results);
    });
  }
};

module.exports = Vehiculo;
