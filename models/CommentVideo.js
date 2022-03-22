const mongoose = require("mongoose")

const CommentVideoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User" //viene del modelo User.js model (-- se pone este: User , UserSchema)
    },
    commentTextVideo: {
        type: String,
        required: true
    },
    video: {
        type: mongoose.Types.ObjectId,
        ref: "Video"
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





module.exports = mongoose.model("CommentVideo", CommentVideoSchema)