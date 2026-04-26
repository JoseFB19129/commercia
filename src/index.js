const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// middleware
app.use(express.json());

// conexión Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo conectado"))
  .catch(err => console.log(err));

// rutas
app.use('/api/categories', require('./routes/category.routes'));

// puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});