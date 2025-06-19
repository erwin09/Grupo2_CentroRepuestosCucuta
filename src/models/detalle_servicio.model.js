const db = require('../config/db');

const DetalleServicio = {
    create: (servicio, callback) => {
    const query = `INSERT INTO detalles_servicio SET ?`;
    db.query(query, servicio, (err, results) => {
      if (err) {
        console.error(err);
      return callback(err);
      }
      callback(null, results);
    });
  },

  getAll: (callback) => {
    db.query('SELEct * FROM detalles_servicio', (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  getById: (IdMantenimiento, Idservicio, callback) => {
    db.query('SELECT * FROM detalles_servicio WHERE ID_mantenimiento = ? AND ID_servicio = ?', [IdMantenimiento, Idservicio], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  update: (IdMantenimiento, Idservicio, callback) => {
    const query = ('UPDATE detalles_servicio SET ? WHERE ID_mantenimiento = ? AND ID_servicio = ?');
    db.query(query, [IdMantenimiento, Idservicio], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  delete : (IdMantenimiento, Idservicio, callback) => {
    db.query('DELET FROM detalles_servicio WHERE ID_mantenimiento = ? AND ID_servicio', [IdMantenimiento, Idservicio], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  }

};

module.exports = DetalleServicio;