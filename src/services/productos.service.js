const Producto = require('../models/productos.model');
const marca = require('../models/marcas.model');
const proveedor = require('../models/proveedores.model');
const detMarca = require('../models/detalle_marca.model');
const detProve = require('../models/detalle_proveedor.model');

const crearProducto = async (datos) => {
  const { Id_producto, nombre, linea, descripcion, estado, precio } = datos;
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
    nombre_marca,
    procedencia,
    Id_proveedor,
    nombre_proveedor,
    telefono,
    email,
    ciudad,
    nombre_asesor,
    observaciones
  } = datos;

  if (!Id_producto || !nombre || !linea || !descripcion || !estado || !precio || !cantidad) {
    throw new Error('Todos los campos del producto y la cantidad son necesarios');
  }

  try {

    let id_marca = Id_marca;
    const marcaRows = await marca.getByName(nombre_marca);
    if (!marcaRows.length) {
      const nuevaMarca = await marca.create({
        Id_marca,
        nombre: nombre_marca,
        procedencia
      });
      id_marca = nuevaMarca.Id_marca;
    }


    let id_proveedor = Id_proveedor;
    const proveedorRows = await proveedor.getByName(nombre_proveedor);
    if (!proveedorRows.length) {
      const nuevoProveedor = await proveedor.create({
        Id_proveedor,
        nombre: nombre_proveedor,
        telefono,
        email,
        ciudad,
        nombre_asesor
      });
      id_proveedor = nuevoProveedor.Id_proveedor;
    }


    const nuevoProducto = { Id_producto, nombre, linea, descripcion, estado, precio };
    await Producto.create(nuevoProducto);


    const detalleRows = await detMarca.getById(id_marca, Id_producto);
    if (!detalleRows.length) {
      await detMarca.create({
        ID_producto: Id_producto,
        Id_marca: id_marca,
        cantidad: cantidad,
      });
    }

    const detalleProveedorRows = await detProve.getById(id_proveedor, Id_producto);
    if (!detalleProveedorRows.length) {
      await detProve.create({
        ID_producto: Id_producto,
        ID_proveedor: id_proveedor,
        observaciones: observaciones,
      });
    }

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
    Id_marca,
    nombre_marca,
    Id_proveedor,
    nombre_proveedor,
  } = datos;
  console.log("datos dl frontend", datos);
  
  if (!Id_producto || !nombre || !linea || !descripcion || estado === undefined || precio === undefined || cantidad === undefined) {
    throw new Error('Todos los campos son obligatorios para la edición');
  }

  try {

    const datosProducto = { nombre, linea, descripcion, estado, precio };
    await Producto.updateCamposBasicos(Id_producto, datosProducto);
    
    const detalleMarcaRows = await detMarca.getByIdUpdate( Id_producto, Id_marca);
    if (!detalleMarcaRows.length) {
      await detMarca.createUpdate({ ID_producto: Id_producto, Id_marca: Id_marca, cantidad: cantidad });
    } else {
      await detMarca.updateCantidad(Id_producto, Id_marca, cantidad);
    }

    const detalleProveRows = await detProve.getByIdUpdate( Id_producto, Id_proveedor);
    if (!detalleProveRows.length) {
      await detProve.createUpdate({
        ID_producto: Id_producto,
        ID_proveedor: Id_proveedor
      });
    } else {
      await detProve.updateObservaciones(Id_producto, Id_proveedor);
    }

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