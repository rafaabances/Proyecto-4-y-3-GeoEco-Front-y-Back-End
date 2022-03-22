const express = require("express")
const Pay = require("../models/Pay")
const PayRouter = express.Router();
const auth = require("../middleware/auth") // esto para que el newarticle solo lo pueda hacer alguien que esté logueado
const authAdmin = require("../middleware/authAdmin") // esto para que solo lo pueda hacer el administrador


PayRouter.get("/payments", auth, authAdmin, async (req, res) => {
    let Payments = await Pay.find({}) // Se hace con find ( find viene de mongoose) para buscar dentro de la colección, así devuelve todos los objetos que hay en Author
    try {


        return res.status(200).send({
            success: true,
            Payments
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })

    }
}) // histoy de pagos.

PayRouter.get("/findpay/:id", auth, async (req, res) => {
    const {
        id
    } = req.params
    try {
        let payid = await Pay.findById(id).populate("user")

        //errores antes de la respuesta final

        if (!payid) {
            res.status(400).send({
                success: false,
                message: error.message
            })
        }

        res.status(200).send({
            success: true,
            message: "Pago encontrado",
            payid
        })

        // res.status(200).json({ // también se puede poner con json
        //     success: true,
        //     message: "Autor encontrado",
        //     author
        // })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})


PayRouter.post("/newpayment", async (req, res) => {
    const {
        user,
        address,
        paymentId,
        membership
    } = req.body


    let PayN = new Pay({ // viene del modelo user
        user: user,
        address,
        paymentId,
        membership
    })

    if (address.length < 10) {
        return res.status(400).send({
            success: false,
            message: "La dirección es demasiado corta"
        })
    }

    if (!user || !address || !paymentId || !membership) {
        return res.status(400).send({
            success: false,
            message: "No has completado todos los campos"
        })
    }

    await PayN.save()
    return res.status(200).send({
        success: true,
        PayN
    })
})


module.exports = PayRouter