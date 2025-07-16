const db = require('../config/db');

const Citas = {
    create: (cita, callback) => {
    const query = `INSERT INTO citas SET ?`;
    db.query(query, cita, (err, results) => {
      if (err) {
        console.error(err);
      return callback(err);
      }
      callback(null, results);
    });
  },

  getAll: (callback) => {
    const query = `
    SELECT c.Id_cita as codigo, v.placa as placa, c.nombre, c.fecha, c.estado, u.Num_doc
      FROM citas c 
    JOIN vehiculos v on c.ID_vehiculo = v.placa
    JOIN usuarios u on v.ID_usuario = u.Num_doc`;
    db.query(query, (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  getByIdClient: (idCliente, callback) => {
    const query = `
    SELECT c.Id_cita as codigo, v.placa as placa, c.nombre, c.fecha, c.estado 
      FROM citas c 
    JOIN vehiculos v on c.ID_vehiculo = v.placa
    JOIN usuarios u on v.ID_usuario = u.Num_doc
    WHERE u.Num_doc =  ? `;
    db.query(query,[idCliente],(err,result) => {
      if(err){
        console.error(err);
        return callback(err);
      }
      callback(null,result);
      console.log("resultado citas id", result);
      
    })
  },

  getById: (idCita, callback) => {
    db.query('SELECT * FROM citas WHERE Id_cita = ?', [idCita], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  update: (idCita, cita, callback) => {
    const query = ('UPDATE Citas SET ? WHERE Id_cita = ?');
    db.query(query, [cita, idCita], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  delete : (idCita, callback) => {
    db.query('DELET FROM Citas WHERE Id_cita = ?', [idCita], (err, result) => {
      if (err){
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  }

};

module.exports = Citas;