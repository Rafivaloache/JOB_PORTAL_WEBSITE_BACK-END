import multer from "multer";
import path from "path"

// uploading profile pic
const uploadImageProfile_pic = multer.diskStorage({

        
        destination:function(req,file, cb){
        cb(null, "./uploads/profile")
       
    },
    filename:function(req,file, cb){
        const uniqueName = Date.now() + path.extname(file.originalname)
        cb(null, uniqueName)
    }
})

// uploading cover pic
const uploadImageCover_pic = multer.diskStorage(
     
    {

    destination:function(req,file, cb){
        cb(null, "./uploads/cover")
       
    },
    filename:function(req,file, cb){
        const uniqueName = Date.now() + path.extname(file.originalname)
        cb(null, uniqueName)
    }
})





export const upload = multer({storage: uploadImageProfile_pic})
export const uploadCover = multer({storage: uploadImageCover_pic})