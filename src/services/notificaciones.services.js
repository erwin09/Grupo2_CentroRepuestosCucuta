const Notificacion = require('../models/notifcaciones.model');

const crearNotificacion = async (datos) => {
  const { Id_notificacion, nombre, descripcion, fecha_activacion, fecha_notificacion } = datos;
  if (!Id_notificacion || !nombre || !descripcion || !fecha_activacion || !fecha_notificacion ) {
    throw new Error('Todos los campos son necesarios');
  }

  const nuevaNotificacion = { Id_notificacion, nombre, descripcion, fecha_activacion, fecha_notificacion };
  return new Promise((resolve, reject) => {
    Notificacion.create(nuevaNotificacion, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerNotificaciones = async () => {
  return new Promise((resolve, reject) => {
    Notificacion.getAll((err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerPorIdNotificacion = async (idNotificacion) => {
  return new Promise((resolve, reject) => {
    Notificacion.getById(idNotificacion, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const actualizarNotificacion = async (idNotificacion, datos) => {
  return new Promise ((resolve, reject) => {
    Notificacion.update(idNotificacion, datos,(err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
 crearNotificacion,
  obtenerNotificaciones,
  obtenerPorIdNotificacion,
  actualizarNotificacion
}