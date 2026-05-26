const mongoose = require('mongoose');

const UsuarioVisitanteSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: true 
    },
    apellido: { 
        type: String, 
        required: true 
    },
    correo: { 
        type: String, 
        required: true, 
        unique: true 
    },
    contrasena: { 
        type: String, 
        required: true 
    },
    // Aceptamos roles: visitante, empresa, admin
    role: { 
        type: String, 
        enum: ['visitante', 'empresa', 'admin'], 
        default: 'visitante' 
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
    lastLogin: { 
        type: Date 
    }
}, { timestamps: true });

module.exports = mongoose.model('UsuarioVisitante', UsuarioVisitanteSchema);