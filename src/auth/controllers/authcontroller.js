const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UsuarioEmpresa = require('../../users/models/usuarioEmpresaModel');
const UsuarioVisitante = require('../../users/models/usuarioVisitanteModel');
const Admin = require('../../users/models/Admin');

// --- Función para generar Token ---
const generateToken = (user, esAdmin = false) => {
    return jwt.sign(
        { 
            id: user._id, 
            correo: user.email || user.correo, // Maneja ambos nombres de campo
            role: esAdmin ? 'admin' : (user.role || 'visitante') 
        },
        process.env.JWT_SECRET || 'secreto_super_seguro',
        { expiresIn: '24h' }
    );
};

// --- Login Unificado ---
const login = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;
        if (!correo || !contrasena) return res.status(400).json({ message: 'Datos incompletos' });
        
        // 1. Buscar Admin usando el campo 'email' como está en tu BD
        let user = await Admin.findOne({ email: correo });
        let esAdmin = !!user;

        // 2. Si no es admin, buscar en otros modelos
        if (!user) {
            user = await UsuarioEmpresa.findOne({ correo }) || await UsuarioVisitante.findOne({ correo });
        }
        
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        
        // 3. Verificación de estado
        if (!esAdmin && user.isActive === false) {
            return res.status(403).json({ message: 'Cuenta desactivada.' });
        }

        // 4. Comparación de contraseña (usando password o contrasena)
        const passToCheck = user.password || user.contrasena;
        const esValida = await bcrypt.compare(contrasena, passToCheck);
        
        if (!esValida) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // 5. Generar token
        const token = generateToken(user, esAdmin);
        
        res.json({ 
            token, 
            user: { 
                id: user._id, 
                nombre: user.nombre || (esAdmin ? 'Administrador' : 'Usuario'), 
                role: esAdmin ? 'admin' : (user.role || 'visitante'), 
                correo: user.email || user.correo 
            } 
        });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// --- Registro de Empresa ---
const registerEmpresa = async (req, res) => {
    try {
        const { nombre, nit, correo, contrasena } = req.body;
        const existe = await UsuarioEmpresa.findOne({ correo }) || await UsuarioVisitante.findOne({ correo });
        if (existe) return res.status(400).json({ message: 'El correo ya está registrado' });

        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const nuevaEmpresa = new UsuarioEmpresa({ 
            nombre, nit, correo, contrasena: hashedPassword, role: 'empresa', isActive: true 
        });
        
        await nuevaEmpresa.save();
        res.status(201).json({ message: 'Empresa registrada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar empresa' });
    }
};

// --- Registro de Visitante ---
const registerVisitante = async (req, res) => {
    try {
        const { nombre, apellido, correo, contrasena } = req.body;
        const existe = await UsuarioEmpresa.findOne({ correo }) || await UsuarioVisitante.findOne({ correo });
        if (existe) return res.status(400).json({ message: 'El correo ya está registrado' });

        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const nuevoVisitante = new UsuarioVisitante({ 
            nombre, apellido, correo, contrasena: hashedPassword, role: 'visitante', isActive: true 
        });
        
        await nuevoVisitante.save();
        res.status(201).json({ message: 'Visitante registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar visitante' });
    }
};

module.exports = { registerEmpresa, registerVisitante, login };