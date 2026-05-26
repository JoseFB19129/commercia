const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// --- Rutas de autenticación ---
router.post('/login', authController.login);
router.post('/register/empresa', authController.registerEmpresa);
router.post('/register/visitante', authController.registerVisitante);

// Ruta de logout
router.post('/logout', (req, res) => {
    // Si manejas tokens (JWT), aquí deberías invalidar el token
    res.status(200).json({ message: "Sesión cerrada correctamente" });
});

// IMPORTANTE: Hemos eliminado el 'router.use' que causaba el error 404 
// en las otras rutas (como crear-admin), ya que el manejo de 404 
// debe ser centralizado en app.js.

module.exports = router;