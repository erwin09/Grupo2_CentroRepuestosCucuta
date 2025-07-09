const DetalleProducto = require('../models/detalle_producto.model');

const crearDetalleProducto = async (datos) => {
  console.log("detalles producto", datos);
  const { ID_producto, ID_mantenimiento, cantidad } = datos;
  if (!ID_producto || !ID_mantenimiento || !cantidad ) {
    throw new Error('Todos los campos son necesarios');
  }

  const nuevoDetalleProducto = { ID_producto, ID_mantenimiento, cantidad };
  return new Promise((resolve, reject) => {
    DetalleProducto.create(nuevoDetalleProducto, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerDetallesProducto = async () => {
  return new Promise((resolve, reject) => {
    DetalleProducto.getAll((err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerPorIdDetallesProducto = async (IdProducto, IdMantenimiento) => {
  return new Promise((resolve, reject) => {
    DetalleProducto.getById(IdProducto, IdMantenimiento, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const actualizarDetalleProducto = async (IdProducto, IdMantenimiento, datos) => {
  return new Promise ((resolve, reject) => {
    DetalleProducto.update(IdProducto, IdMantenimiento, datos,(err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};



module.exports = {
  crearDetalleProducto,
  obtenerDetallesProducto,
  obtenerPorIdDetallesProducto,
  actualizarDetalleProducto
}