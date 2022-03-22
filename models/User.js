const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    DNI: {
        type: String,
        required: true
    },
    BankData: {
        type: Number,
        required: true
    },
    role: { //esta propiedad no es requerida, No hay que pasarla por el body, se crea sola y por defecto va a ser 0
        type: Number, // le pondremos 1 para distinguirlo y tener el usuario admin que tendrá permisos especiales
        default: 0
    }
}, {
    timestamps: true
})





module.exports = mongoose.model("User", UserSchema)