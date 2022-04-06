const express = require("express")
const CommentBlog = require("../models/CommentBlog");
const CommentBlogRouter = express.Router();
const Blog = require("../models/Blog");
const auth = require("../middleware/auth") // esto para que el newarticle solo lo pueda hacer alguien que esté logueado
const User = require("../models/User");

CommentBlogRouter.get("/commentsblog", auth, async (req, res) => {
    let Comments = await CommentBlog.find({}) // Se hace con find ( find viene de mongoose) para buscar dentro de la colección, así devuelve todos los objetos que hay en Author
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

CommentBlogRouter.get("/commentblog/:id", auth, async (req, res) => { // auth?
    const {
        id
    } = req.params;
    // const id = req.body;
    let comments = await CommentBlog.findById(id).populate({
        path: 'likes',
        select: 'name'
    })

    let userId = comments.userId;
    // console.log(comments.userId);

    const userInfo = await User.findById(userId, "name").populate("likes")
    return res.json({
        success: true,
        comments,
    });
});

// CommentBlogRouter.post("/newcommentblog/:blogId", auth, async (req, res) => {
//     const userId = req.user.id;
//     const {commentTextBlog } = req.body;

//     const blogId = req.params;

//     let comentario = new CommentBlog({
//       userId,
//       commentTextBlog,
//       blog: blogId,
//     });

//     let newcommentBlog = await comentario.save();

//     await Blog.findByIdAndUpdate(blogId, {
//       $push: {commentNew: newcommentBlog._id },
//     });

//     return res.status(200).send({
//       success: true,
//       commentTextBlog: newcommentBlog
//     });
//   });



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

CommentBlogRouter.post("/newcommentblog/:blogId", auth, async (req, res) => {
    const userId = req.user.id; // del middleware del token
    const {
        comment
    } = req.body;
    const {
        blogId
    } = req.params // pasamos por params el id del blog donde haremos el comentario // ha de ir entre corchetes ya que le pasamos un objeto.

    let comentario = new CommentBlog({
        userId,
        commentTextBlog: comment,
        blog: blogId,
    });

    let newcommentBlog = await comentario.save();

    await Blog.findByIdAndUpdate(blogId, { // con el id del blog, lo encontramos y le hacemos el push del nuevo comentario
        $push: {
            commentNew: newcommentBlog._id
        },
    });

    return res.status(200).send({
        success: true,
        commentTextBlog: newcommentBlog
    });
});

CommentBlogRouter.put("/updatecommentblog/:id", auth, async (req, res) => { // modificar para coger el token.
    const {
        id
    } = req.params
    const {
        commentTextBlog
    } = req.body
    try {

        await CommentBlog.findByIdAndUpdate(id, {
            commentTextBlog
        })

        if (!commentTextBlog) {
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


CommentBlogRouter.delete("/deletecommentblog/:id", auth, async (req, res) => {
    const {
        id
    } = req.params
    try {
        await CommentBlog.findByIdAndDelete(id)
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

CommentBlogRouter.post("/commentbloglikes", auth, async (req, res) => {
    const {CommentBlogId, action } = req.body;
    const {id} = req.user
    try {
        let findCommentBlog = await CommentBlog.findById(CommentBlogId)
        if (!findCommentBlog) {
            return res.status(400).send({
                success: false,
                message: "This CommentBlog does not exist"
            })
        }

        let findUser = await findCommentBlog.likes.find(user => user._id.equals(id))
        console.log(id)
        if(findUser){
            await CommentBlog.findByIdAndUpdate(CommentBlogId, { $pull: { likes: id} });
    
            // return res.status(400).send({ / otra manera
            //     success: false,
            //     message: "Ya le has dado like a este blog"
            // })
        }else{
            await CommentBlog.findByIdAndUpdate(CommentBlogId, { $push: { likes: id} });
        }


    //   switch (action) {
    //     case "like":
    //       await CommentBlog.findByIdAndUpdate(CommentBlogId, { $push: { likes: id} });
    //       break;

    //     case "dislike":
    //       await CommentBlog.findByIdAndUpdate(CommentBlogId, { $pull: { likes: id} });
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



module.exports = CommentBlogRouter