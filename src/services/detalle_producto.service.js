const DetalleProducto = require('../models/detalle_producto.model');

const crearDetalleProducto = async (datos) => {
  console.log("detalles producto", datos);
  const { ID_producto, ID_mantenimiento, cantidad, precio } = datos;
  if (!ID_producto || !ID_mantenimiento || !cantidad || !precio ) {
    throw new Error('Todos los campos son necesarios');
  }

  const nuevoDetalleProducto = { ID_producto, ID_mantenimiento, cantidad, precio };
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

const obtenerPorIdDetallesProducto = async (IdMantenimiento) => {
  console.log("id manteniento", IdMantenimiento);
  
  return new Promise((resolve, reject) => {
    DetalleProducto.getById(IdMantenimiento, (err, result) => {
      if (err) return reject(err);
      resolve(result);
      console.log("respuesta de backend detalle" , result);
      
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