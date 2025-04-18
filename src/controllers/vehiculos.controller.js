const Vehiculo = require('../models/vehiculos.model')

exports.createVehiculo = (req, res ) =>{
    const { placa, marca, modelo, color, tipo_motor, ID_usuario} = req.body;
    if (!placa || !marca || !modelo || !color || !tipo_motor || !ID_usuario){
        return res.status(400).send ({ message: 'Todos los campos son necesarios' });
    }

    const nuevoVehiculo = {placa, marca, modelo, color, tipo_motor, ID_usuario};

    Vehiculo.create(nuevoVehiculo, (err, result) => {
        if (err){
            return res.status(500).send({ message: 'Error al crear vehiculo', error: err });
        }
        res.status(201).send({ message: 'Vehiculo creado exitosamente', result });
    })
    }
