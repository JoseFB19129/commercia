const express = require("express");
const router = express.router();
const usuarioVisitanteSchema = require("../models/usuarioVisitanteModel");

router.post("/usuarioVisitante" , (req, res)=>{
    const usuarioVisitante = usuarioVisitanteSchema(req.body);
    usuarioVisitante
        .save()
        .then((data)=>res.json(data))
        .catch((error)=> res.json({ message: error}));
});

module.exports = router;