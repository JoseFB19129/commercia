const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const usuarioEmpresa = require('../models/usuarioEmpresaModel');
const usuarioVisitante = require('../models/usuarioVisitanteModel');

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, correo: user.correo, role: user.role },
        process.env.JWT_SECRET || 'secreto_super_seguro',
        { expiresIn: '24h' }
    );
};

// Registro para usuario empresa - VERSIÓN CON ENCRIPTACIÓN MANUAL
const registerEmpresa = async (req, res) => {
    try {
        const { nombre, nit, correo, contrasena } = req.body;
        
        console.log('Intentando registrar empresa:', { nombre, nit, correo });
        
        // Verificar campos requeridos
        if (!nombre || !nit || !correo || !contrasena) {
            return res.status(400).json({ 
                message: 'Faltan campos requeridos: nombre, nit, correo, contrasena' 
            });
        }
        
        if (contrasena.length < 8) {
            return res.status(400).json({ 
                message: 'La contraseña debe tener al menos 8 caracteres' 
            });
        }
        
        // Verificar si ya existe
        const existeEmpresa = await usuarioEmpresa.findOne({ 
            $or: [{ correo }, { nit }] 
        });
        
        if (existeEmpresa) {
            return res.status(400).json({ 
                message: 'El correo o NIT ya está registrado' 
            });
        }
        
        // Encriptar contraseña manualmente
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contrasena, salt);
        
        // Crear usuario con contraseña encriptada
        const newUser = new usuarioEmpresa({ 
            nombre, 
            nit, 
            correo, 
            contrasena: hashedPassword 
        });
        
        await newUser.save();
        
        const token = generateToken(newUser);
        
        res.status(201).json({ 
            message: 'Usuario empresa registrado exitosamente',
            token,
            user: { 
                id: newUser._id, 
                nombre: newUser.nombre, 
                nit: newUser.nit,
                correo: newUser.correo, 
                role: newUser.role 
            }
        });
    } catch (error) {
        console.error('Error detallado en registerEmpresa:', error);
        res.status(500).json({ 
            message: 'Error al registrar usuario empresa', 
            error: error.message
        });
    }
};

// Registro para usuario visitante - VERSIÓN CON ENCRIPTACIÓN MANUAL
const registerVisitante = async (req, res) => {
    try {
        const { nombre, apellido, correo, contrasena } = req.body;
        
        console.log('Intentando registrar visitante:', { nombre, apellido, correo });
        
        // Verificar campos requeridos
        if (!nombre || !apellido || !correo || !contrasena) {
            return res.status(400).json({ 
                message: 'Faltan campos requeridos: nombre, apellido, correo, contrasena' 
            });
        }
        
        if (contrasena.length < 8) {
            return res.status(400).json({ 
                message: 'La contraseña debe tener al menos 8 caracteres' 
            });
        }
        
        // Verificar si ya existe
        const existeVisitante = await usuarioVisitante.findOne({ correo });
        
        if (existeVisitante) {
            return res.status(400).json({ 
                message: 'El correo ya está registrado' 
            });
        }
        
        // Encriptar contraseña manualmente
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contrasena, salt);
        
        // Crear usuario con contraseña encriptada
        const newUser = new usuarioVisitante({ 
            nombre, 
            apellido, 
            correo, 
            contrasena: hashedPassword 
        });
        
        await newUser.save();
        
        const token = generateToken(newUser);
        
        res.status(201).json({ 
            message: 'Usuario visitante registrado exitosamente',
            token,
            user: { 
                id: newUser._id, 
                nombre: newUser.nombre, 
                apellido: newUser.apellido,
                correo: newUser.correo, 
                role: newUser.role 
            }
        });
    } catch (error) {
        console.error('Error detallado en registerVisitante:', error);
        res.status(500).json({ 
            message: 'Error al registrar usuario visitante', 
            error: error.message
        });
    }
};

// Login general
const login = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;
        
        if (!correo || !contrasena) {
            return res.status(400).json({ 
                message: 'Correo y contraseña son requeridos' 
            });
        }
        
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
        
        // Verificar si la cuenta está activa
        if (!user.isActive) {
            return res.status(401).json({ message: 'Cuenta desactivada' });
        }
        
        // Verificar contraseña
        const isValidPassword = await bcrypt.compare(contrasena, user.contrasena);
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
                nombre: user.nombre,
                ...(user.apellido && { apellido: user.apellido }),
                ...(user.nit && { nit: user.nit }),
                correo: user.correo, 
                role: user.role 
            }
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ 
            message: 'Error en el login', 
            error: error.message 
        });
    }
};

module.exports = { registerEmpresa, registerVisitante, login };