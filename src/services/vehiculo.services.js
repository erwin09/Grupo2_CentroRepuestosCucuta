const Vehiculo = require('../models/vehiculos.model');

const crearVehiculo = async (datos) => {
  const { placa, marca, modelo, color, tipo_motor, ID_usuario } = datos;
  if (!placa || !marca || !modelo || !color || !tipo_motor || !ID_usuario) {
    throw new Error('Todos los campos son necesarios');
  }

  const nuevoVehiculo = { placa, marca, modelo, color, tipo_motor, ID_usuario };
  return new Promise((resolve, reject) => {
    Vehiculo.create(nuevoVehiculo, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerVehiculos = async () => {
  return new Promise((resolve, reject) => {
    Vehiculo.getAll((err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerPorPlaca = async (placaData) => {
  return new Promise((resolve, reject) => {
    Vehiculo.getById(placaData, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const actualizarVehiculo = async (placa, datos) => {
  return new Promise ((resolve, reject) => {
    Vehiculo.update(placa, datos,(err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  crearVehiculo,
  obtenerVehiculos,
  obtenerPorPlaca,
  actualizarVehiculo
}