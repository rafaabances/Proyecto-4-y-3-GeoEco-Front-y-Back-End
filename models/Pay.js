const mongoose = require("mongoose")

const PaySchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    address: {
        type: String,
        required: true
    },
    paymentId: {
        type: Number,
        required: true
    },
    membership: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


//   const { Schema } = mongoose; // otra manera de hacer un Schema

//   const blogSchema = new Schema({
//     title:  String, // String is shorthand for {type: String}
//     author: String,
//     body:   String,
//     comments: [{ body: String, date: Date }],
//     date: { type: Date, default: Date.now },
//     hidden: Boolean,
//     meta: {
//       votes: Number,
//       favs:  Number
//     }
//   });





module.exports = mongoose.model("Pay", PaySchema)