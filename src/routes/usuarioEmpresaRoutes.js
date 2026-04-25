const express = require("express");
const router = express.Router();
const { verifyToken, verifyEmpresaRole } = require("../middleware/auth");
const { 
    getProfile, 
    updateProfile, 
    changePassword, 
    deleteAccount,
    getAllEmpresas,
    getEmpresaById
} = require("../controllers/usuarioEmpresaController");

// Rutas públicas (para consultar empresas)
router.get("/empresas", getAllEmpresas);
router.get("/empresas/:id", getEmpresaById);

// Rutas protegidas (solo para usuarios empresa autenticados)
router.get("/perfil", verifyToken, verifyEmpresaRole, getProfile);
router.put("/perfil", verifyToken, verifyEmpresaRole, updateProfile);
router.put("/cambiar-contrasena", verifyToken, verifyEmpresaRole, changePassword);
router.delete("/cuenta", verifyToken, verifyEmpresaRole, deleteAccount);

module.exports = router;