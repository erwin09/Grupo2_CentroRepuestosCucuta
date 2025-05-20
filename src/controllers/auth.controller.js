const serviceLogin = require('../services/auth.services')

exports.login = async (req, res) => {
    const { Num_doc, contraseña } = req.body;
    try {
        const login = await serviceLogin.login(Num_doc, contraseña);
        res.status(200).send({message: 'Login exitoso' , login});
    } catch (error) {
        res.status(500).send({ message: 'Error enn login', error })
    }
};
