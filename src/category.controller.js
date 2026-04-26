const Category = require('../models/category.model');

exports.create = async (req, res) => {
  const data = new Category(req.body);
  const result = await data.save();
  res.json(result);
};

exports.getAll = async (req, res) => {
  const data = await Category.find();
  res.json(data);
};

exports.getById = async (req, res) => {
  const data = await Category.findById(req.params.id);
  res.json(data);
};

exports.update = async (req, res) => {
  const data = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(data);
};

exports.delete = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Eliminado" });
};