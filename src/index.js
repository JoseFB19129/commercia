const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

// rutas
app.use('/api/categories', require('./routes/category.routes'));

const startServer = async () => {
  try {
    console.log("🚀 Iniciando servidor...");
    console.log("🔗 Intentando conectar a Mongo...");

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });

    console.log("✅ Mongo conectado");

    app.listen(3000, () => {
      console.log("✅ Servidor corriendo en puerto 3000");
    });

  } catch (error) {
    console.log("❌ ERROR REAL:");
    console.log(error);
  }
};

startServer();