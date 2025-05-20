const serviceProveedor = require('../services/proveedores.services');

exports.createProveedor = async (req, res) => {

  try {
    const result = await serviceProveedor.crearProveedor(req.body, res);
    res.status(201).send({ message: 'Proveedor creado exitosamente', result });

  } catch (error) {
    if (error.message == 'Todos los campos son necesarios'){
      return res.status(400).send({ message: error.message })
  }
  res.status(500).send({ message: 'Error al crear proveedor', error: err });
}
};

exports.getAllProveedores = async (req, res) => {
 try {
     const result = await serviceProveedor.obtenerProveedores();
     res.status(200).send({message: 'Consulta exitosa', result});
   } catch (error) {
     res.status(500).send({ message: 'Error al obtener los proveedores', error });
   }
};

exports.getProveedorById = async (req, res) => {
  const idProveedor = req.params.id;
  try {
    const result = await serviceProveedor.obtenerPorIdProveedor(idProveedor);
    res.status(200).send({message: 'Consulta exitosa', result});
  } catch (error) {
    res.status(500).send({message: 'Error al obtener el proveedor', error });
  }
};

exports.updateProveedor = async (req, res) => {
  const idProveedor = req.params.id;
  const datos = req.body;
  try {
    const result = await serviceProveedor.actualizarProveedor(idProveedor , datos);
    res.status(200).send({message: 'Actualización exitosa', result});
  } catch (error) {
    res.status(500).send({message: 'Error al actualizar el proveedor', error});
  }
};