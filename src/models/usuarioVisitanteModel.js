const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    contrasena:{
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

// Encriptar contraseña antes de guardar
usuarioVisitanteSchema.pre('save', async function(next) {
    if (!this.isModified('contrasena')) return next();
    this.contrasena = await bcrypt.hash(this.contrasena, 10);
    next();
});

// Método para comparar contraseñas
usuarioVisitanteSchema.methods.comparePassword = async function(contrasena) {
    return await bcrypt.compare(contrasena, this.contrasena);
};

module.exports = mongoose.model("usuarioVisitante", usuarioVisitanteSchema);