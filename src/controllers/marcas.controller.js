const serviceMarcas = require('../services/marcas.service');

exports.createMarca = async (req, res) => {

  try {
    const result = await serviceMarcas.crearMarca(req.body, res);
    res.status(201).send({ message: 'Marca creada exitosamente', result });

  } catch (error) {
    if (error.message == 'Todos los campos son necesarios'){
      return res.status(400).send({ message: error.message })
  }
  res.status(500).send({ message: 'Error al crear marca', error: err });
}
};

exports.getAllMarca = async (req, res) => {
 try {
     const result = await serviceMarcas.obtenerMarcas();
     res.status(200).send({message: 'Consulta exitosa', result});
   } catch (error) {
     res.status(500).send({ message: 'Error al obtener los marcas', error });
   }
};

exports.getMarcaById = async (req, res) => {
  const idMarca = req.params.id;
  try {
    const result = await serviceMarcas.obtenerPorIdMarca(idMarca);
    res.status(200).send({message: 'Consulta exitosa', result});
  } catch (error) {
    res.status(500).send({message: 'Error al obtener la marca', error });
  }
};

exports.updateMarca = async (req, res) => {
  const idMarca = req.params.id;
  const datos = req.body;
  try {
    const result = await serviceMarcas.actualizarMarca(idMarca , datos);
    res.status(200).send({message: 'Actualización exitosa', result});
  } catch (error) {
    res.status(500).send({message: 'Error al actualizar la marca', error});
  }
};