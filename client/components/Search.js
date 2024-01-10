'use client'
import axios from "axios";
import { useState } from "react";
import Image from "next/image";
import io from 'socket.io-client'
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

const Search = (props) => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState("")
    const [userPic, setUserPic] = useState("")
    const [userId, setUserId] = useState("")
    const [fromUser, setFromUser] = useState(props.name)
    const [senderId, setSenderId] = useState(props.id)
    const [alreadyRequested, setAlreadyRequested] = useState(false)
    const [alreadyFriend, setAlreadyFriend] = useState(false)
    const[message, setMessage] = useState(false)
    const [error, setError] = useState("")
    const key = localStorage.getItem("jwt")

    // console.log(props)
    async function searchUser(event){
        event.preventDefault();
        setError("")
        setUser(null)
        // console.log(key)
        let userStatus = await axios.get(`${process.env.URL}/api/user/profile/searchuser?username=${username}`,{
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                "Authorization": key,
            }
        })

        // console.log(userStatus.data)
    
        if(userStatus.data.message){
            setUserPic(userStatus.data.userpic)
            setUser(userStatus.data.name)
            setUserId(userStatus.data.userId)
            setAlreadyRequested(userStatus.data.alreadyRequested)
            setAlreadyFriend(userStatus.data.alreadyFriend)
            setMessage(userStatus.data.message)
            setError("")
        }else{
            setError(userStatus.data.error)
            setMessage(userStatus.data.message)
        }
        
    }
    
    async function sendRequest(event){
        const socket = io.connect(`${process.env.URL}`)
        // console.log(event.target.name)
        socket.emit('join_room', {
            userId: event.target.name
        })

        socket.emit('notify_user', {
            to: event.target.name,
            from: fromUser,
            senderId: senderId,
            message: "friendrequest",
            type: "notification"
        })
        setAlreadyRequested(true)
    }


  return (
    <div>
    <Popover>

        <form onSubmit={searchUser} className="flex gap-4 ">
        <Input
          type="text"
          placeholder="Username!!!"
          name="searchInput"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <PopoverTrigger>
            <Button type="submit" name="Search">
                Search
            </Button>
            {/* <input type='submit' name='Search' value="Search" /> */}
        </PopoverTrigger>
        
      </form>

      <PopoverContent>
      {message ? (
          <>
            <div className="grid grid-cols-3 col-span-1 flex content-center justify-items-start">
              <Avatar>
                <AvatarImage src={`${process.env.URL}/${userPic}`} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="col-span-2">
                <p className="self-center text-base font-extralight">{user}</p>
                <small className='text-xs text-stone-400 thin'>@{username}</small>
              </div>
            </div>
            
            <div>
              
              {!alreadyFriend ? (
                !alreadyRequested ? (
                  <button
                    onClick={sendRequest}
                    name={userId}
                    style={{ color: "green" }}
                  >
                    Send Request
                  </button>
                ) : (
                  <button name={userId} style={{ color: "red" }}>
                    Cancel Request
                  </button>
                )
              ) : (
                <>
                  <small style={{ color: "skyblue" }}>Following</small>
                  <button></button>
                </>
              )}
              <Button variant="destructive" className="ml-4"
                onClick={() => {
                  setMessage(false);
                }}
              >
                Close
              </Button>
            </div>
          </>
        ) : (
          <>
            <h1>{error}</h1>
          </>
        )}
      </PopoverContent>
    </Popover>
     

    </div>
  );
}

export default Search