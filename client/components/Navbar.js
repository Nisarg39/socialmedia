"use client"
import { navbar } from '@/constants'
import Link from 'next/link'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { getUser } from '@/actions/homeApi'
import Image from 'next/image'
import Search from './Search'
import io from "socket.io-client"
import Notifications from './Notifications'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"


const Navbar = () => {
    const [userDetails, newUserDetails] = useState();
    const [profileURL, setProfileUrl] = useState("");
    const [notificationCount, setNotificationCount] = useState(0)
    const [senderName, setSenderName] = useState("")
    const [showNotification, setShowNotification] = useState(false)

    useEffect (() => {
        const socket = io.connect(`${process.env.URL}`)
        const key = localStorage.getItem("jwt")

        async function getUserData(){
            const getDetails = await getUser(key)
            // console.log(getDetails.data.user.id)
            const pic = `${process.env.URL}/${getDetails.data.user.profilepic}`
            setProfileUrl(pic)
            // console.log(pic)
            newUserDetails(getDetails.data)
            return getDetails
        }
        if(key){
            getUserData().then((data) => {{
                // console.log(data.data.user._id)
                socket.on("connect", () => {
                    // console.log(socket.id); // x8WIv7-mJelg7on_ALbx
                    setSocketId(socket.id)
                  });
        
                  socket.emit('join_room', {
                    userId: data.data.user.id
                    })
            }})
        }

        socket.on("notification", function(data){
            // console.log("inside navbar socket data - ", data)
            setSenderName(data.name)
            setNotificationCount(notificationCount + 1)
        })

    }, [notificationCount])
  return (
    <>
      {userDetails ? (
        <div className="flex grid grid-cols-8 p-4 ">


          <div className="col-span-2">
            <Link key="home" href="/" onClick={() => {setShowNotification(false)}}>
                <Image src="/hero.png" width={100} height={50} sizes="(max-width: 768px) 100vw, 33vw" style={{objectFit: "contain"}}/>
            </Link>
          </div>

          <div className="flex col-span-4 gap-2 pt-2 justify-center">
          <Avatar>
              <AvatarImage src={profileURL} />
              <AvatarFallback>{userDetails.name}</AvatarFallback>
            </Avatar>

            <h1 className='pt-2 text-base font-extralight'>{userDetails.name}</h1>

            <div className='flex pl-40 pt-1'>
            
             <div>
             <Popover>
                <PopoverTrigger>
                    <img src='https://img.icons8.com/ios-filled/500/FFFFFF/google-alerts.png' 
                        className='shadow-xl hover:shadow-slate-200 rounded-full' 
                        style={{width: "30px"}}
                        onClick={() => {setNotificationCount(0); setShowNotification(true)}}
                    />
                    {notificationCount > 0 ?
                            // red dot for notification
                            <span class="relative flex h-3 w-3">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                        // <p className=''>{notificationCount}</p>
                    :
                        null
                    }
                    
                </PopoverTrigger>
                <PopoverContent className="flex">
                {showNotification ? (
                <div className='w-full'>
                  <Notifications
                    notificationCount={notificationCount}
                    senderName={senderName}
                  />
                </div>
              ) : 
                   null     
              }
                </PopoverContent>
            </Popover>
            </div>

              
            </div>

            {navbar.map((value) => {
              return (
                <div key={value.name} className='pt-1 ml-6 '>
                  <Link
                    key={value.name}
                    href={value.path}
                    onClick={() => {
                      setShowNotification(false);
                    }}
                  >
                    <img src={value.imageUrl} className='shadow-xl hover:shadow-slate-200 rounded-full' style={{width: "32px"}}/>
                    {/* {value.name} */}
                  </Link>
                </div>
              );
            })}
          </div>


          <div className="pt-2 col-span-2 flex justify-center">
            <Search 
                name= {userDetails.name}
                id = {userDetails.user.id}
            />
          </div>


        </div>
      ) : null}
    </>
  );
}

export default Navbar




{/* <div className='flex justify-center'>
       
        
{userDetails ? 
<>
<Link key="home" href="/" onClick={() => {setShowNotification(false)}}>
    <Image src="/hero.png" width={100} height={50} style={{height: "auto", width: "auto"}}/>
</Link>
<Search 
    name= {userDetails.name}
    id = {userDetails.user.id}
/>

{userDetails.name}

<Avatar>
    <AvatarImage src={profileURL} />
    <AvatarFallback>CN</AvatarFallback>
</Avatar>


<div>
    <h1 onClick={() => {setShowNotification(!showNotification), setNotificationCount(0)}}>Notifications {notificationCount}</h1>

    {showNotification ? 
    <div>
        <Notifications 
        notificationCount = {notificationCount}
        senderName = {senderName}
        />
    </div>
    :
        null
    }
</div>



{navbar.map((value) => {
    return(
        <div key={value.name}>
            <Link key= {value.name} href={value.path} onClick={() => {setShowNotification(false)}}> {value.name}</Link>
        </div>
    )   
})}

</> 
: null}

</div> */}