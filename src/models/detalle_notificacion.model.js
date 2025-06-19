const db = require('../config/db');

const DetalleNotificacion = {
    create: (notificacion, callback) => {
    const query = `INSERT INTO detalles_notificacion SET ?`;
    db.query(query, notificacion, (err, results) => {
      if (err) {
        console.error(err);
      return callback(err);
      }
      callback(null, results);
    });
  },

  getAll: (callback) => {
    db.query('SELEct * FROM detalles_notificacion', (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  getById: (IdNotificacion, IdMantenimiento, callback) => {
    db.query('SELECT * FROM detalles_notificacion WHERE ID_notificacion = ? AND ID_mantenimiento = ?', [IdNotificacion, IdMantenimiento], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  update: (IdNotificacion, IdMantenimiento, callback) => {
    const query = ('UPDATE detalles_notificacion SET ? WHERE ID_notificacion = ? AND ID_mantenimiento = ?');
    db.query(query, [IdNotificacion, IdMantenimiento], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  delete : (IdNotificacion, IdMantenimiento, callback) => {
    db.query('DELET FROM detalles_notificacion WHERE ID_notificacion = ? AND ID_mantenimiento', [IdNotificacion, IdMantenimiento], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  }

};

module.exports = DetalleNotificacion;