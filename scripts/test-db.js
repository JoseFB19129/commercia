require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const uri = process.env.MONGODB_URI;
console.log('Probando conexión...');

mongoose
  .connect(uri, { serverSelectionTimeoutMS: 15000 })
  .then(() => {
    console.log('OK - Base de datos:', mongoose.connection.name);
    process.exit(0);
  })
  .catch((err) => {
    console.error('FAIL:', err.message);
    process.exit(1);
  });
