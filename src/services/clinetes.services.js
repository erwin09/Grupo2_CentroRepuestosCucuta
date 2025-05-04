const ClienteModel = require('../models/clientes.model');

const ClienteService = {
  crearCliente: (clienteData, callback) => {
    ClienteModel.create(clienteData, callback);
  },

  obtenerClientes: (callback) => {
    ClienteModel.getAll(callback);
  }
};

module.exports = ClienteService;