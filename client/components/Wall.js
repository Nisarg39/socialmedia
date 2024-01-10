'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const Wall = () => {
    const [posts, setPosts] = useState([])
    let wallArray = []
    useEffect(() => {
        const key = localStorage.getItem("jwt")

        async function fetchWall(){
            const fetchedUser = await axios.get(`http://localhost:8000/api/user/profile/`,{
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    "Authorization": key
                }
            })
            wallArray = fetchedUser.data.wallPosts
            setPosts([...wallArray])
            return wallArray
        }
        fetchWall()
    },[])
  return (
    <div>
        <h1>Wall</h1>
        {posts.map((ele) => (
            <>
                <h1 key={ele._id} >{ele.captions}</h1>
                {ele.mediaLinks.map((links) => (
                    <Image key= {links} src={`${process.env.URL}/${links}`} height={200} width={200} alt='postimage'/>
                ))}
            </>   
        ))}
    </div>

  )
}

export default Wall