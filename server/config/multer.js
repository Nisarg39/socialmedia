const multer = require('multer')

// post storage 

const postStorage = multer.diskStorage({
    destination: function(req, file, cb){
        // console.log(file)
        cb(null, 'public/uploads/posts/')
    },
    filename: function (req,file, cb) {
        const uniqueSuffix = Date.now() + "-" + file.originalname;
        cb(null, uniqueSuffix)
    }
})

const uploadPost = multer({storage: postStorage})

module.exports = uploadPost
