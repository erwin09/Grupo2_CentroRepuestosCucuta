const db = require('../config/db');
const dayjs = require('dayjs');

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

  getAllNotificador: () => {
  return new Promise((resolve, reject) => {
    const hoy = dayjs().format('YYYY-MM-DD');
    const query = (`
      SELECT m.Id_mantenimientos, u.telefono, v.placa, n.mensaje, dn.fecha_programada
      FROM notificaciones n
      JOIN detalles_notificacion dn ON dn.ID_notificacion = n.Id_notificacion
      JOIN mantenimientos m ON m.Id_mantenimientos = dn.ID_mantenimiento
      JOIN vehiculos v ON v.placa = m.ID_vehiculo
      JOIN usuarios u ON u.Num_doc = v.ID_usuario
      WHERE dn.fecha_programada = ?
    `);

    db.query(query, [hoy], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result); // ← devuelve solo `result`, no un array con él
      }
    });
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