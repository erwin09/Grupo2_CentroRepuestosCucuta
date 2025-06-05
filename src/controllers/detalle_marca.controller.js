const serviceDetalleMarca = require('../services/detalle_marca.services');

exports.createDetalleMarca = async (req, res) => {

    try {
        const result = await serviceDetalleMarca.crearDetalleMarca(req.body, res);
        res.status(201).send({ message: 'Detalle marca creada exitosamente', result });

    } catch (error) {
        if (error.message == 'Todos los campos son necesarios') {
            return res.status(400).send({ message: error.message })
        }
        res.status(500).send({ message: 'Error al crear', error: err });
    }
};

exports.getAllDetalleMarca = async (req, res) => {
    try {
        const result = await serviceDetalleMarca.obtenerDetallesMarca();
        res.status(200).send({ message: 'Consulta exitosa', result });
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener', error });
    }
};

exports.getDetalleMarcaById = async (req, res) => {
    const idProducto = req.params.id1;
    console.log("info params", req.params.id2)
    const idMarca = req.params.id2;
    try {
        const result = await serviceDetalleMarca.obtenerPorIdDetalles(idProducto, idMarca);
        res.status(200).send({ message: 'Consulta exitosa', result });
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener', error });
    }
};

exports.updateDetalleMarca = async (req, res) => {
    const idProducto = req.params.ID_producto;
    const idMarca = req.params.ID_marca;
    const datos = req.body;
    try {
        const result = await serviceDetalleMarca.actualizarCita(idProducto, idMarca, datos);
        res.status(200).send({ message: 'Actualización exitosa', result });
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar', error });
    }
};