// Cargar variables de entorno PRIMERO
require('dotenv').config();

const parser = require('body-parser');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { connectDB, isDBConnected } = require('./config/database');
const usuarioEmpresaRoutes = require('./routes/usuarioEmpresaRoutes');
const usuarioVisitanteRoutes = require('./routes/usuarioVisitanteRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('API del Directorio de Negocios');
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        database: isDBConnected() ? 'connected' : 'disconnected',
        dbName: mongoose.connection.name || null
    });
});

app.use(cors());
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

// No procesar peticiones de API si MongoDB no está listo
app.use('/api', (req, res, next) => {
    if (!isDBConnected()) {
        return res.status(503).json({
            message: 'Base de datos no disponible. Verifica MONGODB_URI y la conexión a Atlas.'
        });
    }
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/empresa', usuarioEmpresaRoutes);
app.use('/api/visitante', usuarioVisitanteRoutes);

async function startServer() {
    try {
        console.log('🔗 Conectando a MongoDB...');
        await connectDB();

        app.listen(port, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
            console.log('Endpoints disponibles:');
            console.log('   GET    /api/health');
            console.log('   POST   /api/auth/register/empresa');
            console.log('   POST   /api/auth/register/visitante');
            console.log('   POST   /api/auth/login');
            console.log('   GET    /api/empresa/empresas');
        });
    } catch (error) {
        console.error('❌ No se pudo iniciar el servidor:', error.message);
        console.error('');
        console.error('Revisa en tu archivo .env:');
        console.error('  1. MONGODB_URI (usa formato mongodb:// sin +srv si falla DNS)');
        console.error('  2. En Atlas: Network Access → agrega tu IP (o 0.0.0.0/0 para pruebas)');
        console.error('  3. Usuario y contraseña correctos en Database Access');
        process.exit(1);
    }
}

startServer();
