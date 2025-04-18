const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { Num_doc, contraseña } = req.body;

    const query = 'SELECT * FROM usuarios WHERE Num_doc = ?';
    db.query(query, [Num_doc], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Error del servidor', error: err });

        if (results.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const usuario = results[0];
        const passwordCorrecta = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!passwordCorrecta) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Crear el token
        const token = jwt.sign(
            {
                Num_doc: usuario.Num_doc,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.status(200).json({
            message: 'Login exitoso',
            token,
            usuario: {
                Num_doc: usuario.Num_doc,
                nombre: usuario.nombre_usuario,
                rol: usuario.rol,
            }
        });
    });
};
