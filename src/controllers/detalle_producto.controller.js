const serviceDetalleProducto = require('../services/detalle_producto.service');

exports.createDetalleProducto = async (req, res) => {

    try {
        const result = await serviceDetalleProducto.crearDetalleProducto(req.body, res);
        res.status(201).send({ message: 'Detalle producto creada exitosamente', result });

    } catch (error) {
        if (error.message == 'Todos los campos son necesarios') {
            return res.status(400).send({ message: error.message })
        }
        res.status(500).send({ message: 'Error al crear', error: err });
    }
};

exports.getAllDetalleProducto = async (req, res) => {
    try {
        const result = await serviceDetalleProducto.obtenerDetallesProducto();
        res.status(200).send({ message: 'Consulta exitosa', result });
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener', error });
    }
};

exports.getDetalleProductoById = async (req, res) => {
    const idMantenimiento = req.params.id;
    console.log("controlador id mantenimiento", idMantenimiento);
    
    try {
        const result = await serviceDetalleProducto.obtenerPorIdDetallesProducto(idMantenimiento);
        res.status(200).send({ message: 'Consulta exitosa', result });
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener', error });
    }
};

exports.updateDetalleProducto = async (req, res) => {
    const idProducto = req.params.id1;
    const idMantenimiento = req.params.id2;
    const datos = req.body;
    try {
        const result = await serviceDetalleProducto.actualizarDetalleProducto(idProducto, idMantenimiento, datos);
        res.status(200).send({ message: 'Actualización exitosa', result });
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar', error });
    }
};