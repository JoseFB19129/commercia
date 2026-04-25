const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token' });
    }
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'secreto_super_seguro');
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token inválido' });
    }
};

const verifyEmpresaRole = (req, res, next) => {
    if (req.user.role !== 'empresa') {
        return res.status(403).json({ message: 'Acceso denegado. Se requiere rol de empresa' });
    }
    next();
};

module.exports = { verifyToken, verifyEmpresaRole };