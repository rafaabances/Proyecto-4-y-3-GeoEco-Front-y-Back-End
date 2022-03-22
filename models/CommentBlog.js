const mongoose = require("mongoose")

const CommentBlogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User" //viene del modelo User.js model (-- se pone este: User , UserSchema)
    },
    commentTextBlog: {
        type: String,
        required: true
    },
    blog: {
        type: mongoose.Types.ObjectId,
        ref: "Blog"
    },
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }

    ]
}, {
    timestamps: true
})





module.exports = mongoose.model("CommentBlog", CommentBlogSchema)