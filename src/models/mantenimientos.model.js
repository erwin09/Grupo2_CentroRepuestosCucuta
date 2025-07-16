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
    const query = `
    SELECT
      m.Id_mantenimientos,
      u.Num_doc,
      m.fecha,
      m.descripcion,
      v.placa,
      u.nombre_usuario,
      GROUP_CONCAT(DISTINCT s.nombre SEPARATOR ', ') AS servicios,
      GROUP_CONCAT(DISTINCT CONCAT(p.nombre, ' (Cant: ', dp.cantidad, ')') SEPARATOR ', - ') AS repuestos
    FROM mantenimientos m
    JOIN vehiculos v ON m.ID_vehiculo = v.placa
    JOIN usuarios u ON v.ID_usuario = u.Num_doc
    LEFT JOIN detalles_servicio ds ON m.Id_mantenimientos = ds.ID_mantenimiento
    LEFT JOIN servicios s ON ds.ID_servicio = s.Id_servicios
    LEFT JOIN detalles_producto dp ON m.Id_mantenimientos = dp.ID_mantenimiento
    LEFT JOIN productos p ON dp.ID_producto = p.Id_producto
    GROUP BY m.Id_mantenimientos, m.fecha, v.placa, m.descripcion, u.nombre_usuario;`
    db.query(query, (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  getByPlaca: (Id_usuario, callback) => {
    const query = `
    SELECT
      m.Id_mantenimientos,
      m.fecha,
      v.placa,
      u.nombre_usuario,
      GROUP_CONCAT(DISTINCT s.nombre SEPARATOR ', ') AS servicios,
      GROUP_CONCAT(DISTINCT CONCAT(p.nombre, ' (', dp.cantidad, ')') SEPARATOR ', ') AS repuestos
    FROM mantenimientos m
    JOIN vehiculos v ON m.ID_vehiculo = v.placa
    JOIN usuarios u ON v.ID_usuario = u.Num_doc
    LEFT JOIN detalles_servicio ds ON m.Id_mantenimientos = ds.ID_mantenimiento
    LEFT JOIN servicios s ON ds.ID_servicio = s.Id_servicios
    LEFT JOIN detalles_producto dp ON m.Id_mantenimientos = dp.ID_mantenimiento
    LEFT JOIN productos p ON dp.ID_producto = p.Id_producto
    WHERE u.Num_doc = ?
    GROUP BY m.Id_mantenimientos, m.fecha, v.placa, u.nombre_usuario
    ORDER BY m.fecha DESC
  `;

    db.query(query, [Id_usuario], (err, result) => {
      if (err) {
        console.error("Error al ejecutar la consulta:", err);
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
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  delete: (idMantenimiento, callback) => {
    db.query('DELET FROM mantenimientos WHERE Id_mantenimientos = ?', [idMantenimiento], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  }

};

module.exports = Mantenimiento;