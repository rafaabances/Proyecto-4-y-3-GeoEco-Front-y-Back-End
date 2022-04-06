const express = require("express")
const Blog = require("../models/Blog")
const BlogRouter = express.Router();
const auth = require("../middleware/auth") // esto para que el newarticle solo lo pueda hacer alguien que esté logueado
const authAdmin = require("../middleware/authAdmin") // esto para que solo lo pueda hacer el administrador
const cloudinary = require("cloudinary")

const fs = require("fs")

// INTRODUCIMOS LA CONFIGURACIÓN DE CLOUDINARY
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})


BlogRouter.get("/news", auth, async (req, res) => {
    let news = await Blog.find({}) // Se hace con find ( find viene de mongoose) para buscar dentro de la colección, así devuelve todos los objetos que hay en Author
    try {

        return res.status(200).send({
            success: true,
            news
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

BlogRouter.get("/findnew/:id", auth, async (req, res) => {
    const {
        id
    } = req.params
    try {
        // let blog = await Blog.findById(id).populate({ path: 'user', select: 'name' }).populate("category").populate('commentNew')
        let blog = await Blog.findById(id, " date titleNew description").populate({
            path: 'category',
            select: 'categoryName'
        }).populate({
            path: 'user',
            select: 'name'
        }).populate({
            path: 'commentNew',
            select: 'commentTextBlog'
        }).populate({
            path: 'likes',
            select: 'name'
        })
        //errores antes de la respuesta final

        if (!blog) {
            res.status(400).send({
                success: false,
                message: error.message
            })
        }

        res.status(200).send({
            success: true,
            message: "Noticia o artículo encontrado",
            blog
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


BlogRouter.post("/newarticle", auth, authAdmin, async (req, res) => { // pasamos el auth para que necesites estar logueado


    // const user = User.findById(req.user.id).select("name")
    // const name = user
    try {

        const {
            titleNew,
            description,
            date,
            categoryId
        } = req.body


        if (titleNew.length < 5) {
            return res.status(400).send({
                success: false,
                message: "Título del artículo demasiado corto"
            })
        }


        if (!titleNew) {
            return res.status(400).send({
                success: false,
                message: "No has completado todos los campos"
            })

        }

        // if (!req.files || Object.keys(req.files).length === 0)
        //     return res.status(400).json({
        //         msg: 'No files were uploaded.'
        //     })

        // const file = req.files.file;
        // console.log(file)

        // if (file.size > 4000 * 3000) {
        //     removeTmp(file.tempFilePath)
        //     return res.status(400).json({
        //         msg: 'Size too large'
        //     })
        // }

        // if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
        //     removeTmp(file.tempFilePath)

        //     return res.status(400).json({
        //         msg: "File format is incorrect."
        //     })
        // }

        // let newFile = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        //     folder: "filesUpload"
        // }, async (err, result) => {
        //     if (err) throw err;
        //     removeTmp(file.tempFilePath)
        // })

        // const newFile = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        //     folder: "imagenes"
        // })
        // removeTmp(file.tempFilePath);


        let blog = new Blog({ // viene del modelo user
            titleNew,
            description,
            // image: {
            //     public_id: newFile.public_id,
            //     url: newFile.secure_url
            // },
            date,
            category: categoryId,
            user: req.user.id
        })
        await blog.save()
        return res.status(200).send({
            success: true,
            blog
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

BlogRouter.put("/updatenew/:id", auth, authAdmin, async (req, res) => {
    const {
        id
    } = req.params
    const {
        titleNew,
        description,
        categoryId
    } = req.body
    try {

        if (titleNew.length < 5) {
            return res.status(400).send({
                success: false,
                message: "Título del artículo demasiado corto"
            })
        }

        if (!titleNew) {
            return res.status(400).send({
                success: false,
                message: "No has completado todos los campos"
            })
        }



        await Blog.findByIdAndUpdate(id, {
            titleNew,
            description,
            category: categoryId,
        })


        return res.status(200).send({
            success: true,
            message: "Noticia Modificada"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})


BlogRouter.delete("/deletenew/:id", auth, authAdmin, async (req, res) => { // falta borrado en cascada de comentario post de usuario ....
    const {
        id
    } = req.params
    // const {
    //     public_id
    // } = req.body
    try {

        // if (!public_id) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "No se han seleccionado imagenes",
        //     });
        // }

        await Blog.findByIdAndDelete(id)
        // cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
        //     if (err) throw err;
        // });

        res.json({
            success: true,
            message: "Noticia eliminado correctamente",
        });



    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err;
    })
}


BlogRouter.post("/bloglikes", auth, async (req, res) => {
    const {BlogId} = req.body;
    const {id} = req.user
    try {
        let findBlog = await Blog.findById(BlogId)
        if (!findBlog) {
            return res.status(400).send({
                success: false,
                message: "This Blog does not exist"
            })
        }

        let findUser = await findBlog.likes.find(user => user._id.equals(id))
        console.log(id)
        if(findUser){
            await Blog.findByIdAndUpdate(BlogId, { $pull: { likes: id} });
    
            // return res.status(400).send({ / otra manera
            //     success: false,
            //     message: "Ya le has dado like a este blog"
            // })
        }else{
            await Blog.findByIdAndUpdate(BlogId, { $push: { likes: id} });
        }


    //   switch (action) {
    //     case "like":
    //       await Blog.findByIdAndUpdate(BlogId, { $push: { likes: id} });
    //       break;

    //     case "dislike":
    //       await Blog.findByIdAndUpdate(BlogId, { $pull: { likes: id} });
    //       break;

    //     default:
    //       break;
    //   }

      return res.status(200).send({
        success: true,
      })
    } catch (error) {
        return res.status(500).send({
            succes: false,
            message: error.message
        })
    }
  })

  




module.exports = BlogRouter