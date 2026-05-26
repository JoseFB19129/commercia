const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Admin = require('../../users/models/Admin'); // Asegúrate de que esta ruta sea correcta

router.post('/crear-admin', async (req, res) => {
    try {
        console.log("Datos recibidos:", req.body); // <-- Velo en la terminal
        const { email, password } = req.body;

        // Validar que los campos existan
        if (!email || !password) {
            return res.status(400).json({ message: "❌ Faltan datos: email y password son requeridos" });
        }
        
        // Encriptar
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Crear
        const nuevoAdmin = new Admin({ 
            email, 
            password: hashedPassword 
        });
        
        await nuevoAdmin.save();
        res.status(201).json({ message: "✅ Admin creado exitosamente" });
    } catch (error) {
        console.error("Error al crear admin:", error);
        res.status(500).json({ message: "❌ Error interno", error: error.message });
    }
});

module.exports = router;