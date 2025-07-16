const serviceCita = require('../services/citas.service');
const serviceNotificador = require('../services/notificador.service');

exports.createCita = async (req, res) => {
  console.log("llega al backend datos cita", req.body);
  
  try {
    const result = await serviceCita.crearCita(req.body, res);
    await serviceNotificador.NotificarCita(req.body);
    res.status(201).send({ message: 'Cita creada exitosamente', result });

  } catch (error) {
    if (error.message == 'Todos los campos son necesarios'){
      return res.status(400).send({ message: error.message })
  }
  res.status(500).send({ message: 'Error al crear la cita', error: error });
}
};

exports.getNuevoId = (req, res) => {
  serviceCita.obtenerNuevoIdCitas  ((err, nuevoId) => {
    if (err) return res.status(500).json({ error: 'Error al generar el nuevo ID' });
    res.json({ nuevoId });
    console.log("nuevo id", nuevoId);
    
  });
};

exports.getAllCitas = async (req, res) => {
 try {
     const result = await serviceCita.obtenerCitas();
     res.status(200).send({message: 'Consulta exitosa', result});
   } catch (error) {
     res.status(500).send({ message: 'Error al obtener las citas', error });
   }
};

exports.getCitaByIdClient = async (req, res) => {
  const idCliente = req.params.id;
  console.log("id usuario controlador get all by cita", idCliente);
  
  try {
    const result = await serviceCita.obtenerPorIdClient(idCliente);
    res.status(200).send({message: 'Consulta exitosa', result});
    console.log("resultado del getall by usuariio", result);
    
  } catch (error) {
    res.status(500).send({message: 'Error al obtener la cita', error });
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