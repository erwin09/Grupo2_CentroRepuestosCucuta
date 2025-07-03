const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (Num_doc, contraseña) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM usuarios WHERE Num_doc = ?';
        db.query(query, [Num_doc], async (err, results) => {
            if (err) return reject({ status: 500, message: 'Error del servidor', error: err });
            //verifica si el usuario esta en la base de datos
            if (results.length === 0) {
                return reject({ status: 404, message: 'Usuario no encontrado' });
            }

            const usuario = results[0];
            //verifica que el usuario en el estado este activo
            if (usuario.estado !== 1) {
                return reject({ status: 403, message: 'Usuario desactivado. Contacte con el administrador.' });
            }
            //verificación de la contraseña
            const passwordCorrecta = await bcrypt.compare(contraseña, usuario.contrasena);
            if (!passwordCorrecta) {
                return reject({ status: 401, message: 'Contraseña incorrecta' });
            }
            //encriptación
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