const serviceServicios = require('../services/servicios.services')

exports.createServicio = async (req, res) => {

  try {
    const result = await serviceServicios.crearServicio(req.body, res);
    res.status(201).send({ message: 'Servicio creado exitosamente', result });

  } catch (error) {
    if (error.message == 'Todos los campos son necesarios'){
      return res.status(400).send({ message: error.message })
  }
  res.status(500).send({ message: 'Error al crear servicio', error: err });
}
};

exports.getAllServicios = async (req, res) => {
 try {
     const result = await serviceServicios.obtenerServicios();
     res.status(200).send({message: 'Consulta exitosa', result});
   } catch (error) {
     res.status(500).send({ message: 'Error al obtener los servicios', error });
   }
};

exports.getServicioById = async (req, res) => {
  const idServicio = req.params.id;
  try {
    const result = await serviceServicios.obtenerPorIdServicio(idServicio);
    res.status(200).send({message: 'Consulta exitosa', result});
  } catch (error) {
    res.status(500).send({message: 'Error al obtener el servicio', error });
  }
};

exports.updateServicio = async (req, res) => {
  const idServicio = req.params.id;
  const datos = req.body;
  try {
    const result = await serviceServicios.actualizarServicio(idServicio , datos);
    res.status(200).send({message: 'Actualización exitosa', result});
  } catch (error) {
    res.status(500).send({message: 'Error al actualizar el servicio', error});
  }
};