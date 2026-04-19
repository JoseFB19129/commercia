const mongoose = require("mongoose");
const usuarioEmpresaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    }, 
    nit: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    contrasena:{
        type: String,
        minlength:8,
        required: true
    },
    role: {
      type: String,
      enum: ['empresa'],
      default: 'empresa',
    },
        isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    directorio:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
      },
    ]
});

module.exports = mongoose.model("usuarioEmpresa", usuarioEmpresaSchema);