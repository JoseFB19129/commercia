const express = require('express');
const mongoose = require('mongoose');
const app = express();

// 1. Middleware para que la API entienda JSON
app.use(express.json());

// 2. Conexión a MongoDB (Usa tu propia URL de Atlas o una local)
const MONGO_URI = "TU_CADENA_DE_CONEXION_AQUI"; 
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB Atlas'))
    .catch(err => console.error('❌ Error de conexión:', err));

// 3. Vincular tus rutas (Aquí es donde todo se une)
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/empresas', require('./routes/empresaRoutes'));

// 4. Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});