const Marca = require('../models/marcas.model');

const crearMarca = async (datos) => {
  const { Id_marca, nombre, procedencia } = datos;
  console.log("datos marcas", datos );
  
  if (!Id_marca || !nombre || !procedencia ) {
    throw new Error('Todos los campos son necesarios');
  }

  const nuevoMarca = { Id_marca, nombre, procedencia };
  return new Promise((resolve, reject) => {
    Marca.create(nuevoMarca, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerMarcas = async () => {
  return new Promise((resolve, reject) => {
    Marca.getAll((err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerPorIdMarca = async (idMarca) => {
  return new Promise((resolve, reject) => {
    Marca.getById(idMarca, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerPorNameMarca = async (nombreMarca) => {
  return new Promise((resolve, reject) => {
    Marca.getByName(nombreMarca, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const actualizarMarca = async (idMarca, datos) => {
  return new Promise ((resolve, reject) => {
    Marca.update(idMarca, datos,(err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};



module.exports = {
  crearMarca,
  obtenerMarcas,
  obtenerPorIdMarca,
  obtenerPorNameMarca,
  actualizarMarca
}