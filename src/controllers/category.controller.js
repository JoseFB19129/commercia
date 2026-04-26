const Category = require('../models/category.model');

// 1. CREAR CATEGORÍA (POST)
exports.createCategory = async (req, res) => {
    try {
        const { name, description, sector, priority } = req.body;
        const newCategory = new Category({ name, description, sector, priority });
        await newCategory.save();
        res.status(201).json({ message: "Categoría creada con éxito", newCategory });
    } catch (error) {
        res.status(400).json({ message: "Error: El nombre de la categoría ya existe", error: error.message });
    }
};

// 2. OBTENER TODAS (GET) - Para mostrar en el catálogo [cite: 86]
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ priority: 1 });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener categorías", error });
    }
};

// 3. ACTUALIZAR (PUT) - Para gestionar cambios del admin [cite: 94]
exports.updateCategory = async (req, res) => {
    try {
        const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Categoría actualizada", updated });
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar", error });
    }
};

// 4. ELIMINAR (DELETE) - Solo el admin puede usar esto
exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Categoría eliminada correctamente" });
    } catch (error) {
        res.status(400).json({ message: "Error al eliminar", error });
    }
};