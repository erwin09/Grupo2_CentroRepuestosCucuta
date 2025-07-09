const DetalleProveedor = require('../models/detalle_proveedor.model');

const crearDetalleProveedor = async (datos) => {
  const { ID_producto, ID_proveedor } = datos;
  console.log("datos del proveedor", datos);
  
  if (!ID_producto || !ID_proveedor ) {
    throw new Error('Todos los campos son necesarios');
  }

  const nuevoDetalleProveedor = { ID_producto, ID_proveedor };
  return new Promise((resolve, reject) => {
    DetalleProveedor.create(nuevoDetalleProveedor, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerDetallesProveedor = async () => {
  return new Promise((resolve, reject) => {
    DetalleProveedor.getAll((err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerPorIdDetallesProveedor = async (IdProducto, IdProveedor) => {
  return new Promise((resolve, reject) => {
    DetalleProveedor.getById(IdProducto, IdProveedor, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const actualizarDetalleProveedor = async (IdProducto, IdProveedor, datos) => {
  return new Promise ((resolve, reject) => {
    DetalleProveedor.update(IdProducto, IdProveedor, datos,(err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};



module.exports = {
  crearDetalleProveedor,
  obtenerDetallesProveedor,
  obtenerPorIdDetallesProveedor,
  actualizarDetalleProveedor
}