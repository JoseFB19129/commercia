const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    contrasena:{
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

// Encriptar contraseña antes de guardar
usuarioEmpresaSchema.pre('save', async function(next) {
    if (!this.isModified('contrasena')) return next();
    this.contrasena = await bcrypt.hash(this.contrasena, 10);
    next();
});

// Método para comparar contraseñas
usuarioEmpresaSchema.methods.comparePassword = async function(contrasena) {
    return await bcrypt.compare(contrasena, this.contrasena);
};

module.exports = mongoose.model("usuarioEmpresa", usuarioEmpresaSchema);