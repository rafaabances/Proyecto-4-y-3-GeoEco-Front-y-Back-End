const express = require("express");
const res = require("express/lib/response");
const User = require("../models/User")
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth") // esto para que el newarticle solo lo pueda hacer alguien que esté logueado
const authAdmin = require("../middleware/authAdmin") // esto para que solo lo pueda hacer el administrador
const nodemailer = require("../middleware/nodeMailer")


UserRouter.get("/users", auth, authAdmin, async (req, res) => {
    let users = await User.find({}) // Se hace con find ( find viene de mongoose) para buscar dentro de la colección, así devuelve todos los objetos que hay en Author
    try {


        return res.status(200).send({
            success: true,
            users
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

UserRouter.get("/finduser/:id", auth, async (req, res) => {
    const {
        id
    } = req.params
    try {
        let user = await User.findById(id)

        //errores antes de la respuesta final

        if (!user) {
            res.status(400).send({
                success: false,
                message: error.message
            })
        }

        res.status(200).send({
            success: true,
            message: "Usuario encontrado",
            user
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


UserRouter.post("/newuser", async (req, res) => {
    const {
        name,
        email,
        password,
        DNI,
        BankData,
        Role
    } = req.body
    try {


        // let user = new User({ // viene del modelo user
        let user = await User.findOne({
            email
        }) // para que no te deje crear 2 usuarios con el mismo email, el findOne te lo busca por cualquier propiedad en este caso por email.


        if (user) {
            return res.status(400).send({
                success: false,
                message: " Este usuario ya está registrado"
            })
        }

        if (name.length < 5 || password.length < 5) {
            return res.status(400).send({
                success: false,
                message: "Nombre o contraseña demasiado corto"
            })
        }

        let DNI2 = await User.findOne({
            DNI
        })

        if (DNI2) {
            return res.status(400).send({
                success: false,
                message: " Este DNI ya está registrado"
            })
        }

        if (DNI.length < 9) {
            return res.status(400).send({
                success: false,
                message: "DNI demasiado corto"
            })
        }

        if (!name || !email || !password || !DNI || !BankData) {
            return res.status(400).send({
                success: false,
                message: "No has completado todos los campos"
            })
        }

        // if (!(/^[_A-Za-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/.test(email))) // así con mayúsculas
        if (!(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/.test(email)))
            return res.status(400).send({
                message: "El formato de tu correo electronico en invalido!"
            })


        let passwordhash = await bcrypt.hash(password, 10)


        // otra forma hashear contraseña

        // const salt = bcrypt.genSaltSync(10) // el 10 es el nº de veces que piensa el ordenador para poner la contraseña más alto más segura, ojo más de 10/15 problema de que se te quede el ordenador pensando.
        // // hay que ponerlo dentro (local) y no fuera en lo global, ya que si no te repite la contraseña si la contraseña es la misma.
        // passwordhash = bcrypt.hashSync(password, salt)

       
       
        nodemailer.sendWelcomeEmail(
            email,
            password,  // se llama la funcón despues de hasear la contraseña y antes de crear el usuario
            name,
        ) 
       
       
        const newuser = new User({
            name,
            email,
            password: passwordhash,
            DNI,
            BankData,
            Role
        })

        await newuser.save()
        return res.status(200).send({
            success: true,
            newuser

        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }

})

UserRouter.put("/updateuser/:id", auth, async (req, res) => { // modificar todos, el one solo coge el 1º.
    const {
        id
    } = req.params
    const {
        name,
        email,
        password,
        DNI,
        BankData,
        Role
    } = req.body
    try {


        await User.findByIdAndUpdate(id, { // modificar todos, el one solo coge el 1º.
            name,
            email,
            password,
            DNI,
            BankData,
            Role
        })

        if (!name || !email || !password || !DNI || !BankData || !Role) {
            return res.status(400).send({
                success: false,
                message: "No has completado todos los campos"
            })
        }


        return res.status(200).send({
            success: true,
            message: "Usuario Modificado"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})


UserRouter.delete("/deleteuser/:id", auth, async (req, res) => {
    const {
        id
    } = req.params
    try {
        await User.findByIdAndDelete(id)
        return res.status(200).send({
            success: true,
            message: "Usuario eliminado"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})


// El navegador no sabe que usuario es, por eso tiene que devolver una clave de acceso o Token - permitirá ir por todas las páginas web que tengas acceso.


UserRouter.post("/login", async (req, res) => {
    const {
        email,
        password
    } = req.body
    try {
        let user = await User.findOne({
            email
        })


        if (!email) {
            return res.status(400).send({
                success: false,
                message: "No has introducido el email"
            })
        }

        if (!password) {
            return res.status(400).send({
                success: false,
                message: "No has introducido la contraseña"
            })
        }

        if (!user) {
            return res.status(400).send({
                success: false,
                message: "Wrong credentials/email"
            })
        }

        let passwordOk = await bcrypt.compare(password, user.password) //(de let user de esta funcion) // lo llaman match  //compara contraseña del body con la del usuario
        if (!passwordOk) {
            return res.status(400).send({
                success: false,
                message: "Wrong credentials/password"
            })
        }

        const token = accessToken({
            id: user._id
        }) // te crea el token cuando te logueas

        return res.status(200).send({
            success: true,
            message: "Usuario logueado correctamente",
            token
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

const accessToken = (user) => {
    return jwt.sign(user, process.env.ACCES_TOKEN_SECRET, {
        expiresIn: "7d"
    })
    //es la duración del token (en el backend si generas un nuevo token volviendo a loguearte
    // el anterior token te sigue valendo lo que ponga en expiresIn, en este caso 7 días) 
    // en el front es distinto al tener el log out (te borra el token)
}

module.exports = UserRouter