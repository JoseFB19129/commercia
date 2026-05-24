require('dotenv').config();
const mongoose = require('mongoose');

// URI estándar (sin mongodb+srv) para evitar fallos de DNS en Node en Windows
const uri = process.env.MONGODB_URI_STANDARD || process.env.MONGODB_URI;

console.log('Probando URI estándar...');

mongoose
  .connect(uri, { serverSelectionTimeoutMS: 20000 })
  .then(() => {
    console.log('OK - Base de datos:', mongoose.connection.name);
    process.exit(0);
  })
  .catch((err) => {
    console.error('FAIL:', err.message);
    process.exit(1);
  });
