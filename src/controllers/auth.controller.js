const serviceLogin = require('../services/auth.services')

exports.login = async (req, res) => {
    const { Num_doc, contraseña } = req.body;
    console.log("datos", req.body);

    try {
        const login = await serviceLogin.login(Num_doc, contraseña);
        res.status(200).send({ message: 'Login exitoso', login });
    } catch (error) {
        const mensaje = error.message?.toLowerCase().replace('.', '').trim();

        if (mensaje === 'usuario no encontrado') {
            res.status(404).send({ message: 'Usuario no encontrado.' });
        } else if (mensaje === 'usuario desactivado') {
            res.status(403).send({ message: 'Usuario desactivado. Contacte con el administrador.' });
        } else if (mensaje === 'contraseña incorrecta') {
            res.status(401).send({ message: 'Contraseña incorrecta' });
        } else {
            console.error("Error no controlado:", error);
            res.status(error.status || 500).send({ message: 'Error en login', error });
        }
    }
};
