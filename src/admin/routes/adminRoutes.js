const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Importamos el middleware y el controlador
const { authMiddleware, isAdmin } = require('../../middleware/auth.middleware');
const adminController = require('../controllers/adminController');
const Empresa = require('../../directory/models/EmpresaModel');

// --- RUTA DE PRUEBA (Para generar token rápido) ---
router.get('/test-token', (req, res) => {
    const token = jwt.sign({ id: '123', role: 'admin' }, process.env.JWT_SECRET || 'secreto_super_seguro');
    res.json({ token });
});

// --- RUTA LISTAR PENDIENTES ---
router.get('/pendientes', authMiddleware, isAdmin, async (req, res) => {
    try {
        const pendientes = await Empresa.find({ isValidated: false });
        res.status(200).json(pendientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- RUTAS DE GESTIÓN (Usando el controlador) ---
router.put('/aprobar/:id', authMiddleware, isAdmin, adminController.validateEmpresa);
router.delete('/eliminar-empresa/:id', authMiddleware, isAdmin, adminController.deleteEmpresa);
router.delete('/eliminar-usuario/:type/:id', authMiddleware, isAdmin, adminController.deleteUser);

module.exports = router;