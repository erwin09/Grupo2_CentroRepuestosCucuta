const db = require('../config/db');
const dayjs = require('dayjs');
const Historial = require('../models/mantenimientos.model');
const detPro = require('../services/detalle_producto.service');
const detSer = require('../services/detalle_servicio.service');
const detNot = require('../services/detalle_notificacion.service')

const crearMantenimiento = async (datos) => {
  const { Id_mantenimientos, fecha, descripcion, ID_vehiculo } = datos;
  if (!Id_mantenimientos || !fecha || !descripcion || !ID_vehiculo) {
    throw new Error('Todos los campos son necesarios');
  }

  const nuevoMantenimiento = { Id_mantenimientos, fecha, descripcion, ID_vehiculo };
  return new Promise((resolve, reject) => {
    Historial.create(nuevoMantenimiento, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerNuevoIdMantenimiento = (callback) => {
  const query = `SELECT Id_mantenimientos FROM mantenimientos ORDER BY Id_mantenimientos DESC LIMIT 1`;
  db.query(query, (err, results) => {
    if (err) return callback(err);

    let nuevoId;
    if (results.length > 0) {
      const ultimo = results[0].Id_mantenimientos;
      const numero = parseInt(ultimo.split('-')[1]) + 1;
      nuevoId = `ORD-${numero.toString().padStart(6, '0')}`;
    } else {
      nuevoId = 'ORD-000001';
    }

    callback(null, nuevoId);
  });
};

const crearMantenimientoCompleto = async (datos) => {
  console.log("datos en el backend crear mantenimiento nuevo", datos);

  const { Id_mantenimientos, fecha, descripcion, ID_vehiculo, productos, servicios, notificaciones } = datos;
  if (!Id_mantenimientos || !fecha || !descripcion || !ID_vehiculo) {
    throw new Error('Todos los campos son necesarios');
  }

  const nuevoMantenimiento = { Id_mantenimientos, fecha, descripcion, ID_vehiculo };
  await crearMantenimiento(nuevoMantenimiento);

  for (const producto of productos) {
    console.log("producto que van ser guardados", producto);
    await detPro.crearDetalleProducto(producto)
  }

  for (const servicio of servicios) {
    console.log("servicios que van ser guardados", servicio);
    await detSer.crearDetalleServicio(servicio)
  }

  const calcularFechaProgramada = (fechaBase, meses) => {
    return dayjs(fechaBase).add(meses, 'month').format('YYYY-MM-DD');
  }

  for (const notificacion of notificaciones) {
    const meses = notificacion.tiempo_dias
    const fecha_programada = await calcularFechaProgramada(fecha, meses)
    await detNot.crearDetalleNotificacion({
      ID_mantenimiento: Id_mantenimientos,
      ID_notificacion: notificacion.ID_notificacion,
      fecha_programada: fecha_programada
    })
  }

};

const obtenerMantenimientos = async () => {
  return new Promise((resolve, reject) => {
    Historial.getAll((err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};



const obtenerPorPlacaMantenimientos = async (Id_usuario) => {
  return new Promise((resolve, reject) => {
    Historial.getByPlaca(Id_usuario, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const obtenerPorIdMantenimientos = async (idMantenimiento) => {
  return new Promise((resolve, reject) => {
    Historial.getById(idMantenimiento, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const actualizarMantenimiento = async (idMantenimiento, datos) => {
  return new Promise((resolve, reject) => {
    Historial.update(idMantenimiento, datos, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};



module.exports = {
  crearMantenimiento,
  crearMantenimientoCompleto,
  obtenerNuevoIdMantenimiento,
  obtenerMantenimientos,
  obtenerPorPlacaMantenimientos,
  obtenerPorIdMantenimientos,
  actualizarMantenimiento
}