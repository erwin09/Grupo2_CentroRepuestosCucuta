const Historial = require('../models/historiales.model');

const crearHistorial = async (datos) => {
  const { Id_historial, fecha, descripcion, ID_vehiculo } = datos;
  if (!Id_historial || !fecha || !descripcion || !ID_vehiculo ) {
    throw new Error('Todos los campos son necesarios');
  }

  const nuevoHistorial = { Id_historial, fecha, descripcion, ID_vehiculo };
  return new Promise((resolve, reject) => {
    Historial.create(nuevoHistorial, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerHistoriales = async () => {
  return new Promise((resolve, reject) => {
    Historial.getAll((err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerPorIdHistorial = async (idHistorial) => {
  return new Promise((resolve, reject) => {
    Historial.getById(idHistorial, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const actualizarHistorial = async (idHistorial, datos) => {
  return new Promise ((resolve, reject) => {
    Historial.update(idHistorial, datos,(err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};



module.exports = {
  crearHistorial,
  obtenerHistoriales,
  obtenerPorIdHistorial,
  actualizarHistorial
}