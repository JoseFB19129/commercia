require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// --- MIDDLEWARES GLOBALES ---
app.use(express.json()); // Permitir que la API reciba JSON

// --- CONEXIÓN A BASE DE DATOS ---
// Usamos la variable de entorno para no exponer credenciales
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/commercia_db';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Conexión exitosa a MongoDB Atlas'))
    .catch(err => console.error('❌ Error de conexión a la DB:', err));

// --- RUTAS DE LOS MÓDULOS ---
// Módulo de Usuarios (Autenticación y Sesión)
app.use('/api/usuarios', require('./routes/usuarioRoutes'));

// Módulo de Empresas (Tu CRUD principal - Punto 2 del taller)
app.use('/api/empresas', require('./routes/empresaRoutes'));

// --- CONFIGURACIÓN DEL SERVIDOR ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor activo en: http://localhost:${PORT}`);
    console.log(`📂 Módulo Empresas listo para pruebas en Postman`);
});