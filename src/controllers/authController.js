const jwt = require('jsonwebtoken');
const usuarioEmpresa = require('../models/usuarioEmpresaModel');
const usuarioVisitante = require('../models/usuarioVisitanteModel');

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, correo: user.correo, role: user.role },
        process.env.JWT_SECRET || 'secreto_super_seguro',
        { expiresIn: '24h' }
    );
};

// Registro para usuario empresa
const registerEmpresa = async (req, res) => {
    try {
        const { nombre, nit, correo, contrasena } = req.body;
        
        // Verificar si ya existe
        const existeEmpresa = await usuarioEmpresa.findOne({ $or: [{ correo }, { nit }] });
        if (existeEmpresa) {
            return res.status(400).json({ message: 'El correo o NIT ya está registrado' });
        }
        
        const newUser = new usuarioEmpresa({ nombre, nit, correo, contrasena });
        await newUser.save();
        
        const token = generateToken(newUser);
        res.status(201).json({ 
            message: 'Usuario empresa registrado exitosamente',
            token,
            user: { id: newUser._id, nombre: newUser.nombre, correo: newUser.correo, role: newUser.role }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Registro para usuario visitante
const registerVisitante = async (req, res) => {
    try {
        const { nombre, apellido, correo, contrasena } = req.body;
        
        // Verificar si ya existe
        const existeVisitante = await usuarioVisitante.findOne({ correo });
        if (existeVisitante) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }
        
        const newUser = new usuarioVisitante({ nombre, apellido, correo, contrasena });
        await newUser.save();
        
        const token = generateToken(newUser);
        res.status(201).json({ 
            message: 'Usuario visitante registrado exitosamente',
            token,
            user: { id: newUser._id, nombre: newUser.nombre, apellido: newUser.apellido, correo: newUser.correo, role: newUser.role }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login general
const login = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;
        
        // Buscar en ambos modelos
        let user = await usuarioEmpresa.findOne({ correo });
        let userModel = 'empresa';
        
        if (!user) {
            user = await usuarioVisitante.findOne({ correo });
            userModel = 'visitante';
        }
        
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        
        // Verificar contraseña
        const isValidPassword = await user.comparePassword(contrasena);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        
        // Actualizar último login
        user.lastLogin = new Date();
        await user.save();
        
        const token = generateToken(user);
        res.json({ 
            message: 'Login exitoso',
            token,
            user: { 
                id: user._id, 
                nombre: user.nombre || user.nombre,
                ...(user.apellido && { apellido: user.apellido }),
                correo: user.correo, 
                role: user.role 
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerEmpresa, registerVisitante, login };