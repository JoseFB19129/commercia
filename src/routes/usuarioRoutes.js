const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de Usuario (Para crear tu cuenta en Postman)
router.post('/registro', async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
        let usuario = await Usuario.findOne({ email });
        if (usuario) return res.status(400).json({ msg: 'El usuario ya existe' });

        usuario = new Usuario({ nombre, email, password });
        
        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt);

        await usuario.save();
        res.status(201).json({ msg: 'Usuario creado correctamente' });
    } catch (err) {
        res.status(500).send('Error al registrar usuario');
    }
});

// Login de Usuario (Para obtener el TOKEN)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let usuario = await Usuario.findOne({ email });
        if (!usuario) return res.status(400).json({ msg: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) return res.status(400).json({ msg: 'Contraseña incorrecta' });

        const payload = { usuario: { id: usuario.id } };

        jwt.sign(payload, 'secreto_commercia_2026', { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;