const DetalleServicio = require('../models/detalle_servicio.model');

const crearDetalleServicio = async (datos) => {
  console.log("detalles servicio", datos);
  
  const { ID_mantenimiento, ID_servicio, precio, tecnico } = datos;
  if (!ID_mantenimiento || !ID_servicio || !precio || !tecnico ) {
    throw new Error('Todos los campos son necesarios');
  }

  const nuevoDetalleServicio = { ID_mantenimiento, ID_servicio, precio, tecnico };
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

const obtenerDetallesServicioStadist = async () => {
  return new Promise((resolve, reject) => {
    DetalleServicio.getAllStadistic((err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerPorIdDetallesServicio = async (IdMantenimiento) => {
  return new Promise((resolve, reject) => {
    DetalleServicio.getById(IdMantenimiento, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const actualizarDetalleServicio = async (IdMantenimiento, IdServicio, datos) => {
  return new Promise ((resolve, reject) => {
    DetalleServicio.update(IdMantenimiento, IdServicio, datos,(err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};



module.exports = {
  crearDetalleServicio,
  obtenerDetallesServicio,
  obtenerDetallesServicioStadist,
  obtenerPorIdDetallesServicio,
  actualizarDetalleServicio
}