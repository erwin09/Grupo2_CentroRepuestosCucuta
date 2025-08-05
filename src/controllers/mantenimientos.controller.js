const serviceMantenimiento = require('../services/mantenimientos.services');

exports.createMantenimiento = async (req, res) => {

  try {
    const result = await serviceMantenimiento.crearMantenimiento(req.body, res);
    res.status(201).send({ message: 'Creado exitosamente', result });

  } catch (error) {
    if (error.message == 'Todos los campos son necesarios') {
      return res.status(400).send({ message: error.message })
    }
    res.status(500).send({ message: 'Error al crear', error: error });
  }
};

exports.createMantenimientoCompleto = async (req, res) => {
  console.log("datos controlador mantenimiento antes", req.body);

  try {
    const result = await serviceMantenimiento.crearMantenimientoCompleto(req.body, res);
    res.status(201).send({ message: 'Creado exitosamente', result });

  } catch (error) {
    if (error.message == 'Todos los campos son necesarios') {
      return res.status(400).send({ message: error.message })
    }
    console.log("datos controlador mantenimiento", req.body);
    res.status(500).send({ message: 'Error al crear', error: error.message });
  }
};

exports.getNuevoId = (req, res) => {
  serviceMantenimiento.obtenerNuevoIdMantenimiento  ((err, nuevoId) => {
    if (err) return res.status(500).json({ error: 'Error al generar el nuevo ID' });
    res.json({ nuevoId });
    console.log("nuevo id", nuevoId);
    
  });
};

exports.getAllmantenimiento = async (req, res) => {
  try {
    const result = await serviceMantenimiento.obtenerMantenimientos();
    res.status(200).send({ message: 'Consulta exitosa', result });
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener los historiales', error });
  }
};


exports.getMantenimientoById = async (req, res) => {
  const idHistorial = req.params.id;
  try {
    const result = await serviceMantenimiento.obtenerPorIdMantenimientos(idHistorial);
    res.status(200).send({ message: 'Consulta exitosa', result });
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener el historial', error });
  }
};

exports.getMantenimientoByplaca = async (req, res) => {
  const Id_usuario = req.params.id;
  try {
    const result = await serviceMantenimiento.obtenerPorPlacaMantenimientos(Id_usuario);
    res.status(200).send({ message: 'Consulta exitosa', result });
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener el historial', error });
  }
};

exports.updateMantenimiento = async (req, res) => {
  const idHistorial = req.params.id;
  const datos = req.body;
  try {
    const result = await serviceMantenimiento.actualizarMantenimiento(idHistorial, datos);
    res.status(200).send({ message: 'Actualización exitosa', result });
  } catch (error) {
    res.status(500).send({ message: 'Error al actualizar el historial', error });
  }
};