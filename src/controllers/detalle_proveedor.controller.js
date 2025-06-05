const serviceDetalleProveedor = require('../services/detalle_proveedor.service');

exports.createDetalleProveedor = async (req, res) => {

    try {
        const result = await serviceDetalleProveedor.crearDetalleProveedor(req.body, res);
        res.status(201).send({ message: 'Detalle proveedor creada exitosamente', result });

    } catch (error) {
        if (error.message == 'Todos los campos son necesarios') {
            return res.status(400).send({ message: error.message })
        }
        res.status(500).send({ message: 'Error al crear', error: err });
    }
};

exports.getAllDetalleProveedor = async (req, res) => {
    try {
        const result = await serviceDetalleProveedor.obtenerDetallesProveedor();
        res.status(200).send({ message: 'Consulta exitosa', result });
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener', error });
    }
};

exports.getDetalleProveedorById = async (req, res) => {
    const idProducto = req.params.id1;
    const idProveedor = req.params.id2;
    try {
        const result = await serviceDetalleProveedor.obtenerPorIdDetallesProveedor(idProducto, idProveedor);
        res.status(200).send({ message: 'Consulta exitosa', result });
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener', error });
    }
};

exports.updateDetalleProveedor = async (req, res) => {
    const idProducto = req.params.id1;
    const idProveedor = req.params.id2;
    const datos = req.body;
    try {
        const result = await serviceDetalleProveedor.actualizarDetalleProveedor(idProducto, idProveedor, datos);
        res.status(200).send({ message: 'Actualización exitosa', result });
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar', error });
    }
};