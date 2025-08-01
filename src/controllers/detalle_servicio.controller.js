const serviceDetalleServicio = require('../services/detalle_servicio.service');

exports.createDetalleServicio = async (req, res) => {

    try {
        const result = await serviceDetalleServicio.crearDetalleServicio(req.body, res);
        res.status(201).send({ message: 'Detalle servicio creada exitosamente', result });

    } catch (error) {
        if (error.message == 'Todos los campos son necesarios') {
            return res.status(400).send({ message: error.message })
        }
        res.status(500).send({ message: 'Error al crear', error: err });
    }
};

exports.getAllDetalleServicio = async (req, res) => {
    try {
        const result = await serviceDetalleServicio.obtenerDetallesServicio();
        res.status(200).send({ message: 'Consulta exitosa', result });
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener', error });
    }
};

exports.getAllDetalleServicioStadistic = async (req, res) => {
    try {
        const result = await serviceDetalleServicio.obtenerDetallesServicioStadist();
        res.status(200).send({ message: 'Consulta exitosa', result });
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener', error });
    }
};

exports.getDetalleServicioById = async (req, res) => {
    const IdMantenimiento = req.params.id;
    console.log("id mantenimiento servicios", IdMantenimiento);
    
    try {
        const result = await serviceDetalleServicio.obtenerPorIdDetallesServicio(IdMantenimiento);
        res.status(200).send({ message: 'Consulta exitosa', result });
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener', error });
    }
};

exports.updateDetalleServicio = async (req, res) => {
    const IdMantenimiento = req.params.id1;
    const idServicio = req.params.id2;
    const datos = req.body;
    try {
        const result = await serviceDetalleServicio.actualizarDetalleServicio(IdMantenimiento, idServicio, datos);
        res.status(200).send({ message: 'Actualización exitosa', result });
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar', error });
    }
};