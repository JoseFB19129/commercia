let categories = [];

// Crear
exports.createCategory = (req, res) => {
  const category = {
    id: Date.now(),
    ...req.body
  };
  categories.push(category);
  res.json(category);
};

// Obtener todos
exports.getCategories = (req, res) => {
  res.json(categories);
};

// Actualizar
exports.updateCategory = (req, res) => {
  const { id } = req.params;

  categories = categories.map(cat =>
    cat.id == id ? { ...cat, ...req.body } : cat
  );

  res.json({ message: "Actualizado" });
};

// Eliminar
exports.deleteCategory = (req, res) => {
  const { id } = req.params;

  categories = categories.filter(cat => cat.id != id);

  res.json({ message: "Eliminado" });
};