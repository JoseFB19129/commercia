const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const { 
    getProfile, 
    updateProfile, 
    changePassword, 
    deleteAccount
} = require("../controllers/usuarioVisitanteController");

// Rutas protegidas (solo para visitantes autenticados)
router.get("/perfil", verifyToken, getProfile);
router.put("/perfil", verifyToken, updateProfile);
router.put("/cambiar-contrasena", verifyToken, changePassword);
router.delete("/cuenta", verifyToken, deleteAccount);

module.exports = router;