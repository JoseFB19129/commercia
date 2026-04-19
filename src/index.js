const parser = require('body-parser');
const express = require('express')
const app = express()
const port = 3000
const usuarioEmpresaRoutes = require("./routes/usuarioEmpresaRoutes");
const usuarioVisitanteRoutes= require("./routes/usuarioVisitanteRoutes");
const mongoose = require("mongoose");
require('dotenv').config();

app.get('/', (req, res)=>{
    res.send('Hola mundo')
})

app.use(parser.urlencoded({extended:false}));
app.use(parser.json())

app.use("/usuarioVisitante", usuarioVisitanteRoutes)
app.use("/usuarioEmpresa", usuarioEmpresaRoutes);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("conexion exitosa"))
    .catch((error) => console.log(error))

app.listen(port, () => {
     console.log('la app se está ejecutando en el puerto ' + `${port}`)
})