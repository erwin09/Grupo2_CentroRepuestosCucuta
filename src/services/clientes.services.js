const ClienteModel = require('../models/clientes.model');
const Notificador = require('../services/notificador.service');
const bcrypt = require('bcrypt');

const crearCliente = async (clienteData) => {
  const { Num_doc, tip_doc, nombre_usuario, apellidos, telefono, email, rol, estado, direccion, contrasena, fecha_registro } = clienteData;
  if (!Num_doc || !tip_doc || !nombre_usuario || !apellidos || !telefono || !email || !rol || !estado || !direccion || !contrasena || !fecha_registro) {
    throw new Error('Todos los campos son necesarios');
  }
  console.log("clientedata", clienteData);


  const saltRounds = 10;
  const contraseñaHash = await bcrypt.hash(contrasena, saltRounds);
  const nuevoCliente = { Num_doc, tip_doc, nombre_usuario, apellidos, telefono, email, rol, estado, direccion, contrasena: contraseñaHash, fecha_registro };
  console.log(" nuevocliente", nuevoCliente);
  return await ClienteModel.create(nuevoCliente);
};


const obtenerClientes = async () => {
  return new Promise((resolve, reject) => {
    ClienteModel.getAll((err, clientes) => {
      if (err) return reject(err);
      resolve(clientes);
    });
  });
};

const obtenerPorId = async (idData) => {
  return new Promise((resolve, reject) => {
    ClienteModel.getById(idData, (err, cliente) => {
      if (err) return reject(err);
      resolve(cliente);
      console.log("respuesta consulta cliente por id", cliente);

    });
  });
};

const enviarCodigoRecuperacion = (Num_doc) => {
  console.log("ya esta enviando codigo");

  return new Promise((resolve, reject) => {
    const generarCodigo = () => Math.floor(100000 + Math.random() * 900000).toString();

    ClienteModel.getById(Num_doc, (err, resultados) => {
      if (err) return reject(err);
      if (!resultados || resultados.length === 0) {
        return reject(new Error('Usuario no encontrado'));
      }

      const usuario = resultados[0];
      console.log("resultado get by", usuario);

      const codigo = generarCodigo();
      const fecha = new Date();

      ClienteModel.createCodigo(Num_doc, codigo, fecha)
        .then(() => {
          const telefono = usuario.telefono;
          if (!telefono) {
            return reject(new Error('El número de teléfono no está disponible'));
          }

          return Notificador.enviarCodigoRecuperacion(telefono, codigo);
        })
        .then(() => {
          resolve(codigo); 
        })
        .catch((err) => {
          reject(err); 
        });
    });
  });
};

const verificarActualizarContrasena = (Num_doc, codigo, nuevaContrasena, callback) => {
  const saltRounds = 10;

  bcrypt.hash(nuevaContrasena, saltRounds, (err, hash) => {
    if (err) return callback(err);

    ClienteModel.verificarCodigosActualizar(Num_doc, codigo, hash, (error, resultado) => {
      if (error) return callback(error);
      callback(null, resultado);
    });
  });
};

const actualizarUsuario = async (idData, cliente) => {
  const pasword = cliente.contrasena;
  if (pasword) {
    const saltRounds = 10;
    const contraseñaHash = await bcrypt.hash(pasword, saltRounds);
    cliente.contrasena = contraseñaHash;
  }
  return new Promise((resolve, reject) => {
    ClienteModel.update(idData, cliente, (err, datos) => {
      if (err) return reject(err);
      resolve(datos);
    });
  });
};

module.exports = {
  crearCliente,
  obtenerClientes,
  enviarCodigoRecuperacion,
  verificarActualizarContrasena,
  obtenerPorId,
  actualizarUsuario
};