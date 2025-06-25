const serviceLogin = require('../services/auth.services')

exports.login = async (req, res) => {
    const { Num_doc, contraseña } = req.body;
    console.log("datos", req.body);
    
    try {
        const login = await serviceLogin.login(Num_doc, contraseña);
        res.status(200).send({message: 'Login exitoso' , login});
    } catch (error) {
        if (error.message === 'Usuario no encontrado') {
        res.status(404).send({ message: 'Usuario no encontrado' });
    } else if (error.message === 'Contraseña incorrecta') {
        res.status(401).send({ message: 'Contraseña incorrecta' });
    } else {
        res.status(500).send({ message: 'Error en login', error });
    }
    }
};
