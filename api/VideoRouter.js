const express = require("express")
const Video = require("../models/Video")
const VideoRouter = express.Router();
const auth = require("../middleware/auth") // esto para que el newvideo solo lo pueda hacer alguien que esté logueado
const authAdmin = require("../middleware/authAdmin") // esto para que solo lo pueda hacer el administrador
const cloudinary = require("cloudinary")

const fs = require("fs")


// INTRODUCIMOS LA CONFIGURACIÓN DE CLOUDINARY
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

VideoRouter.get("/videos", auth, async (req, res) => {
    let videos = await Video.find({}).populate({
        path: 'category',
        select: 'categoryName'
    })

    // Se hace con find ( find viene de mongoose) para buscar dentro de la colección, así devuelve todos los objetos que hay en Author
    try {

        return res.status(200).send({
            success: true,
            videos
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

VideoRouter.get("/findvideo/:id", auth, async (req, res) => {
    const {
        id
    } = req.params
    try {
        // let video = await Video.findById(id, "titleVideo category user commentV")
        // .populate({ path: 'user', select: 'name' }).populate("category").populate("commentVideo")
        let video = await Video.findById(id, " date titleVideo description").populate({
            path: 'category',
            select: 'categoryName'
        }).populate({
            path: 'user',
            select: 'name'
        }).populate({
            path: 'commentV',
            select: 'commentTextVideo'
        }).populate({
            path: 'likes',
            select: 'name'
        })


        //errores antes de la respuesta final

        if (!video) {
            res.status(400).send({
                success: false,
                message: error.message
            })
        }

        res.status(200).send({
            success: true,
            message: "Video encontrado",
            video
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


VideoRouter.post("/newvideo", auth, authAdmin, async (req, res) => {
    try {


        const {
            titleVideo,
            description,
            date,
            categoryId,

        } = req.body


        if (titleVideo.length < 5) {
            return res.status(400).send({
                success: false,
                message: "Título del vídeo demasiado corto"
            })
        }


        if (!titleVideo) {
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

        // // if (file.size > 4000 * 3000) {
        // //     removeTmp(file.tempFilePath)
        // //     return res.status(400).json({
        // //         msg: 'Size too large'
        // //     })
        // // }

        // // if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
        // //     removeTmp(file.tempFilePath)

        // //     return res.status(400).json({
        // //         msg: "File format is incorrect."
        // //     })
        // // }

        // const newFile = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        //     folder: "Vídeos"
        // })
        // removeTmp(file.tempFilePath);

      
        // var videoFile = req.files.videoFile
        // console.log(videoFile)
        // // cloudinary.uploader.upload(videoFile,
        // //                 function(result) {console.log(result); },
        // //                 { resource_type: "video" });

        // cloudinary.v2.uploader.upload_large(videoFile, 
        // { resource_type: "video" },
        // function(error, result) {console.log(result, error); });
        


        let video = new Video({ // viene del modelo user
            titleVideo,
            description,
            date,
            category: categoryId,
            user: req.user.id
        })

        await video.save()
        return res.status(200).send({
            success: true,
            video
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }

})

VideoRouter.put("/updatevideo/:id", auth, authAdmin, async (req, res) => {
    const {
        id
    } = req.params
    const {
        titleVideo,
        description,
        categoryId
    } = req.body
    try {


        if (titleVideo.length < 5) {
            return res.status(400).send({
                success: false,
                message: "Título del artículo demasiado corto"
            })
        }

        if (!titleVideo) {
            return res.status(400).send({
                success: false,
                message: "No has completado todos los campos"
            })
        }

        await Video.findByIdAndUpdate(id, {
            titleVideo,
            description,
            category: categoryId,
        })

        return res.status(200).send({
            success: true,
            message: "Video Modificado"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})


VideoRouter.delete("/deletevideo/:id", auth, authAdmin, async (req, res) => {
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
        //         message: "No se han seleccionado vídeos",
        //     });
        //  }

        await Video.findByIdAndDelete(id)
        // cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
        //     if (err) throw err;
        // });

        res.json({
            success: true,
            message: "Video eliminado correctamente",
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
VideoRouter.post("/videolikes/:videoId", auth, async (req, res) => {
    const {videoId } = req.params;
    const {id} = req.user
    try {
        let findvideo = await Video.findById(videoId)
        // if (!findvideo) {
        //     return res.status(400).send({
        //         success: false,
        //         message: "This Video does not exist"
        //     })
        // }

        let findUser = await findvideo.likes.find(user => user._id.equals(id))
        console.log(id)
        if(findUser){
            await Video.findByIdAndUpdate(videoId, { $pull: { likes: id} });
    
            return res.status(200).send({ 
                success: false,
                message: "Ya le has dado like a este blog"
            })
        }else {
            await Video.findByIdAndUpdate(videoId, { $push: { likes: id} });
            return res.status(200).send({ 
                success: true,
                message: "Has dado like a este blog"
            })
        }


    //   switch (action) {
    //     case "like":
    //       await Video.findByIdAndUpdate(VideoId, { $push: { likes: id} });
    //       break;

    //     case "dislike":
    //       await Video.findByIdAndUpdate(VideoId, { $pull: { likes: id} });
    //       break;

    //     default:
    //       break;
    //   }

    } catch (error) {
        return res.status(500).send({
            succes: false,
            message: error.message
        })
    }
  })

module.exports = VideoRouter