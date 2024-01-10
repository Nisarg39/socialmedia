import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import NotificationHandler from './NotificationHandler'

const Notifications = (props) => {
  // console.log(props)
  const key = localStorage.getItem('jwt')
  const [notificationsList, setNotificationsList] = useState([])
  

  useEffect(() => {
    async function fetchNotifications(){
      const fetchNotifications = await axios.get(`${process.env.URL}/api/user/profile/showNotifications`,{
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "Authorization": key
        }
      })
      
      // appending url for profilepic
      fetchNotifications.data.notifications.forEach((noti) => {
        noti.profilepic = `${process.env.URL}/${noti.profilepic}`
      })
      
      setNotificationsList(fetchNotifications.data.notifications)
    }
    fetchNotifications()
  },[])


  return (
    <>
    {notificationsList.length <= 0 ?
      <h1>No Notification </h1>
       : 
      <>
      {notificationsList.map((noti) => (
        <NotificationHandler
          key={noti.notificationId}
          profilepic={noti.profilepic}
          senderName={noti.senderName}
          username={noti.username}
          content={noti.content}
          notificationType={noti.notificationType}
          senderId={noti.senderId}
          notificationId={noti.notificationId}
        />
      ))}
      </>
    }
  </>
  );
}

export default Notifications