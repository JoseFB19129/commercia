const express = require('express');
const router = express.Router();
const Empresa = require('../models/Empresa');

// Ruta para obtener todas las empresas (Consultar catálogo - Item 2.c)
router.get('/catalogo', async (req, res) => {
    try {
        const empresas = await Empresa.find();
        res.status(200).json(empresas);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el catálogo", error });
    }
});

// Ruta para registrar una nueva empresa (Item 2.a)
router.post('/registrar', async (req, res) => {
    const { nombre, sector, ubicacion, actividad } = req.body;

    // Validación: que el sector sea un número entre 1 y 5
    if (typeof sector !== 'number' || sector < 1 || sector > 5) {
        return res.status(400).json({ 
            mensaje: "Error: El sector debe ser un número del 1 al 5 (1:Tech, 2:Salud, 3:Alimentos, 4:Educación, 5:Servicios)" 
        });
    }

    try {
        const nuevaEmpresa = new Empresa({ nombre, sector, ubicacion, actividad });
        await nuevaEmpresa.save();
        res.status(201).json({ mensaje: "Empresa registrada exitosamente", nuevaEmpresa });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al registrar la empresa", error });
    }
});
module.exports = router;