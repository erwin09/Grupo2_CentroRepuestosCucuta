const Producto = require('../models/productos.model');
const detMarca = require('../services/detalle_marca.services');
const detProve = require('../services/detalle_proveedor.service');

const crearProducto = async (datos) => {
  const { Id_producto, nombre, linea, descripcion, estado, precio } = datos;
  console.log("datos en el crear producto", datos);
  
  if (!Id_producto || !nombre || !linea || !descripcion || !estado || !precio) {
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

const crearProductoCompleto = async (datos) => {
  const {
    Id_producto,
    nombre,
    linea,
    descripcion,
    estado,
    precio,
    cantidad,
    Id_marca,
    Id_proveedor
  } = datos;

  console.log("datos producto nuevo", datos);
  

  if (!Id_producto || !nombre || !linea || !descripcion || !estado === undefined || precio === undefined || cantidad === undefined || !Id_marca || !Id_proveedor) {
    throw new Error('Todos los campos del producto y la cantidad son necesarios');
  }

  try {

    const nuevoProducto = { Id_producto, nombre, linea, descripcion, estado, precio };
    await crearProducto(nuevoProducto);

    await detMarca.crearDetalleMarca({
      ID_producto: Id_producto,
      ID_marca: Id_marca,
      cantidad: cantidad,
    });

    await detProve.crearDetalleProveedor({
      ID_producto: Id_producto,
      ID_proveedor: Id_proveedor,
    });

    return { message: 'Producto creado correctamente' };

  } catch (error) {
    console.error(error);
    throw error;
  }
};

const actualizarProductoCompleto = async (datos) => {
  const {
    Id_producto,
    nombre,
    linea,
    descripcion,
    estado,
    precio,
    cantidad,
  } = datos;
  console.log("datos del frontend", datos);

  if (!Id_producto || !nombre || !linea || !descripcion || estado === undefined || precio === undefined || cantidad === undefined) {
    throw new Error('Todos los campos son obligatorios para la edición');
  }

  try {

    const datosProducto = { nombre, linea, descripcion, estado, precio };
    await Producto.updateCamposBasicos(Id_producto, datosProducto);
    
    return { message: 'Producto actualizado correctamente con sus relaciones' };

  } catch (error) {
    console.error('Error al actualizar producto completo:', error);
    throw error;
  }
};

const obtenerProductos = async () => {
  return new Promise((resolve, reject) => {
    Producto.getAll((err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerProductosTabla = async () => {
  return new Promise((resolve, reject) => {
    Producto.getTable((err, result) => {
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
  return new Promise((resolve, reject) => {
    Producto.update(idProducto, datos, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};



module.exports = {
  crearProducto,
  obtenerProductos,
  crearProductoCompleto,
  actualizarProductoCompleto,
  obtenerProductosTabla,
  obtenerPorIdProducto,
  actualizarProducto
}