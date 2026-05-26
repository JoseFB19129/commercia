const Empresa = require('../../directory/models/EmpresaModel');
const UsuarioEmpresa = require('../../users/models/usuarioEmpresaModel');
const UsuarioVisitante = require('../../users/models/usuarioVisitanteModel'); // <--- CORREGIDO: Importa el modelo, no el middleware

exports.validateEmpresa = async (req, res) => {
    try {
        const empresa = await Empresa.findByIdAndUpdate(
            req.params.id, 
            { isValidated: true }, 
            { new: true }
        );
        if (!empresa) return res.status(404).json({ message: "Empresa no encontrada" });
        res.json({ message: "Empresa validada exitosamente", empresa });
    } catch (error) {
        res.status(500).json({ message: "Error al validar", error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id, type } = req.params; 
        
        // Seleccionamos el modelo según el tipo
        let Model;
        if (type === 'empresa') {
            Model = UsuarioEmpresa;
        } else if (type === 'visitante') {
            Model = UsuarioVisitante;
        } else {
            return res.status(400).json({ message: "Tipo de usuario inválido (debe ser 'empresa' o 'visitante')" });
        }

        const deleted = await Model.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Usuario no encontrado" });
        
        res.json({ message: `Usuario ${type} eliminado exitosamente` });
    } catch (error) {
        res.status(500).json({ message: "Error al gestionar usuario", error: error.message });
    }
};

exports.deleteEmpresa = async (req, res) => {
    try {
        const deleted = await Empresa.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Empresa no encontrada" });
        res.json({ message: "Empresa eliminada por el administrador" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar empresa", error: error.message });
    }
};