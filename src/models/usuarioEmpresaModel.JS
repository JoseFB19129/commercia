const mongoose = require("mongoose");

const usuarioEmpresaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    }, 
    nit: {
        type: String,
        required: true,
        unique: true
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
        enum: ['empresa'],
        default: 'empresa',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    lastLogin: {
        type: Date,
        default: null,
    },
    directorio: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    }]
});

// Método para comparar contraseñas (sin middleware)
usuarioEmpresaSchema.methods.comparePassword = async function(contrasena) {
    const bcrypt = require('bcryptjs');
    return await bcrypt.compare(contrasena, this.contrasena);
};

module.exports = mongoose.model("usuarioEmpresa", usuarioEmpresaSchema);