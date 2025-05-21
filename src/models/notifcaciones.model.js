const db = require('../config/db');

const Notificacion = {
    create: (notificacion, callback) => {
    const query = `INSERT INTO notificaciones SET ?`;
    db.query(query, notificacion, (err, results) => {
      if (err) {
        console.error(err);
      return callback(err);
      }
      callback(null, results);
    });
  },

  getAll: (callback) => {
    db.query('SELEct * FROM notificaciones', (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  getById: (idNotificacion, callback) => {
    db.query('SELECT * FROM notificaciones WHERE Id_notificacion = ?', [idNotificacion], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  update: (idNotificacion, notificacion, callback) => {
    const query = ('UPDATE notificaciones SET ? WHERE Id_notificacion = ?');
    db.query(query, [notificacion, idNotificacion], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  delete : (idNotificacion, callback) => {
    db.query('DELET FROM notificaciones WHERE Id_notificacion = ?', [idNotificacion], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  }

};

module.exports = Notificacion;