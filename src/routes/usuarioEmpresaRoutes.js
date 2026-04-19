const express = require("express");
const router = express.router();
const usuarioEmpresaSchema = require("/models/usuarioEmpresaModel.JS");

router.post("/usuarioEmpresa" , (req, res)=>{
    const usuarioEmpresa = usuarioEmpresaSchema(req.body);
    usuarioVisitante
        .save()
        .then((data)=>res.json(data))
        .catch((error)=> res.json({ message: error}));
});

module.exports = router;