require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Log de peticiones para depuración
app.use((req, res, next) => {
    console.log(`[LOG]: ${req.method} ${req.path}`);
    next();
});

// Conexión DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => console.error('❌ Error DB:', err.message));

// --- RUTAS DEFINITIVAS ---
// Asegúrate de que en authRoutes.js tengas: router.post('/login', ...)
app.use('/api/auth', require('./src/auth/routes/authRoutes'));
app.use('/api/admin-setup', require('./src/auth/routes/tempRoutes')); 
app.use('/api/directory', require('./src/directory/routes/empresaRoutes'));
app.use('/api/users', require('./src/users/routes/userRoutes'));
app.use('/api/admin', require('./src/admin/routes/adminRoutes'));

app.get('/', (req, res) => res.json({ message: 'API operativa' }));

// 404 handler (Si llega aquí, significa que la ruta no existe en ningún app.use anterior)
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada', path: req.path });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));