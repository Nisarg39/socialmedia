const multer = require('multer')

// profilepic storage
const profilepicStorage = multer.diskStorage({
    destination: function(req, file, cb){
        // console.log(file)
        cb(null, 'public/uploads/profilepic/')
    },
    filename: function (req,file, cb) {
        const uniqueSuffix = Date.now() + "-" + file.originalname;
        cb(null, uniqueSuffix)
    }
})

const uploadProfile = multer({storage: profilepicStorage})

module.exports = uploadProfile;