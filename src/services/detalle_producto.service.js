const DetalleProducto = require('../models/detalle_producto.model');

const crearDetalleProducto = async (datos) => {
  const { ID_producto, ID_historial, cantidad } = datos;
  if (!ID_producto || !ID_historial || !cantidad ) {
    throw new Error('Todos los campos son necesarios');
  }

  const nuevoDetalleProducto = { ID_producto, ID_historial, cantidad };
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

const obtenerPorIdDetallesProducto = async (IdProducto, IdHistorial) => {
  return new Promise((resolve, reject) => {
    DetalleProducto.getById(IdProducto, IdHistorial, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const actualizarDetalleProducto = async (IdProducto, IdHistorial, datos) => {
  return new Promise ((resolve, reject) => {
    DetalleProducto.update(IdProducto, IdHistorial, datos,(err, result) => {
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