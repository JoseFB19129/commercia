const mongoose = require('mongoose');

const EmpresaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    nit: { type: String, required: true, unique: true },
    sector: { type: String, required: true }, 
    ubicacion: { type: String, required: true },
    actividad: { type: String, required: true },
    descripcion: String,
    link: { type: String, required: false },
    isValidated: { type: Boolean, default: false },
    // AQUÍ: La referencia debe ser al modelo que representa al usuario dueño
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'UsuarioEmpresas', required: true }
}, { timestamps: true });

// Nombre del modelo: 'Empresa'
// Colección en BD: 'empresas' (esto separa los datos de los usuarios)
module.exports = mongoose.model('Empresa', EmpresaSchema, 'usuarioempresas');