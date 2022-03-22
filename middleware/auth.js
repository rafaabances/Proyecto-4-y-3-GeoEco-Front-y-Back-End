// creamos la función para que reconozca que es ese usuario el que está logueado

const jwt = require("jsonwebtoken")

const auth = (req, res, next) => { // next significa que si todo se resuelve correctamente, sigue procesando el código
    try {
        const token = req.header("Authorization") // hemos tenido, req. param, body y ahora header (está en el postman)

        if (!token) {
            return res.status(400).send({
                success: false,
                message: "Invalid Authentification"
            })
        }

        jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).send({
                success: false,
                message: "Invalid Authentification(2)"
            })

            req.user = user
            next()
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}



module.exports = auth