const Empresa = require('../models/EmpresaModel');

const listEmpresas = async (req, res) => {
    try {
        // Obtenemos todas las empresas. Si falla, el catch nos dirá por qué.
        const empresas = await Empresa.find({});
        res.status(200).json(empresas);
    } catch (error) {
        console.error("ERROR EN listEmpresas:", error);
        res.status(500).json({ message: "Error al listar empresas", error: error.message });
    }
};

const searchEmpresas = async (req, res) => {
    try {
        const { sector, ubicacion, actividad } = req.query;
        let query = {};
        if (sector) query.sector = sector;
        if (ubicacion) query.ubicacion = ubicacion;
        if (actividad) query.actividad = { $regex: actividad, $options: 'i' };
        
        const resultados = await Empresa.find(query);
        res.status(200).json(resultados);
    } catch (error) {
        console.error("ERROR EN searchEmpresas:", error);
        res.status(500).json({ message: "Error en búsqueda", error: error.message });
    }
};

const getEmpresaById = async (req, res) => {
    try {
        const empresa = await Empresa.findById(req.params.id);
        if (!empresa) return res.status(404).json({ message: "Empresa no encontrada" });
        res.status(200).json(empresa);
    } catch (error) {
        console.error("ERROR EN getEmpresaById:", error);
        res.status(500).json({ message: "Error al obtener empresa", error: error.message });
    }
};

const createEmpresa = async (req, res) => {
    try {
        // Verificamos que el usuario exista en el request (inyectado por el middleware)
        if (!req.usuario || !req.usuario.id) {
            return res.status(401).json({ message: "Usuario no autenticado o token inválido" });
        }
        
        const nuevaEmpresa = new Empresa({ 
            ...req.body, 
            owner: req.usuario.id 
        });
        
        await nuevaEmpresa.save();
        res.status(201).json({ message: "Empresa registrada con éxito", nuevaEmpresa });
    } catch (error) {
        console.error("ERROR EN createEmpresa:", error);
        res.status(400).json({ message: "Error al registrar empresa", error: error.message });
    }
};

const deleteEmpresa = async (req, res) => {
    try {
        if (!req.usuario || !req.usuario.id) {
            return res.status(401).json({ message: "No autorizado" });
        }
        
        const empresa = await Empresa.findOneAndDelete({ 
            _id: req.params.id, 
            owner: req.usuario.id 
        });
        
        if (!empresa) return res.status(404).json({ message: "No encontrada o sin permisos para eliminar" });
        res.status(200).json({ message: "Empresa eliminada correctamente" });
    } catch (error) {
        console.error("ERROR EN deleteEmpresa:", error);
        res.status(500).json({ message: "Error al eliminar", error: error.message });
    }
};

module.exports = {
    listEmpresas,
    searchEmpresas,
    getEmpresaById,
    createEmpresa,
    deleteEmpresa
};