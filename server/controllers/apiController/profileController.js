const Post = require('../../models/post');
const User = require('../../models/user');
const Notification = require('../../models/notification');


const fs = require('fs').promises;

module.exports.uploadProfilePic = async function (req,res) {
    // console.log(req.file)       // file is the name of variable that holds images details which is passed by multer middleware
    const picDetails = req.user;

    if(picDetails.profilepic == ""){
        picDetails.profilepic = req.file.path
    }else{
        async function deleteFile(filePath) {
            try {
              await fs.unlink(filePath);
            //   console.log(`File ${filePath} has been deleted.`);
            } catch (err) {
              console.error(err);
            }
          }
          
        deleteFile(picDetails.profilepic)
        picDetails.profilepic = req.file.path
    }
    picDetails.save()
    return res.status(200).json({
        message: "uploaded successfully"
    })
}

module.exports.writePost = async function (req, res){
    // console.log(req.files)
    const files = req.files;
    let fileLinks = []
    files.forEach(element => {
        fileLinks.push(element.path)
    });
    
    const post = await Post.create({
        mediaLinks: fileLinks,
        captions: req.body.captions,
        postedBy: req.user._id
    })

    const userModal = await req.user.populate({path: 'followers'});

    userModal.wall.unshift(post._id)    // to append post at start of the wall array

    userModal.feed.unshift(post._id)    // to append post at start of feed array which user will see in homepage

   userModal.followers.forEach((follower) => {
        follower.feed.unshift(post._id)
        follower.save()
   })

    userModal.save();

    // console.log(userModal.wall)

    return res.status(200).json({
        message: "success",
        post: post
    })
}


module.exports.getWall = async function(req,res){
    // console.log(req.query)
    const user = await User.findOne({_id: req.query.id}).populate('wall')

    // console.log(user.wall)

    return res.status(200).json({
        posts: user.wall
    })
}


module.exports.searchUser= async function(req,res){
//    console.log(req.query)
    const isUsername = await User.findOne({username: req.query.username})
    if(!isUsername){
        res.status(200).json({
            message: false,
            error: "No user Found"
        })
    }else{
        if(isUsername.id == req.user.id){
            res.status(200).json({
                message: false,
                error: "you searched yourself"
            })
        }
        else{
            if(isUsername){
                const friendRequestList = isUsername.friendRequest
                let isFriend = false
                let isRequested = false

                //check if searched user is already been followed
                isUsername.followers.forEach((friend) => {
                    if(friend == req.user.id){
                        isFriend = true
                        isRequested = true
                    }
                })
               
                if(isRequested && isFriend){
                    res.status(200).json({
                        message: true,
                        userpic: isUsername.profilepic,
                        name: isUsername.name,
                        userId: isUsername._id,
                        alreadyRequested: isRequested,
                        alreadyFriend: isFriend
                    })
                }
                else{
                    if(friendRequestList.includes(req.user.id)){
                        isRequested= true,
                        alreadyFriend= false
                        res.status(200).json({
                            message: true,
                            userpic: isUsername.profilepic,
                            name: isUsername.name,
                            userId: isUsername._id,
                            alreadyRequested: isRequested,
                            alreadyFriend: isFriend
                        })
                   
                    }else{
                    res.status(200).json({
                        message: true,
                        userpic: isUsername.profilepic,
                        name: isUsername.name,
                        userId: isUsername._id,
                        alreadyRequested: false,
                        alreadyFriend: false
                    })
                    }
                }
                
            }
        }
    }
    
}


module.exports.showNotifications = async function(req, res){
    // console.log(req.user)
    let user = await req.user.populate({path: 'notifications'})
    let notificationsArray = []

    notificationsArray.push(user.notifications)

    let notificationsList = user.notifications.map((val) => {
        return val
    })

    // watch the video reference.txt file and the link of how to use async inside map function
    let senderInfo = await Promise.all(notificationsList.map(async (val) => {
        return await User.findById(val.from)
    }))

    let sendNotification = []
    

    // traversing notificationList and senderInfo and merging them both in notificationDetails Object then passing it to sendNotification Array
    for (notification in notificationsList){
        // console.log(senderInfo[notification])
        let notificationDetails = {}
        notificationDetails.notificationId = notificationsList[notification]._id
        notificationDetails.senderName = senderInfo[notification].name
        notificationDetails.senderId = senderInfo[notification]._id
        notificationDetails.username = senderInfo[notification].username
        notificationDetails.notificationType = notificationsList[notification].notificationType
        notificationDetails.content = notificationsList[notification].content

        if(!senderInfo[notification].profilepic){
            notificationDetails.profilepic = ""
        }else{
            notificationDetails.profilepic = senderInfo[notification].profilepic
        }

        sendNotification.push(notificationDetails)
    }
    
    res.status(200).json({
        notifications : sendNotification,
    })
}


module.exports.followresponse = async function(req,res){
    // console.log(req.query)

    // if status == 1 then request is accepted 
    if(req.query.status == 1){
        const user = req.user
        const sender = await User.findById(req.query.senderid)
        user.followers.push(sender)
        sender.followedList.push(req.user)
        // pushing in notification is done by socket handler

        // removing request notification 

        let removeNotification = user.notifications.filter((notification) => {

            return notification.id == req.query.notificationid
       })

        // remove from user's friendrequest

       let removedRequestList = user.friendRequest.filter((friend) => {
            
            return friend._id == sender._id
       })


        user.notifications = removeNotification
        user.friendRequest = removedRequestList

        user.save()
        sender.save()
    }else{

        // removing friendRequest if 0 is passed
        const user = req.user

        let removeNotification = user.notifications.filter((notification) => {

            return notification.id == req.query.notificationid
       })

        // remove from user's friendrequest

       let removedRequestList = user.friendRequest.filter((friend) => {
            
            return friend.id == req.query.senderid
       })


        user.notifications = removeNotification
        user.friendRequest = removedRequestList

        user.save()
    }


    res.status(200).json({
        message: true
    })
}