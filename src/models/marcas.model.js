const db = require('../config/db');

const Marcas = {
  create: (marca, callback) => {
    const query = `INSERT INTO marcas SET ?`;
    db.query(query, marca, (err, results) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      const insertedId = marca.Id_marca;
      const selectQuery = `SELECT * FROM marcas WHERE Id_marca = ?`;
      db.query(selectQuery, [insertedId], (err, rows) => {
        if (err) {
          console.error(err);
          return callback(err);
        }

        callback(null, rows[0]);
      });
    });
  },

  getAll: (callback) => {
    db.query('SELEct * FROM marcas', (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  getById: (idmarca, callback) => {
    db.query('SELECT * FROM marcas WHERE Id_marca = ?', [idmarca], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  getByName: (nameMarca) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM marcas WHERE nombre = ?', [nameMarca], (err, result) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        resolve(result);
      });
    });
  },

  update: (idmarca, marca, callback) => {
    const query = ('UPDATE marcas SET ? WHERE Id_marca = ?');
    db.query(query, [marca, idmarca], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  },

  delete: (idmarca, callback) => {
    db.query('DELET FROM marcas WHERE Id_marca = ?', [idmarca], (err, result) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      callback(null, result);
    });
  }

};

module.exports = Marcas;