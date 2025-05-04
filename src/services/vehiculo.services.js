const Vehiculo = require('../models/vehiculo.model');

exports.crearVehiculo = (datos, callback) => {
  Vehiculo.createVehiculo(datos, callback);
};

exports.obtenerVehiculos = (callback) => {
  Vehiculo.getAll(callback);
}