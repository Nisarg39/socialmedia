const { populate } = require('../../models/post')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')

module.exports.userDetails = async function(req, res){
    // console.log(req.body)
    // console.log(req.user)    // details come from jwt middleware where we pass data in done function which passes user details here

    const userData = await User.findById(req.user._id)
    .populate({path: "feed", populate: { path: 'postedBy'}})
    .populate("followedList")

    return res.status(200).json({
        message: "UserDetails",
        name: req.user.name,
        user: userData
    })

}   


module.exports.signUp = async function(req,res){
    // console.log(req.body)
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        })
        
    } catch (error) {
        if(error.code == 11000){
            return res.status(200).json({
                message: "username already exists please try a different username"
            })
        }else{
        return res.status(409).json({
            message: "there was a problem in server , cannot store user information",
            error: error
        })
        }
    }
    
        return res.status(200).json({
            message: "User created successfully, redirect to login"
        })

}

module.exports.signin = async function(req, res){
    console.log(req.body)
    // console.log("user connected")
    const userData = await User.findOne({username: req.body.username, password: req.body.password})
    console.log(userData)
    if(userData){
        const payload = {
            userid: userData._id
        }
    
        const token = jwt.sign(payload, "secretkey", {expiresIn: "30d"})

        return res.status(200).json({
            success: true,
            message: `Welcome ${userData.name}`,
            token: `Bearer ${token}`
        })
    }else{
        return res.status(401).json({
            success: false,
            message: "Username or password Incorrect"
        })
    }
}

module.exports.profileDetails = async function (req,res){
    // console.log("profile" + req.user.name)
    const user = await User.findOne(req.user).populate('wall').exec()
    // console.log(user)
    return res.status(200).json({
        message: "success",
        name: req.user.name,
        wallPosts: user.wall
    })
}

module.exports.messages = async function (req,res){
    // console.log("profile" + req.user.name)

    return res.status(200).json({
        message: "success",
        data: req.user
    })
}