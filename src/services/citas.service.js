const Cita = require('../models/citas.model');

const crearCita = async (datos) => {
  const { Id_cita, nombre, fecha, ID_vehiculo } = datos;
  if (!Id_cita || !nombre || !fecha || !ID_vehiculo ) {
    throw new Error('Todos los campos son necesarios');
  }

  const nuevoCita = { Id_cita, nombre, fecha, ID_vehiculo };
  return new Promise((resolve, reject) => {
    Cita.create(nuevoCita, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerCitas = async () => {
  return new Promise((resolve, reject) => {
    Cita.getAll((err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerPorIdCita = async (idCita) => {
  return new Promise((resolve, reject) => {
    Cita.getById(idCita, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const actualizarCita = async (idCita, datos) => {
  return new Promise ((resolve, reject) => {
    Cita.update(idCita, datos,(err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};



module.exports = {
  crearCita,
  obtenerCitas,
  obtenerPorIdCita,
  actualizarCita
}