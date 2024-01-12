'use client'
import { revalidatePath } from 'next/cache'
import Link
 from 'next/link'
const Preferences = () => {
  function logout(){
    const removeKey = localStorage.removeItem("jwt")
    revalidatePath('/')   // for clearing cache from api call in home route
  }
  return (
    <>
    <div>preferences</div>
    <Link href='/' onClick={logout}>Logout</Link>
    </>
  )
}

export default Preferences