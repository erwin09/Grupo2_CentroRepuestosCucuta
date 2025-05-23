const serviceHistoriales = require('../services/historiales.services');

exports.createHistorial = async (req, res) => {

  try {
    const result = await serviceHistoriales.crearHistorial(req.body, res);
    res.status(201).send({ message: 'Historial creada exitosamente', result });

  } catch (error) {
    if (error.message == 'Todos los campos son necesarios'){
      return res.status(400).send({ message: error.message })
  }
  res.status(500).send({ message: 'Error al crear historial', error: err });
}
};

exports.getAllHistorial = async (req, res) => {
 try {
     const result = await serviceHistoriales.obtenerHistoriales();
     res.status(200).send({message: 'Consulta exitosa', result});
   } catch (error) {
     res.status(500).send({ message: 'Error al obtener los historiales', error });
   }
};

exports.getHistorialById = async (req, res) => {
  const idHistorial = req.params.id;
  try {
    const result = await serviceHistoriales.obtenerPorIdHistorial(idHistorial);
    res.status(200).send({message: 'Consulta exitosa', result});
  } catch (error) {
    res.status(500).send({message: 'Error al obtener el historial', error });
  }
};

exports.updateHistorial = async (req, res) => {
  const idHistorial = req.params.id;
  const datos = req.body;
  try {
    const result = await serviceHistoriales.actualizarHistorial(idHistorial , datos);
    res.status(200).send({message: 'Actualización exitosa', result});
  } catch (error) {
    res.status(500).send({message: 'Error al actualizar el historial', error});
  }
};