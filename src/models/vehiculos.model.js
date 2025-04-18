const db = require('../config/db');

const Vehiculo = {
  create: (vehiculo, callback) => {
    const query = `
      INSERT INTO vehiculos 
      (placa, marca, modelo, color, tipo_motor, ID_usuario) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      vehiculo.placa,
      vehiculo.marca,
      vehiculo.modelo,
      vehiculo.color,
      vehiculo.tipo_motor,
      vehiculo.ID_usuario
    ];

    db.query(query, values, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
};

module.exports = Vehiculo;
