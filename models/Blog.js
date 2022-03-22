const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({
    titleNew: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: Object,
    },
    date: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    commentNew: [ // lo agrupamos en una array con todos los comentarios
        {
            type: mongoose.Types.ObjectId,
            ref: "CommentBlog"
        }
    ],
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }

    ]
}, {
    timestamps: true
})





module.exports = mongoose.model("Blog", BlogSchema)