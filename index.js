const express = require("express"); // requerimientos 
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const cors = require("cors");

const path = require("path")

const PayRouter = require("./api/PayRouter");
const UserRouter = require("./api/UserRouter");
const CommentBlogRouter = require("./api/CommentBlogRouter");
const CommentVideoRouter = require("./api/CommentVideoRouter");
const VideoRouter = require("./api/VideoRouter");
const VideoRouter2 = require("./api/VideoUploadRouter");
const BlogRouter = require("./api/BlogRouter");
const CategoryRouter = require("./api/CategoryRouter");
const fileUpload = require("express-fileupload") // subir archivos cloudinary


const fs = require("fs") // se usa para tenener base de datos en Local,

app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))
app.use(fileUpload({ // subir archivos al cloudinary
    useTempFiles: true
}))

app.use(cors())
app.use("/api", PayRouter)
app.use("/api", UserRouter)
app.use("/api", CommentBlogRouter)
app.use("/api", CommentVideoRouter)
app.use("/api", VideoRouter)
app.use("/api", BlogRouter)
app.use("/api", CategoryRouter)
app.use("/api", VideoRouter2)







const URL = process.env.MONGODB_URL
console.log(URL) // la puedes comentar

mongoose.connect(URL, {
    // UseCreateIndex: true // se ponía antes para crear un índice, ahora lo crea automaticamente
}).then(() => {
    console.log("BD IS CONNECTED")
}).catch(error => { // se puede poner un catch en la base de datos
    console.log(error)
})



if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build')) // este es el servidor de heroku
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')) //y manda el indexedDB.htm
    })
}





const PORT = process.env.PORT || 5000 //si no está el puerto declarado que me vaya al 5000
app.listen(PORT, () => {
    console.log(`Servidor a la escucha del puerto ${PORT}`)
})



// app.listen(5000, () =>{ // Const Port es lo mismo que esto.
//     console.log("Server is running on port 5000") 
// })