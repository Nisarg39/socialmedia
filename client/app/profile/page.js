'use client'
import Verification from '@/components/Verification'
import React, { useEffect, useState } from 'react'
import { getUser } from '@/actions/homeApi'
import Wall from '@/components/Wall'

const profile = () => {
  const [isVerfiedStatus, setIsVerifiedStatus] = useState(true)

  useEffect(() => {
    const key = localStorage.getItem('jwt')
    async function fetchUser(){
      const user = await getUser(key)
      setIsVerifiedStatus(user.data.user.isVerified)
    }
    fetchUser()
  })
  return (
    <>
      <div>profile</div>
      {isVerfiedStatus ? 
      <>
        
      </>
      :
      <>
        <Verification />
        <Wall />
      </>
    }
      
    </>

  )
}

export default profile