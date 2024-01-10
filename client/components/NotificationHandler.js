import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios';
import io from 'socket.io-client';
import { getUser } from '@/actions/homeApi';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const NotificationHandler = (props) => {

    const [friendRequestAction, setFriendRequestAction] = useState("")

    const key = localStorage.getItem('jwt')

    async function acceptRequest (event){
        // console.log(event.target.id)
        
        const friendRequest = await axios.post(`${process.env.URL}/api/user/profile/followresponse/?status=1&senderid=${props.senderId}&notificationid=${props.notificationId}`,{},{
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                "Authorization": key
              }
        })

        setFriendRequestAction("Follow Request Accepted")
        const userDetails = await getUser(key)
        
        const socket = io.connect(`${process.env.URL}`)
        // console.log(event.target.name)
        socket.emit('join_room', {
            userId: props.senderId
        })

        const notification = {
            to: props.senderId,
            from: userDetails.data.user._id,
            senderId: userDetails.data.user._id,
            message: "friendrequestaccepted",
            type: "notification"
        }

        console.log(notification)
        socket.emit('notify_user', notification)
    }

    async function rejectRequest (event){
        // console.log(event.target.id)

        const followRequestRejected = await axios.post(`${process.env.URL}/api/user/profile/followresponse/?status=0&senderid=${props.senderId}&notificationid=${props.notificationId}`,{},{
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                "Authorization": key
              }
        })

        setFriendRequestAction("Follow Request Cancelled")
    }

  return (
    <div className="grid grid-rows-2 pl-2 pr-2">
      <div className='flex justify-start content-center grid grid-cols-3 '>
        <Avatar className="m-2">
          <AvatarImage src={props.profilepic} />
          <AvatarFallback>FB</AvatarFallback>
        </Avatar>
        <div className='col-span-2 flex flex-col'>
        <label className='mt-2 text-base font-extralight'>{props.senderName}</label>
        <small className='text-xs text-stone-400 thin'>@{props.username}</small>
        </div>
      </div>
        
      <div className='grid grid-rows-2'>
        
        <h3>{props.content}</h3>
        {props.notificationType == "friendrequest" ? (
          <>
            {!friendRequestAction ? (
              <div className='flex gap-4'>
                <button
                  id={props.senderId}
                  style={{ color: "green" }}
                  onClick={acceptRequest}
                  className='hover:underline'
                >
                  Accept
                </button>
                <button
                  id={props.senderId}
                  style={{ color: "red" }}
                  onClick={rejectRequest}
                  className='hover:underline'
                >
                  Reject
                </button>
              </div>
            ) : (
              <h1>{friendRequestAction}</h1>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default NotificationHandler






{/* <div className='gird'>
<Avatar>
      <AvatarImage src={props.profilepic} />
      <AvatarFallback>FB</AvatarFallback>
</Avatar>
<label>{props.senderName}</label>
<small>{props.username}</small>
<h3>{props.content}</h3>
{props.notificationType == "friendrequest" ? (
<>
{!friendRequestAction ?
    <>
         <button id={props.senderId} style={{color: "green"}} onClick={acceptRequest}>Accept</button>
        <button id={props.senderId} style={{color: "red"}} onClick={rejectRequest}>Reject</button>
    </>
:
    <h1>{friendRequestAction}</h1>
}
 
</>
) : null}
</div> */}