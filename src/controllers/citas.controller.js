const serviceCita = require('../services/citas.service');

exports.createCita = async (req, res) => {

  try {
    const result = await serviceCita.crearCita(req.body, res);
    res.status(201).send({ message: 'Cita creada exitosamente', result });

  } catch (error) {
    if (error.message == 'Todos los campos son necesarios'){
      return res.status(400).send({ message: error.message })
  }
  res.status(500).send({ message: 'Error al crear la cita', error: err });
}
};

exports.getAllCitas = async (req, res) => {
 try {
     const result = await serviceCita.obtenerCitas();
     res.status(200).send({message: 'Consulta exitosa', result});
   } catch (error) {
     res.status(500).send({ message: 'Error al obtener las citas', error });
   }
};

exports.getCitaById = async (req, res) => {
  const idCita = req.params.id;
  try {
    const result = await serviceCita.obtenerPorIdCita(idCita);
    res.status(200).send({message: 'Consulta exitosa', result});
  } catch (error) {
    res.status(500).send({message: 'Error al obtener la cita', error });
  }
};

exports.updateCita = async (req, res) => {
  const idCita = req.params.id;
  const datos = req.body;
  try {
    const result = await serviceCita.actualizarCita(idCita , datos);
    res.status(200).send({message: 'Actualización exitosa', result});
  } catch (error) {
    res.status(500).send({message: 'Error al actualizar la cita', error});
  }
};