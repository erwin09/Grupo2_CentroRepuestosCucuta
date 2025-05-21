const servicesNotificaciones = require('../services/notificaciones.services');

exports.createNotificacion = async (req, res) => {

  try {
    const result = await servicesNotificaciones.crearNotificacion(req.body, res);
    res.status(201).send({ message: 'Notificación creado exitosamente', result });

  } catch (error) {
    if (error.message == 'Todos los campos son necesarios'){
      return res.status(400).send({ message: error.message })
  }
  res.status(500).send({ message: 'Error al crear la notificación', error: err });
}
};

exports.getAllNotificaciones = async (req, res) => {
 try {
     const result = await servicesNotificaciones.obtenerNotificaciones();
     res.status(200).send({message: 'Consulta exitosa', result});
   } catch (error) {
     res.status(500).send({ message: 'Error al obtener lss notificaciones', error });
   }
};

exports.getNotificacionById = async (req, res) => {
  const idNotificación = req.params.id;
  try {
    const result = await servicesNotificaciones.obtenerPorIdNotificacion(idNotificación);
    res.status(200).send({message: 'Consulta exitosa', result});
  } catch (error) {
    res.status(500).send({message: 'Error al obtener la notificación', error });
  }
};

exports.updateNotificacion = async (req, res) => {
  const idNotificación = req.params.id;
  const datos = req.body;
  try {
    const result = await servicesNotificaciones.actualizarNotificacion(idNotificación , datos);
    res.status(200).send({message: 'Actualización exitosa', result});
  } catch (error) {
    res.status(500).send({message: 'Error al actualizar la notificación', error});
  }
};