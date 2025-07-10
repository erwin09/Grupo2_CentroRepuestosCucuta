const db = require('../config/db');

const Productos = {
  create: (producto, callback) => {
    const query = `INSERT INTO productos SET ?`;
    db.query(query, producto, (err, results) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, results);
    });
  },

  getTable: (callback) => {
    db.query(`SELECT 
      dm.cantidad,   
      p.Id_producto, 
      p.nombre, 
      p.linea, 
      p.descripcion, 
      p.estado, 
      p.precio,
      p.estado,
      m.Id_marca,
      m.nombre AS nombre_marca,
      m.procedencia,
      pr.Id_proveedor,
      pr.nombre AS nombre_proveedor 
      FROM productos p 
      LEFT JOIN detalles_marca dm ON  p.Id_producto = dm.ID_producto
      LEFT JOIN marcas m ON dm.ID_marca = m.Id_marca
      LEFT JOIN detalles_proveedor dp ON p.Id_producto = dp.ID_producto
      LEFT JOIN proveedores pr ON dp.ID_proveedor = pr.Id_proveedor`, (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  getAll: (callback) => {
    db.query('SELEct * FROM productos', (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  getById: (idProducto, callback) => {
    db.query('SELECT * FROM productos WHERE Id_producto = ?', [idProducto], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  update: (idProducto, producto, callback) => {
    const query = ('UPDATE productos SET ? WHERE Id_producto = ?');
    db.query(query, [producto, idProducto], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  updateCamposBasicos: (idProducto, producto) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE productos SET  ? WHERE Id_producto = ?';
    db.query(query, [producto, idProducto], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
},

  delete: (idProducto, callback) => {
    db.query('DELET FROM productos WHERE Id_producto = ?', [idProducto], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  }

};

module.exports = Productos;