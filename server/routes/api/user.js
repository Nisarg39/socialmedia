const express = require('express');
const router = express.Router();
const userController = require("../../controllers/apiController/userController")
const passport = require('passport')



router.get("/",passport.authenticate('jwt', {session: false}), userController.userDetails);

router.post("/signup", userController.signUp)

router.post("/signin", userController.signin)

router.get("/messages", passport.authenticate('jwt', {session: false}), userController.messages)


// practise for jwt authentication
router.get("/protected",passport.authenticate('jwt', {session: false}), (req,res) => {
    console.log(req.user)
    return res.status(200).json({
        success: true,
        user: req.user._id
    })
})

router.use("/profile",require('./profile'))

module.exports = router;