const mongoose = require('mongoose');

const EmpresaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    // 1: Tecnología, 2: Salud, 3: Alimentos, 4: Educación, 5: Servicios
    sector: { type: Number, required: true, min: 1, max: 5 }, 
    ubicacion: { type: String, required: true },
    actividad: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Empresa', EmpresaSchema);