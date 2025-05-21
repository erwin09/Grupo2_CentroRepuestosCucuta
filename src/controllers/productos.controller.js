const serviceProductos = require('../services/productos.service');

exports.createProducto = async (req, res) => {

  try {
    const result = await serviceProductos.crearProducto(req.body, res);
    res.status(201).send({ message: 'Producto creado exitosamente', result });

  } catch (error) {
    if (error.message == 'Todos los campos son necesarios'){
      return res.status(400).send({ message: error.message })
  }
  res.status(500).send({ message: 'Error al crear producto', error: err });
}
};

exports.getAllProductos = async (req, res) => {
 try {
     const result = await serviceProductos.obtenerProductos();
     res.status(200).send({message: 'Consulta exitosa', result});
   } catch (error) {
     res.status(500).send({ message: 'Error al obtener los productos', error });
   }
};

exports.getProductoById = async (req, res) => {
  const idProducto = req.params.id;
  try {
    const result = await serviceProductos.obtenerPorIdProducto(idProducto);
    res.status(200).send({message: 'Consulta exitosa', result});
  } catch (error) {
    res.status(500).send({message: 'Error al obtener el producto', error });
  }
};

exports.updateProducto = async (req, res) => {
  const idProducto = req.params.id;
  const datos = req.body;
  try {
    const result = await serviceProductos.actualizarProducto(idProducto , datos);
    res.status(200).send({message: 'Actualización exitosa', result});
  } catch (error) {
    res.status(500).send({message: 'Error al actualizar el producto', error});
  }
};