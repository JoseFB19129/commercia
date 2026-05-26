const jwt = require('jsonwebtoken');

/**
 * Middleware para verificar JWT enviado desde Angular 
 * a través del header 'x-auth-token'
 */
const authMiddleware = (req, res, next) => {
    // Obtenemos el token del header personalizado
    const token = req.header('x-auth-token');

    // Validación básica: si no hay token, rechazamos
    if (!token) {
        return res.status(401).json({ message: "Acceso denegado. No se proporcionó token." });
    }

    try {
        // Verificamos el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto_super_seguro');
        
        // Inyectamos la información del usuario en el objeto request
        req.usuario = decoded; 
        next();
    } catch (error) {
        // Manejo de errores específicos (token expirado o mal formado)
        res.status(401).json({ message: "Token inválido o expirado." });
    }
};

/**
 * Middleware para verificar privilegios de administrador
 */
const isAdmin = (req, res, next) => {
    // Verificamos que el usuario haya pasado por el middleware anterior y tenga el rol correcto
    if (!req.usuario || req.usuario.role !== 'admin') {
        return res.status(403).json({ 
            message: "Acceso denegado: Se requieren privilegios de administrador." 
        });
    }
    next();
};

module.exports = { authMiddleware, isAdmin };