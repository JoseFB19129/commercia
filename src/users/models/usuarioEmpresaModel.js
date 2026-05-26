const mongoose = require('mongoose');

const UsuarioEmpresaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    nit: { type: String, required: true, unique: true },
    correo: { type: String, required: true, unique: true },
    contrasena: { type: String, required: true },
    role: { type: String, default: 'empresa' },
    isActive: { type: Boolean, default: true },
    lastLogin: Date
}, { timestamps: true });

module.exports = mongoose.model('UsuarioEmpresa', UsuarioEmpresaSchema);