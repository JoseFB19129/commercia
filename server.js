const mongoose = require('mongoose');
require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando');
});

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Mongo conectado'))
  .catch(err => console.log(err));