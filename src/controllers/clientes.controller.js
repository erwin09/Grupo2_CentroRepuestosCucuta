const Cliente = require('../models/clientes.model');
const clientesServices = require('../services/clientes.services');


// Crear un nuevo cliente
exports.createCliente = async (req, res) => {
  console.log("datos usuario", req.body);
  
  try {
    const result = await clientesServices.crearCliente(req.body, res);
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
console.log("entro aqui");

  try {
    const clientes = await clientesServices.obtenerClientes();
    res.status(200).send(clientes);
    
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener los clientes', error })
  }
};

// Obtener un cliente por ID
exports.getClienteById = async (req, res) => {
  console.log("id usuario", req)
  const id = req.params.id;
  try {
    const result = await clientesServices.obtenerPorId(id);
    if (!result.length) {
      return res.status(404).send({ message: 'Cliente no encontrado' });
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener el cliente', error })
  };
};

exports.updateCliente = async (req, res) => {
const id = req.params.id;
const cliente = req.body;
try {
  const result = await clientesServices.actualizarUsuario(id, cliente);
  res.status(200).send(result)
} catch (error) {
  res.status(500).send({message: 'Error al actualizar el cliente', error})
}

}

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
