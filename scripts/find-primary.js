require('dotenv').config();
const mongoose = require('mongoose');

const hosts = [
  'ac-bxp9w5d-shard-00-00.mapxehn.mongodb.net',
  'ac-bxp9w5d-shard-00-01.mapxehn.mongodb.net',
  'ac-bxp9w5d-shard-00-02.mapxehn.mongodb.net'
];

const match = process.env.MONGODB_URI.match(/mongodb:\/\/([^:]+):([^@]+)@/);
if (!match) {
  console.error('No se pudo leer usuario/contraseña de MONGODB_URI');
  process.exit(1);
}

const [, user, pass] = match;

async function tryHost(host) {
  const uri = `mongodb://${user}:${pass}@${host}:27017/commercia?ssl=true&authSource=admin&directConnection=true`;
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 12000 });
  const isPrimary = mongoose.connection.db.admin().command({ ismaster: 1 });
  const result = await isPrimary;
  await mongoose.disconnect();
  return { host, isPrimary: result.ismaster || result.isWritablePrimary };
}

(async () => {
  for (const host of hosts) {
    try {
      const uri = `mongodb://${user}:${pass}@${host}:27017/commercia?ssl=true&authSource=admin&directConnection=true`;
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 12000 });
      const result = await mongoose.connection.db.admin().command({ isMaster: 1 });
      const primary = result.ismaster || result.isWritablePrimary;
      console.log(host, primary ? '← PRIMARY' : 'secondary');
      await mongoose.disconnect();
      if (primary) {
        console.log('\nUsa en .env:');
        console.log(`MONGODB_URI=${uri}`);
        process.exit(0);
      }
    } catch (e) {
      console.log(host, 'ERROR:', e.message);
      try { await mongoose.disconnect(); } catch (_) {}
    }
  }
  process.exit(1);
})();
