const usuarioVisitante = require('../models/usuarioVisitanteModel');

// Obtener perfil de visitante autenticado
const getProfile = async (req, res) => {
    try {
        const user = await usuarioVisitante.findById(req.user.id).select('-contrasena');
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar perfil de visitante
const updateProfile = async (req, res) => {
    try {
        const { nombre, apellido, correo } = req.body;
        const user = await usuarioVisitante.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        if (nombre) user.nombre = nombre;
        if (apellido) user.apellido = apellido;
        if (correo) user.correo = correo;
        
        await user.save();
        res.json({ message: 'Perfil actualizado exitosamente', user: { nombre: user.nombre, apellido: user.apellido, correo: user.correo } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cambiar contraseña
const changePassword = async (req, res) => {
    try {
        const { contrasenaActual, nuevaContrasena } = req.body;
        const user = await usuarioVisitante.findById(req.user.id);
        
        const isValidPassword = await user.comparePassword(contrasenaActual);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Contraseña actual incorrecta' });
        }
        
        user.contrasena = nuevaContrasena;
        await user.save();
        
        res.json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar cuenta de visitante (soft delete)
const deleteAccount = async (req, res) => {
    try {
        const user = await usuarioVisitante.findById(req.user.id);
        user.isActive = false;
        await user.save();
        res.json({ message: 'Cuenta desactivada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProfile, updateProfile, changePassword, deleteAccount };