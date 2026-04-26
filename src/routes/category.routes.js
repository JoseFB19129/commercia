
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

// Definición de Endpoints para Postman
router.post('/', categoryController.createCategory);     // Crear
router.get('/', categoryController.getCategories);       // Consultar todas
router.put('/:id', categoryController.updateCategory);    // Editar por ID
router.delete('/:id', categoryController.deleteCategory); // Eliminar por ID

module.exports = router;