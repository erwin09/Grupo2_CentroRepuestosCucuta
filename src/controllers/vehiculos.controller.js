const serviceVehiculo = require('../services/vehiculo.services')

exports.createVehiculo = async (req, res) => {
console.log("datos del vehiculo", req.body);

  try {
    const result = await serviceVehiculo.crearVehiculo(req.body, res);
    res.status(201).send({ message: 'Vehiculo creado exitosamente', result });

  } catch (error) {
    if (error.message == 'Todos los campos son necesarios'){
      return res.status(400).send({ message: error.message })
  }
  res.status(500).send({ message: 'Error al crear vehiculo', error: err });
}
};

exports.getAllVehiculos = async (req, res) => {
 try {
     const vehiculos = await serviceVehiculo.obtenerVehiculos();
     res.status(200).send(vehiculos);
   } catch (error) {
     res.status(500).send({ message: 'Error al obtener los vehiculos', error });
   }
};

exports.getVehiculoByPlaca = async (req, res) => {
  const placa = req.params.id;
  console.log("id en el controlador", placa);
  
  try {
    const vehiculo = await serviceVehiculo.obtenerPorPlaca(placa);
    res.status(200).send(vehiculo);
  } catch (error) {
    res.status(500).send({message: 'Error al obtener el vehiculo', error });
  }
};

exports.getVehiculoByIdUsuario = async (req, res) => {
  const Id_usuario = req.params.id;
  console.log("id en el controlador usuario", Id_usuario);
  
  try {
    const vehiculo = await serviceVehiculo.obtenerPorIdUsuario(Id_usuario);
    res.status(200).send(vehiculo);
  } catch (error) {
    res.status(500).send({message: 'Error al obtener el vehiculo', error });
  }
};

exports.updateVehiculo = async (req, res) => {
  const placa = req.params.placa;
  const datos = req.body;
  try {
    const vehiculo = await serviceVehiculo.actualizarVehiculo(placa , datos);
    res.status(200).send(vehiculo);
  } catch (error) {
    res.status(500).send({message: 'Error al actualizar el vehiculo', error});
  }
};
