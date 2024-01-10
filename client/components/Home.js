"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Feed from "./Feed";
import Stories from "./Stories";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { getUser } from "@/actions/homeApi";
import { WritePost } from "./WritePost";
import io from "socket.io-client"
import FollowingList from "./FriendsList";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "./ui/dialog"


export default function Home () {
    
    const [data, newData] = useState("Loading");
    const [name, setName] = useState("")
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [feedPost, setFeedPost] = useState([])
    const [userId, setUserId] = useState("")
    const [followingList, setFollowingList] = useState([])
    const router = useRouter();

    const socket = io.connect(`${process.env.URL}`)

    useEffect(() => {
        async function getUserDetails(){

            const key = localStorage.getItem("jwt")
            if(!key){
                setAuthenticated(false)
                return
            }else{

                const fetchUserData = await getUser(key)
                // console.log(fetchUserData)
                setName(fetchUserData.data.user.name)
                setAuthenticated(fetchUserData.isAuthenticated)
                setFeedPost(fetchUserData.data.user.feed)
                setFollowingList(fetchUserData.data.user.followedList)
                socket.on("connect", () => {
                    // console.log(socket.id); // x8WIv7-mJelg7on_ALbx
                    // setSocketId(socket.id)
                });
            
                socket.emit('join_room', {
                    // userId: data.data.user.id
                })
            
                socket.on("notification", function(data){
                    console.log("inside navbar socket data - ", data)
                    setNotificationCount(notificationCount + 1)
                })

            }
            
        }
        
        getUserDetails()

    }, [])

  return (
    <div>
      <div
        className="container flex justify-center p-0"
        style={{ minWidth: "100%", minHeight: "100%", maxHeight: "89vh" }}
      >
        {isAuthenticated ? (
          <>
            {/* <span className="basis-1/4">
            <Stories />
          </span> */}

            <span className="basis-6/12 overflow-y-auto flex flex-col space-y-4 items-center scroll-smooth no-scrollbar overscroll-none">
              <WritePost />
              {feedPost.length != 0 ? 
              <>  
                {feedPost.map((post) => (
                <Feed post={post} />
                ))}
              </>
              
              :
                <p>Your feed is empty .Follow the people you know to get some content</p>
              }
            </span>

            {/* <span className="basis-1/4 ">
              <FollowingList followingList={followingList} />
            </span> */}
          </>
        ) : (
          <>
              <span className="basis-6/12 flex place-items-center justify-end bg-black">
                <Image src="/hero.png" height={500} width={500} />
              </span>
              <span className="basis-6/12 flex place-items-center justify-center bg-black">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mr-8">SIGN IN</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[380px] p-4 bg-black">
                    <SignIn />
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">SIGN UP</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[380px] p-4 bg-black">
                    <SignUp />
                  </DialogContent>
                </Dialog>
              </span>
          
          </>
        )}
      </div>
    </div>
  );
}
