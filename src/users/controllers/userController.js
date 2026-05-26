const UsuarioEmpresa = require('../models/usuarioEmpresaModel');
const UsuarioVisitante = require('../models/usuarioVisitanteModel');
const bcrypt = require('bcrypt');

// Función auxiliar mejorada
const findUserById = async (id) => {
    const emp = await UsuarioEmpresa.findById(id);
    if (emp) return { user: emp, type: 'empresa' };
    
    const vis = await UsuarioVisitante.findById(id);
    if (vis) return { user: vis, type: 'visitante' };
    
    return null;
};

exports.getProfile = async (req, res) => {
    try {
        const result = await findUserById(req.usuario.id);
        if (!result) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json(result.user);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener perfil", error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const result = await findUserById(req.usuario.id);
        if (!result) return res.status(404).json({ message: "Usuario no encontrado" });

        const { user } = result;

        // Filtramos datos sensibles
        const { contrasena, ...datosActualizables } = req.body;

        Object.assign(user, datosActualizables);
        await user.save();
        
        res.json({ message: "Perfil actualizado correctamente", user });
    } catch (error) {
        console.error("Error en updateProfile:", error);
        res.status(400).json({ message: "Error al actualizar", error: error.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const result = await findUserById(req.usuario.id);
        if (!result) return res.status(404).json({ message: "Usuario no encontrado" });

        const { user } = result;

        const isMatch = await bcrypt.compare(req.body.contrasenaActual, user.contrasena);
        if (!isMatch) {
            return res.status(400).json({ message: "La contraseña actual es incorrecta" });
        }

        const salt = await bcrypt.genSalt(10);
        user.contrasena = await bcrypt.hash(req.body.nuevaContrasena, salt);
        
        await user.save();
        res.json({ message: "Contraseña actualizada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al cambiar contraseña", error: error.message });
    }
};

// --- CORRECCIÓN: Función añadida para evitar TypeError en rutas ---
exports.deleteUser = async (req, res) => {
    try {
        const result = await findUserById(req.usuario.id);
        if (!result) return res.status(404).json({ message: "Usuario no encontrado" });

        await result.user.deleteOne();
        res.json({ message: "Cuenta eliminada permanentemente" });
    } catch (error) {
        console.error("Error en deleteUser:", error);
        res.status(500).json({ message: "Error al eliminar cuenta", error: error.message });
    }
};