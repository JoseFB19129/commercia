const express = require("express");
const router = express.Router();
const usuarioEmpresaSchema = require("../models/usuarioEmpresaModel");

router.post("/usuarioEmpresa" , (req, res)=>{
    const usuarioEmpresa = usuarioEmpresaSchema(req.body);
    usuarioVisitante
        .save()
        .then((data)=>res.json(data))
        .catch((error)=> res.json({ message: error}));
});

router.get("/usuarioEmpresa", (req, res)=> {
    usuarioEmpresaSchema.find()
        .then((data) => res.json(data))
        .catch((error)=> res.json({message : error}))
})

module.exports = router;