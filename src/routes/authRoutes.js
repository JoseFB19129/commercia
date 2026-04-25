const express = require("express");
const router = express.Router();
const { registerEmpresa, registerVisitante, login } = require("../controllers/authController");

// Rutas de autenticación
router.post("/register/empresa", registerEmpresa);
router.post("/register/visitante", registerVisitante);
router.post("/login", login);

module.exports = router;