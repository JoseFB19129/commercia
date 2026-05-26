const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ mensaje: 'No hay token o formato incorrecto' });
        }

        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_secreto');
        
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token no es válido', error: error.message });
    }
};

module.exports = authMiddleware;