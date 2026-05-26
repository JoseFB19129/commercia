const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');
const authMiddleware = require('../../auth/middleware/auth.Middleware');

/**
 * ORDEN IMPORTANTE:
 * Las rutas fijas siempre deben ir ANTES de las rutas con parámetros dinámicos (/:id).
 * De lo contrario, Express pensará que palabras como "search" o "registrar" son un ID.
 */

// 1. Ruta para listar todas las empresas (Fija)
// URL final: GET /api/directory/empresas
router.get('/empresas', empresaController.listEmpresas);

// 2. Ruta para buscar empresas (Fija)
// URL final: GET /api/directory/search
router.get('/search', empresaController.searchEmpresas);

// 3. Ruta protegida para registrar (Fija)
// URL final: POST /api/directory/registrar
router.post('/registrar', authMiddleware, empresaController.createEmpresa);

// 4. Ruta dinámica para obtener una empresa por su ID (Corregida)
// URL final: GET /api/directory/empresas/69ecd2e51f200fd13315a89c
router.get('/empresas/:id', empresaController.getEmpresaById);

module.exports = router;