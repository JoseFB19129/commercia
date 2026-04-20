const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ mensaje: 'No hay token, acceso denegado' });
    }

    try {
        const cifrado = jwt.verify(token, 'secreto_proyecto_commercia');
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        res.status(401).json({ mensaje: 'Token no válido' });
    }
};