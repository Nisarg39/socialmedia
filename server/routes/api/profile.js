const express = require('express')
const router  = express.Router();
const uploadProfile = require('../../config/multer_2');
const uploadPost = require('../../config/multer')
const passport = require('passport')

const profileController = require('../../controllers/apiController/profileController');
const userController = require('../../controllers/apiController/userController')

router.get('/', passport.authenticate("jwt", {session: false}), userController.profileDetails)

router.post('/uploadpic', uploadProfile.single('profilepic'),passport.authenticate("jwt", {session: false}), profileController.uploadProfilePic)

router.post('/uploadpost', passport.authenticate("jwt", {session: false}),uploadPost.array('postpics', 10) ,profileController.writePost)

router.get('/getWall', passport.authenticate("jwt", {session: false}), profileController.getWall)

router.get('/searchuser',passport.authenticate("jwt", {session: false}), profileController.searchUser)

router.get('/shownotifications', passport.authenticate("jwt", {session: false}), profileController.showNotifications)

router.post('/followresponse', passport.authenticate("jwt", {session: false}), profileController.followresponse)




// router.post('/checkfile',passport.authenticate("jwt", {session: false}), uploadPost.array('postpics', 10), (req,res) => {
    // console.log(req.body.name)
    // console.log(req.user)    // from passport
    // console.log(req.file)    // for single file from multer
    // console.log(req.files)   // for multiple files from multer
    
    // return res.status(200)
// })

module.exports = router;