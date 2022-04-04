// const express = require("express")
// const VideoUploadRouter = express.Router();
// require("dotenv").config();
// const fs = require("fs");
// const multer = require("multer");
// const cloudinary = require("cloudinary").v2;
// const auth = require("../middleware/auth") // esto para que el newvideo solo lo pueda hacer alguien que esté logueado
// const authAdmin = require("../middleware/authAdmin") // esto para que solo lo pueda hacer el administrador



// VideoUploadRouter.post("/upload", async (req, res) => {
//     // Get the file name and extension with multer
//     const storage = multer.diskStorage({
//       filename: (req, file, cb) => {
//         const fileExt = file.originalname.split(".").pop();
//         const filename = `${new Date().getTime()}.${fileExt}`;
//         cb(null, filename);
//       },
//     });
  
//     // Filter the file to validate if it meets the required video extension
//     const fileFilter = (req, file, cb) => {
//       if (file.mimetype === "video/mp4") {
//         cb(null, true);
//       } else {
//         cb(
//           {
//             message: "Unsupported File Format",
//           },
//           false
//         );
//       }
//     };
  
//     // Set the storage, file filter and file size with multer
//     const upload = multer({
//       storage,
//       limits: {
//         fieldNameSize: 200,
//         fileSize: 30 * 1024 * 1024,
//       },
//       fileFilter,
//     }).single("video");
  
//     upload(req, res, (err) => {
//       if (err) {
//         return res.send(err);
//       }
  
//       // SEND FILE TO CLOUDINARY
//       cloudinary.config({
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//         api_key: process.env.CLOUDINARY_API_KEY,
//         api_secret: process.env.CLOUDINARY_API_SECRET,
//       });
//       const  {path} = req.file; 
//       // file becomes available in req at this point
  
//       const fName = req.file.originalname.split(".")[0];
    
//      let newVideo =  cloudinary.uploader.upload(
//         path,
//         {
//           resource_type: "video",
//           public_id: `VideoUploads/${fName}`,
//           chunk_size: 6000000,
//           eager: [
//             {
//               width: 300,
//               height: 300,
//               crop: "pad",
//               audio_codec: "none",
//             },
//             {
//               width: 160,
//               height: 100,
//               crop: "crop",
//               gravity: "south",
//               audio_codec: "none",
//             },
//           ],
//         },
  
//         // Send cloudinary response or catch error
//         (err, video) => {
//           if (err) return res.send(err);
//           fs.unlinkSync(path);
//           return res.send(video);
        
//         }
//       );
//       // console.log(newVideo)
  
//     });
//   });


const express = require("express")
const VideoRouter2 = express.Router();
require("dotenv").config();
const fs = require("fs");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;


VideoRouter2.post("/upload", async (req, res) => {
    // Get the file name and extension with multer
    const storage = multer.diskStorage({
      filename: (req, file, cb) => {
        const fileExt = file.originalname.split(".").pop();
        const filename = `${new Date().getTime()}.${fileExt}`;
        cb(null, filename);
      },
    });
  
    // Filter the file to validate if it meets the required video extension
    const fileFilter = (req, file, cb) => {
      if (file.mimetype === "video/mp4") {
        cb(null, true);
      } else {
        cb(
          {
            message: "Unsupported File Format",
          },
          false
        );
      }
    };

    const upload = multer({
      storage,
      limits: {
        fieldNameSize: 200,
        fileSize: 30 * 1024 * 1024,
      },
      fileFilter,
    }).single("video");
  
    upload(req, res, (err) => {
      if (err) {
        return res.send(err);
      }
  
      // SEND FILE TO CLOUDINARY
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
      });
      
      const { path } = req.file; 
      // file becomes available in req at this point

 
  
      const fName = req.file.originalname.split(".")[0];
    
     let newVideo =  cloudinary.uploader.upload(
        path,
        {
          resource_type: "video",
          public_id: `VideoUploads/${fName}`,
          chunk_size: 6000000,
          eager: [
            {
              width: 300,
              height: 300,
              crop: "pad",
              audio_codec: "none",
            },
            {
              width: 160,
              height: 100,
              crop: "crop",
              gravity: "south",
              audio_codec: "none",
            },
          ],
        },
  
        // Send cloudinary response or catch error
        (err, video) => {
          if (err) return res.send(err);
          fs.unlinkSync(path);
          return res.send(video);
        
        }
      );
    //   console.log(newVideo)
  
    });
  });


module.exports = VideoRouter2





// module.exports = VideoUploadRouter