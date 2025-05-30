const DetalleMarca = require('../models/detalle_marca.model');

const crearDetalleMarca = async (datos) => {
  const { ID_producto, ID_marca, cantidad } = datos;
  if (!ID_producto || !ID_marca || !cantidad ) {
    throw new Error('Todos los campos son necesarios');
  }

  const nuevoDetalleMarca = { ID_producto, ID_marca, cantidad };
  return new Promise((resolve, reject) => {
    DetalleMarca.create(nuevoDetalleMarca, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerDetallesMarca = async () => {
  return new Promise((resolve, reject) => {
    DetalleMarca.getAll((err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerPorIdDetalles = async (IdProducto, IdMarca) => {
    
    console.log("idproducto" , IdProducto );
    console.log("idmarca", IdMarca);
  return new Promise((resolve, reject) => {
    DetalleMarca.getById(IdProducto, IdMarca, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const actualizarDetalleMarca = async (IdProducto, IdMarca, datos) => {
  return new Promise ((resolve, reject) => {
    DetalleMarca.update(IdProducto, IdMarca, datos,(err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};



module.exports = {
  crearDetalleMarca,
  obtenerDetallesMarca,
  obtenerPorIdDetalles,
  actualizarDetalleMarca
}