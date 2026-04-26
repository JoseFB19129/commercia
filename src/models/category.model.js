const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    // Nombre de la categoría (ej: Gastronomía)
    name: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true 
    },
    // Descripción detallada para el usuario visitante
    description: { 
        type: String, 
        required: true 
    },
    // El sector al que pertenece (ej: Servicios, Comercio)
    sector: { 
        type: String, 
        required: true 
    },
    // --- CAMPOS ESPECÍFICOS DE ADMINISTRACIÓN ---
    // Permite al admin desactivar una categoría sin borrarla de la BD
    active: { 
        type: Boolean, 
        default: true 
    },
    // Prioridad para mostrar en el catálogo (1 es la más alta)
    priority: { 
        type: Number, 
        default: 10 
    },
    // Fecha de creación para auditoría del administrador
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Category', categorySchema);