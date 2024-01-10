import React from 'react'

const FollowingList = (props) => {
    // console.log(props.followingList)
  return (
    <>
        <div>FollowingList</div>
        {props.followingList.map((follower) => (
        <>
            <h1>{follower.name}</h1>
        </>
        ))}
    </>
    
  )
}

export default FollowingList