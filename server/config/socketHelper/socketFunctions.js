const Notification = require('../../models/notification')
const User = require('../../models/user')

module.exports.addNotification = async function(data){
    // console.log(data)
    let content = "";
    switch(data.message){
        case "friendrequest" : 
                            content = "Sended a Follow Request"
        break;

        case "friendrequestaccepted":
                            content = "Accepted uour Follow Request"
        break;
    }
    const generateNotification  = await Notification.create({
        to: data.to,
        from: data.senderId,
        notificationType: data.message,
        content : content
    })
    
    
    const notificationReciever = await User.findById(data.to)

    // adding in notification array
    notificationReciever.notifications.unshift(generateNotification)

    if(data.message == "friendrequest"){
        // adding in friendRequestArray
        
        notificationReciever.friendRequest.unshift(data.senderId)
    }
    
    notificationReciever.save()

}