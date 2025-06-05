const serviceDetalleNotificacion = require('../services/detalle_notificacion.service');

exports.createDetalleNotificacion = async (req, res) => {

    try {
        const result = await serviceDetalleNotificacion.crearDetalleNotificacion(req.body, res);
        res.status(201).send({ message: 'Detalle notificación creada exitosamente', result });

    } catch (error) {
        if (error.message == 'Todos los campos son necesarios') {
            return res.status(400).send({ message: error.message })
        }
        res.status(500).send({ message: 'Error al crear', error: err });
    }
};

exports.getAllDetalleNotificacion = async (req, res) => {
    try {
        const result = await serviceDetalleNotificacion.obtenerDetallesNtoificacion();
        res.status(200).send({ message: 'Consulta exitosa', result });
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener', error });
    }
};

exports.getDetalleNotificacionById = async (req, res) => {
    const idNotificacion = req.params.id1;
    const idHistorial = req.params.id2;
    try {
        const result = await serviceDetalleNotificacion.obtenerPorIdDetallesNotificacion(idNotificacion, idHistorial);
        res.status(200).send({ message: 'Consulta exitosa', result });
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener', error });
    }
};

exports.updateDetalleNotificacion = async (req, res) => {
    const idNotificacion = req.params.id1;
    const idHistorial = req.params.id2;
    const datos = req.body;
    try {
        const result = await serviceDetalleNotificacion.actualizarDetalleNotificacion(idNotificacion, idHistorial, datos);
        res.status(200).send({ message: 'Actualización exitosa', result });
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar', error });
    }
};