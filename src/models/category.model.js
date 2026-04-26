const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    // Nombre de la categoría (ej: Gastronomía)
    name: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true 
    },
    // Descripción para el usuario visitante
    description: { 
        type: String, 
        required: true 
    },
    // Sector al que pertenece (ej: Servicios, Comercio) [cite: 33]
    sector: { 
        type: String, 
        required: true 
    },
    // --- CAMPOS DE ADMINISTRACIÓN ---
    // Permite al admin "apagar" una categoría sin borrarla
    active: { 
        type: Boolean, 
        default: true 
    },
    // Define el orden en el catálogo (1 es primero)
    priority: { 
        type: Number, 
        default: 1 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Category', categorySchema);