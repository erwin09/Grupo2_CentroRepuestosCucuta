const Proveedor = require('../models/proveedores.model');

const crearProveedor = async (datos) => {
  const { Id_proveedor, nombre, telefono, email, ciudad} = datos;
  console.log("datos proveedor", datos);
  
  if (!Id_proveedor || !nombre || !telefono || !email || !ciudad ) {
    throw new Error('Todos los campos son necesarios');
  }

  const nuevoProveedor = { Id_proveedor, nombre, telefono, email, ciudad };
  return new Promise((resolve, reject) => {
    Proveedor.create(nuevoProveedor, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerProveedores = async () => {
  return new Promise((resolve, reject) => {
    Proveedor.getAll((err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerPorIdProveedor = async (idProveedor) => {
  return new Promise((resolve, reject) => {
    Proveedor.getById(idProveedor, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const actualizarProveedor = async (idProveedor, datos) => {
  return new Promise ((resolve, reject) => {
    Proveedor.update(idProveedor, datos,(err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};



module.exports = {
  crearProveedor,
  obtenerProveedores,
  obtenerPorIdProveedor,
  actualizarProveedor
}