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

module.exports = router;