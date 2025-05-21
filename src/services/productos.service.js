const Producto = require('../models/productos.model');

const crearProducto = async (datos) => {
  const { Id_producto, nombre, linea, descripcion, estado, precio} = datos;
  if (!Id_producto || !nombre || !linea || !descripcion || !estado || !precio ) {
    throw new Error('Todos los campos son necesarios');
  }

  const nuevoProducto = { Id_producto, nombre, linea, descripcion, estado, precio };
  return new Promise((resolve, reject) => {
    Producto.create(nuevoProducto, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerProductos = async () => {
  return new Promise((resolve, reject) => {
    Producto.getAll((err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerPorIdProducto = async (idProducto) => {
  return new Promise((resolve, reject) => {
    Producto.getById(idProducto, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const actualizarProducto = async (idProducto, datos) => {
  return new Promise ((resolve, reject) => {
    Producto.update(idProducto, datos,(err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};



module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerPorIdProducto,
  actualizarProducto
}