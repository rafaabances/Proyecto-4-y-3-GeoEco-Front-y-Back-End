const express = require("express")
const CommentVideo = require("../models/CommentVideo");
const CommentVideoRouter = express.Router();
const Video = require("../models/Video");
const auth = require("../middleware/auth") // esto para que el newarticle solo lo pueda hacer alguien que esté logueado
const User = require("../models/User");

CommentVideoRouter.get("/commentsvideo", auth, async (req, res) => {
    let Comments = await CommentVideo.find({}) // Se hace con find ( find viene de mongoose) para buscar dentro de la colección, así devuelve todos los objetos que hay en Author
    try {

        return res.status(200).send({
            success: true,
            Comments
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }

})

// CommentRouter.get("/findcomment/:id", async (req, res) => {
//     const {
//         id
//     } = req.params
//     try {
//         let comment = await Comment.findById(id).populate("user") // propiedad en comment,js, la de  user está en minúsculas

//         //errores antes de la respuesta final

//         if (!comment) {
//             res.status(400).send({
//                 success: false,
//                 message: error.message
//             })
//         }

//         res.status(200).send({
//             success: true,
//             message: "Comentario encontrado",
//             comment
//         })

//         // res.status(200).json({ // también se puede poner con json
//         //     success: true,
//         //     message: "Autor encontrado",
//         //     author
//         // })

//     } catch (error) {
//         res.status(500).send({
//             success: false,
//             message: error.message
//         })
//     }
// })

CommentVideoRouter.get("/commentvideo/:id", auth, async (req, res) => { // auth?
    const {
        id
    } = req.params;
    // const id = req.body;
    let comments = await CommentVideo.findById(id).populate({
        path: 'likes',
        select: 'name'
    })

    let userId = comments.userId;
    // console.log(comments.userId);

    const userInfo = await User.findById(userId, "name");
    return res.json({
        success: true,
        comments,
        userInfo,
    });
});

CommentVideoRouter.post("/newcommentvideo/:videoId", auth, async (req, res) => {
    const id = req.user.id;
    const {
        comment
    } = req.body;
    const {
        videoId
    } = req.params // ha de ir entre corchetes ya que le pasamos un objeto.

    let comentario = new CommentVideo({
        userId: id,
        commentTextVideo: comment,
        video: videoId,
    });

    let newComment = await comentario.save();

    await Video.findByIdAndUpdate(videoId, {
        $push: {
            commentV: newComment._id
        },
    });


    return res.status(200).send({
        success: true,
        newComment,
    });
});



// ---- donde comments del push, viene de tu modelo blog --- 


// CommentRouter.post("/newcomment", async (req, res) => {
//     const {
//       user,
//       commentText,
//       BlogId // repetir con videoId

//     } = req.body

//     let comment = new Comment({ // viene del modelo user
//        user : user,
//        commentText,

//     })


//     if (commentText.length < 2 ) {
//         return res.status(400).send({
//             success: false,
//             message: "El comentario es demasiado corto"
//         })
//     }

//     if (!commentText) {
//         return res.status(400).send({
//             success: false,
//             message: "No has escrito ningún comentario"
//         })
//     }


//     await comment.save()
//     return res.status(200).send({
//         success: true,
//         message: "Comentario creado",
//         comment
//     })
// })

CommentVideoRouter.put("/updatecommentvideo/:id", auth, async (req, res) => {
    const {
        id
    } = req.params
    const {
        commentTextVideo
    } = req.body
    try {

        await CommentVideo.findByIdAndUpdate(id, {
            commentTextVideo
        })

        if (!commentTextVideo) {
            return res.status(400).send({
                success: false,
                message: "No has escrito ningún comentario"
            })
        }


        return res.status(200).send({
            success: true,
            message: "Comentario Editado"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})


CommentVideoRouter.delete("/deletecommentvideo/:id", auth, async (req, res) => {
    const {
        id
    } = req.params
    try {
        await CommentVideo.findByIdAndDelete(id)
        return res.status(200).send({
            success: true,
            message: "Comentario eliminado"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})


CommentVideoRouter.post("/commentvideolikes", auth, async (req, res) => {
    const {CommentVideoId, action } = req.body;
    const {id} = req.user
    try {
        let findCommentVideo = await CommentVideo.findById(CommentVideoId)
        if (!findCommentVideo) {
            return res.status(400).send({
                success: false,
                message: "This CommentVideo does not exist"
            })
        }

        let findUser = await findCommentVideo.likes.find(user => user._id.equals(id))
        console.log(id)
        if(findUser){
            await CommentVideo.findByIdAndUpdate(CommentVideoId, { $pull: { likes: id} });
    
            // return res.status(400).send({ / otra manera
            //     success: false,
            //     message: "Ya le has dado like a este blog"
            // })
        }else{
            await CommentVideo.findByIdAndUpdate(CommentVideoId, { $push: { likes: id} });
        }


    //   switch (action) {
    //     case "like":
    //       await CommentVideo.findByIdAndUpdate(CommentVideoId, { $push: { likes: id} });
    //       break;

    //     case "dislike":
    //       await CommentVideo.findByIdAndUpdate(CommentVideoId, { $pull: { likes: id} });
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



module.exports = CommentVideoRouter