const DetalleServicio = require('../models/detalle_servicio.model');

const crearDetalleServicio = async (datos) => {
  const { ID_historial, ID_servicio } = datos;
  if (!ID_historial || !ID_servicio ) {
    throw new Error('Todos los campos son necesarios');
  }

  const nuevoDetalleServicio = { ID_historial, ID_servicio };
  return new Promise((resolve, reject) => {
    DetalleServicio.create(nuevoDetalleServicio, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerDetallesServicio = async () => {
  return new Promise((resolve, reject) => {
    DetalleServicio.getAll((err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerPorIdDetallesServicio = async (IdHistorial, IdServicio) => {
  return new Promise((resolve, reject) => {
    DetalleServicio.getById(IdHistorial, IdServicio, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const actualizarDetalleServicio = async (IdHistorial, IdServicio, datos) => {
  return new Promise ((resolve, reject) => {
    DetalleServicio.update(IdHistorial, IdServicio, datos,(err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};



module.exports = {
  crearDetalleServicio,
  obtenerDetallesServicio,
  obtenerPorIdDetallesServicio,
  actualizarDetalleServicio
}