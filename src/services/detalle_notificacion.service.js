const DetalleNotificacion = require('../models/detalle_notificacion.model');

const crearDetalleNotificacion = async (datos) => {
  const { ID_notificacion, ID_mantenimiento, detalle } = datos;
  if (!ID_notificacion || !ID_mantenimiento || !detalle ) {
    throw new Error('Todos los campos son necesarios');
  }

  const nuevoDetalleNotificacion = { ID_notificacion, ID_mantenimiento, detalle };
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

const obtenerPorIdDetallesNotificacion = async (IdNotificacion, IdMantenimiento) => {
  return new Promise((resolve, reject) => {
    DetalleNotificacion.getById(IdNotificacion, IdMantenimiento, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const actualizarDetalleNotificacion = async (IdNotificacion, IdMantenimiento, datos) => {
  return new Promise ((resolve, reject) => {
    DetalleNotificacion.update(IdNotificacion, IdMantenimiento, datos,(err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};



module.exports = {
  crearDetalleNotificacion,
  obtenerDetallesNtoificacion,
  obtenerPorIdDetallesNotificacion,
  actualizarDetalleNotificacion
}