const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (Num_doc, contraseña) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM usuarios WHERE Num_doc = ?';
        db.query(query, [Num_doc], async (err, results) => {
            if (err) return reject({ status: 5, message: 'Error del servidor', error: err });

            if (results.length === 0) {
                return reject({ status: 401, message: 'Usuario no encontrado' });
            }

            const usuario = results[0];
            const passwordCorrecta = await bcrypt.compare(contraseña, usuario.contraseña);
            if (!passwordCorrecta) {
                return reject({ status: 401, message: 'Contraseña incorrecta' });
            }

            const token = jwt.sign(
                {
                    Num_doc: usuario.Num_doc,
                    rol: usuario.rol
                },
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            );

            resolve({
                message: 'Login exitoso',
                token,
                usuario: {
                    Num_doc: usuario.Num_doc,
                    nombre: usuario.nombre_usuario,
                    rol: usuario.rol,
                }
            });
        });
    })

}

module.exports = {
    login
};