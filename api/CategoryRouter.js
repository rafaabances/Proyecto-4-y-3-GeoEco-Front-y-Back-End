const express = require("express")
const Category = require("../models/Category")
const CategoryRouter = express.Router();
const auth = require("../middleware/auth") // esto para que el newarticle solo lo pueda hacer alguien que esté logueado
const authAdmin = require("../middleware/authAdmin") // esto para que solo lo pueda hacer el administrador


CategoryRouter.get("/categories", auth, async (req, res) => {
    let categories = await Category.find({}) // Se hace con find ( find viene de mongoose) para buscar dentro de la colección, así devuelve todos los objetos que hay en Author
    try {
        return res.status(200).send({
            success: true,
            categories
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

CategoryRouter.post("/newcategory", auth, authAdmin, async (req, res) => {
    const {
        categoryName
    } = req.body

    try {

        let category = new Category({
            categoryName,
        })

        //manejo de errores

        if (categoryName.length < 1) {
            return res.status(400).send({
                success: false,
                message: "Categoría debe tener al menos 1 carácter"
            })
        }


        await category.save()
        return res.status(200).send({
            success: true,
            message: "Categoría creada",
            category

        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })

    }

})

CategoryRouter.put("/updatecategory/:id", auth, authAdmin, async (req, res) => {
    const {
        id
    } = req.params
    const {
        categoryName
    } = req.body
    try {


        await Category.findByIdAndUpdate(id, {
            categoryName,
        })


        return res.status(200).send({
            success: true,
            message: "Categoría Modificada",
            categoryName
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})






module.exports = CategoryRouter