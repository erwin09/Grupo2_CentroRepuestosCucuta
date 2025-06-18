const Historial = require('../models/mantenimientos.model');

const crearMantenimiento = async (datos) => {
  const { Id_mantenimientos, fecha, descripcion, ID_vehiculo } = datos;
  if (!Id_mantenimientos || !fecha || !descripcion || !ID_vehiculo ) {
    throw new Error('Todos los campos son necesarios');
  }

  const nuevoMantenimiento = { Id_mantenimientos, fecha, descripcion, ID_vehiculo };
  return new Promise((resolve, reject) => {
    Historial.create(nuevoMantenimiento, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerMantenimientos = async () => {
  return new Promise((resolve, reject) => {
    Historial.getAll((err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerPorIdMantenimientos = async (idMantenimiento) => {
  return new Promise((resolve, reject) => {
    Historial.getById(idMantenimiento, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const actualizarMantenimiento = async (idMantenimiento, datos) => {
  return new Promise ((resolve, reject) => {
    Historial.update(idMantenimiento, datos,(err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};



module.exports = {
  crearMantenimiento,
  obtenerMantenimientos,
  obtenerPorIdMantenimientos,
  actualizarMantenimiento
}