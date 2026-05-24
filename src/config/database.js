const mongoose = require('mongoose');
const dns = require('dns');

// En algunos equipos Windows, mongodb+srv falla con querySrv ECONNREFUSED
dns.setDefaultResultOrder('ipv4first');

async function connectDB() {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error('MONGODB_URI no está definida en el archivo .env');
    }

    if (!process.env.JWT_SECRET) {
        console.warn('⚠️  JWT_SECRET no está definido. Se usará un valor por defecto (solo desarrollo).');
    }

    const options = {
        serverSelectionTimeoutMS: 15000,
        socketTimeoutMS: 45000,
    };

    await mongoose.connect(uri, options);

    console.log('✅ MongoDB conectado correctamente');
    console.log('   Base de datos:', mongoose.connection.name);
    console.log('   Host:', mongoose.connection.host);
}

function isDBConnected() {
    return mongoose.connection.readyState === 1;
}

module.exports = { connectDB, isDBConnected };
