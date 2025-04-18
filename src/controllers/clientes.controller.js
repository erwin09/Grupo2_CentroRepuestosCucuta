// src/controllers/clientes.controller.js
const Cliente = require('../models/clientes.model');
const bcrypt = require('bcrypt');

// Crear un nuevo cliente
exports.createCliente = async (req, res) => {
  const { Num_doc, tip_doc, nombre_usuario, apellidos, telefono, email, rol, estado, direccion, contraseña, fecha_registro } = req.body;
  if (!Num_doc || !tip_doc || !nombre_usuario || !apellidos || !telefono || !email || !rol || !estado || !direccion || !contraseña || !fecha_registro) {
    return res.status(400).send({ message: 'Todos los campos son necesarios' });
  }

  try {
    const saltRounds = 10;
    const contraseñaHash = await bcrypt.hash(contraseña, saltRounds);

    const nuevoCliente = { Num_doc, tip_doc, nombre_usuario, apellidos, telefono, email, rol, estado, direccion, contraseña: contraseñaHash, fecha_registro };


    Cliente.create(nuevoCliente, (err, result) => {
      if (err) {
        return res.status(500).send({ message: 'Error al crear cliente', error: err });
      }
      res.status(201).send({ message: 'Cliente creado exitosamente', result });
    });
  } catch (erro) {
    res.status(500).send({ message: 'Error al encriptar la contraseña', error });
  }
};

// Obtener todos los clientes
exports.getAllClientes = (req, res) => {
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
