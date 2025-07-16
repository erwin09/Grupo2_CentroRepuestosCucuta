const Cita = require('../models/citas.model');
const db = require('../config/db');
const crearCita = async (datos) => {
  const { Id_cita, nombre, fecha, estado, ID_vehiculo } = datos;
  if (!Id_cita || !nombre || !fecha || !estado || !ID_vehiculo ) {
    throw new Error('Todos los campos son necesarios');
  }

  const nuevoCita = { Id_cita, nombre, fecha, estado, ID_vehiculo };
  return new Promise((resolve, reject) => {
    Cita.create(nuevoCita, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerNuevoIdCitas = (callback) => {
  const query = `SELECT Id_cita FROM citas ORDER BY Id_cita DESC LIMIT 1`;
  db.query(query, (err, results) => {
    if (err) return callback(err);

    let nuevoId;
    if (results.length > 0) {
      const ultimo = results[0].Id_cita;
      const numero = parseInt(ultimo.split('-')[1]) + 1;
      nuevoId = `CIT-${numero.toString().padStart(6, '0')}`;
    } else {
      nuevoId = 'CIT-000001';
    }

    callback(null, nuevoId);
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

const obtenerPorIdClient = async (idCliente) => {
  return new Promise((resolve, reject) => {
    Cita.getByIdClient(idCliente, (err, result) => {
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
  obtenerNuevoIdCitas,
  obtenerPorIdClient,
  obtenerPorIdCita,
  actualizarCita
}