const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../../auth/middleware/auth.Middleware');

// Todas estas rutas requieren estar logueado
router.get('/perfil', authMiddleware, userController.getProfile);
router.put('/perfil', authMiddleware, userController.updateProfile);

// --- RUTA NUEVA AGREGADA ---
router.put('/cambiar-contrasena', authMiddleware, userController.changePassword);

router.delete('/cuenta', authMiddleware, userController.deleteUser);

module.exports = router;