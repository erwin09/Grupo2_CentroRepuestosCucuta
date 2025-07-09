const serviceProductos = require('../services/productos.service');

exports.createProducto = async (req, res) => {

  try {
    const result = await serviceProductos.crearProducto(req.body, res);
    res.status(201).send({ message: 'Producto creado exitosamente', result });

  } catch (error) {
    if (error.message == 'Todos los campos son necesarios') {
      return res.status(400).send({ message: error.message })
    }
    res.status(500).send({ message: 'Error al crear producto', error: err });
  }
};

exports.createProductoCompleto = async (req, res) => {
console.log("datos en el controlador 1", req.body);
  
  try {
    const result = await serviceProductos.crearProductoCompleto(req.body);
      console.log("datos en el controlador", result);
    res.status(201).json({
      message: result.message,
    });
  } catch (error) {
    if (error.message === 'Todos los campos del producto y la cantidad son necesarios') {
      return res.status(400).json({ message: error.message });
    }
    console.error('Error en createProductoCompleto:', error);
    res.status(500).json({ message: 'Error al crear el producto completo', error: error.message });
  }
};

exports.getAllProductos = async (req, res) => {
  console.log("ya entro aqui en productos");
  
  try {
    const result = await serviceProductos.obtenerProductos();
    res.status(200).send({ message: 'Consulta exitosa', result });
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener los productos', error });
  }
};

exports.getTablaProductos = async (req, res) => {
  try {
    const result = await serviceProductos.obtenerProductosTabla();
    res.status(200).send({ message: 'Consulta exitosa', result });
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener los productos', error });
  }
};

exports.getProductoById = async (req, res) => {
  const idProducto = req.params.id;
  try {
    const result = await serviceProductos.obtenerPorIdProducto(idProducto);
    res.status(200).send({ message: 'Consulta exitosa', result });
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener el producto', error });
  }
};

exports.updateProducto = async (req, res) => {
  const idProducto = req.params.id;
  const datos = req.body;
  try {
    const result = await serviceProductos.actualizarProducto(idProducto, datos);
    res.status(200).send({ message: 'Actualización exitosa', result });
  } catch (error) {
    res.status(500).send({ message: 'Error al actualizar el producto', error });
  }
};

exports.updateProductoCompleto = async (req, res) => {
  try {
    const result = await serviceProductos.actualizarProductoCompleto(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
  }
};