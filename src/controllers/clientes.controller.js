const Cliente = require('../models/clientes.model');
const clientesServices = require('../services/clientes.services');


// Crear un nuevo cliente
exports.createCliente = async (req, res) => {
  try {
    const result = await clientesServices.createCliente(req, res);
    res.status(201).send({ message: 'Cliente creado exitosamente', result });

  } catch (error) {
    if (error.message === 'Todos los campos son necesarios') {
      return res.status(400).send({ message: error.message });
    }
    res.status(500).send({ message: 'Error al crear el cliente', error });
  }
};

// Obtener todos los clientes
exports.getAllClientes = async (req, res) => {

  try {
    const clientes = await clientesServices.obtenerClientes();
    res.status(201).send(clientes);
  } catch (error) {
    res.status(500).send({message: 'Error al obtener los clientes', error})
  }


  Cliente.getAll((err, clientes) => {
    if (err) {
      return res.status(500).send({ message: 'Error al obtener los clientes', error: err });
    }
    res.status(200).send(clientes);
  });
};

// Obtener un cliente por ID
exports.getClienteById = (req, res) => {
  const id = req.params.id;
  Cliente.getById(id, (err, cliente) => {
    if (err) {
      return res.status(500).send({ message: 'Error al obtener cliente', error: err });
    }
    if (!cliente.length) {
      return res.status(404).send({ message: 'Cliente no encontrado' });
    }
    res.status(200).send(cliente[0]);
  });
};

// Actualizar un cliente
exports.updateCliente = (req, res) => {
  const id = req.params.id;
  const { nombre, email, telefono } = req.body;

  if (!nombre || !email || !telefono) {
    return res.status(400).send({ message: 'Todos los campos son necesarios' });
  }

  const clienteActualizado = { nombre, email, telefono };

  Cliente.update(id, clienteActualizado, (err, result) => {
    if (err) {
      return res.status(500).send({ message: 'Error al actualizar cliente', error: err });
    }
    res.status(200).send({ message: 'Cliente actualizado exitosamente', result });
  });
};

// Eliminar un cliente
exports.deleteCliente = (req, res) => {
  const id = req.params.id;
  Cliente.delete(id, (err, result) => {
    if (err) {
      return res.status(500).send({ message: 'Error al eliminar cliente', error: err });
    }
    res.status(200).send({ message: 'Cliente eliminado exitosamente', result });
  });
};
