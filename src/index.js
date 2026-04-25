const parser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;
const usuarioEmpresaRoutes = require("./routes/usuarioEmpresaRoutes");
const usuarioVisitanteRoutes = require("./routes/usuarioVisitanteRoutes");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
require('dotenv').config();

app.get('/', (req, res) => {
    res.send('API del Directorio de Negocios');
});

app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/empresa", usuarioEmpresaRoutes);
app.use("/api/visitante", usuarioVisitanteRoutes);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Conexión exitosa a MongoDB"))
    .catch((error) => console.log("Error de conexión:", error));

app.listen(port, () => {
    console.log(`La app se está ejecutando en el puerto ${port}`);
});