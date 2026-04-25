const usuarioEmpresa = require('../models/usuarioEmpresaModel');

// Obtener perfil de empresa autenticada
const getProfile = async (req, res) => {
    try {
        const user = await usuarioEmpresa.findById(req.user.id).select('-contrasena').populate('directorio');
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar perfil de empresa
const updateProfile = async (req, res) => {
    try {
        const { nombre, nit, correo } = req.body;
        const user = await usuarioEmpresa.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        if (nombre) user.nombre = nombre;
        if (nit) user.nit = nit;
        if (correo) user.correo = correo;
        
        await user.save();
        res.json({ message: 'Perfil actualizado exitosamente', user: { nombre: user.nombre, nit: user.nit, correo: user.correo } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cambiar contraseña
const changePassword = async (req, res) => {
    try {
        const { contrasenaActual, nuevaContrasena } = req.body;
        const user = await usuarioEmpresa.findById(req.user.id);
        
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

// Eliminar cuenta de empresa (soft delete)
const deleteAccount = async (req, res) => {
    try {
        const user = await usuarioEmpresa.findById(req.user.id);
        user.isActive = false;
        await user.save();
        res.json({ message: 'Cuenta desactivada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todas las empresas (para visitantes)
const getAllEmpresas = async (req, res) => {
    try {
        const empresas = await usuarioEmpresa.find({ isActive: true }).select('nombre nit correo directorio');
        res.json(empresas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener empresa específica por ID
const getEmpresaById = async (req, res) => {
    try {
        const empresa = await usuarioEmpresa.findById(req.params.id).select('nombre nit correo directorio').populate('directorio');
        if (!empresa || !empresa.isActive) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }
        res.json(empresa);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    getProfile, 
    updateProfile, 
    changePassword, 
    deleteAccount,
    getAllEmpresas,
    getEmpresaById
};