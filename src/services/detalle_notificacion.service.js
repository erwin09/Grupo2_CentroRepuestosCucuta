const DetalleNotificacion = require('../models/detalle_notificacion.model');

const crearDetalleNotificacion = async (datos) => {
  const { ID_notificacion, ID_historial, detalle } = datos;
  if (!ID_notificacion || !ID_historial || !detalle ) {
    throw new Error('Todos los campos son necesarios');
  }

  const nuevoDetalleNotificacion = { ID_notificacion, ID_historial, detalle };
  return new Promise((resolve, reject) => {
    DetalleNotificacion.create(nuevoDetalleNotificacion, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerDetallesNtoificacion = async () => {
  return new Promise((resolve, reject) => {
    DetalleNotificacion.getAll((err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerPorIdDetallesNotificacion = async (IdNotificacion, IdHistorial) => {
  return new Promise((resolve, reject) => {
    DetalleNotificacion.getById(IdNotificacion, IdHistorial, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const actualizarDetalleMarca = async (IdNotificacion, IdHistorial, datos) => {
  return new Promise ((resolve, reject) => {
    DetalleNotificacion.update(IdNotificacion, IdHistorial, datos,(err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};



module.exports = {
  crearDetalleNotificacion,
  obtenerDetallesNtoificacion,
  obtenerPorIdDetallesNotificacion,
  actualizarDetalleMarca
}