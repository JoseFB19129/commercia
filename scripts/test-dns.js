const dns = require('dns').promises;

async function main() {
  try {
    const records = await dns.resolveSrv('_mongodb._tcp.cluster0.mapxehn.mongodb.net');
    console.log('SRV OK:', records);
  } catch (e) {
    console.error('SRV FAIL:', e.message);
  }
}

main();
