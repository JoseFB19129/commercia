const mongoose = require("mongoose");

const usuarioVisitanteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
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
        minlength: 8,
        required: true
    },
    role: {
        type: String,
        enum: ['visitante'],
        default: 'visitante',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    lastLogin: {
        type: Date,
        default: null,
    },
});

// Método para comparar contraseñas (sin middleware)
usuarioVisitanteSchema.methods.comparePassword = async function(contrasena) {
    const bcrypt = require('bcryptjs');
    return await bcrypt.compare(contrasena, this.contrasena);
};

module.exports = mongoose.model("usuarioVisitante", usuarioVisitanteSchema);