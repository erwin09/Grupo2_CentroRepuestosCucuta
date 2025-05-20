const Servicio = require('../models/servicios.model')

const crearServicio = async (datos) => {
  const { Id_servicios, nombre, precio, tiempo_estimado, descripcion} = datos;
  if (!Id_servicios || !nombre || !precio || !tiempo_estimado || !descripcion ) {
    throw new Error('Todos los campos son necesarios');
  }

  const nuevoServicio = { Id_servicios, nombre, precio, tiempo_estimado, descripcion };
  return new Promise((resolve, reject) => {
    Servicio.create(nuevoServicio, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerServicios = async () => {
  return new Promise((resolve, reject) => {
    Servicio.getAll((err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerPorIdServicio = async (idServicio) => {
  return new Promise((resolve, reject) => {
    Servicio.getById(idServicio, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const actualizarServicio = async (idServicio, datos) => {
  return new Promise ((resolve, reject) => {
    Servicio.update(idServicio, datos,(err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};



module.exports = {
  crearServicio,
  obtenerServicios,
  obtenerPorIdServicio,
  actualizarServicio
}