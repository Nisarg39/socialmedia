'use client'
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

const SignUp = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [apiResponse, setApiResponse] = useState('')
    const router = useRouter();

    useEffect (() => {
        const key = localStorage.getItem('jwt')
        if(key){
            router.push("/")
        }
    })

    async function submitSignup(event){
        event.preventDefault();

        try {
            const response = await axios.post(
                `${process.env.URL}/api/user/signup`,
                {
                  name: name,
                  email: email,
                  password: password,
                  username: username,
                },
                {
                  headers: {
                    "Content-type":
                      "application/x-www-form-urlencoded;charset=UTF-8",
                  },
                }
              );
              
                setApiResponse(response.data.message)
                router.push('/signin')
            
        } catch (error) {
            console.log(error)
        }
        
    }
  return (
    <div className="bg-black p-8 rounded-xl h-auto w-auto">
        
        <form onSubmit={submitSignup} className="flex flex-col gap-8 w-64">
                <Input type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                
                <Input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                
                <Input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                
                <Input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                
                <Button type="submit" className="text-white bg-gradient-to-r from-indigo-500 from-30% bg-pink-500"> SIGN UP </Button>

            </form>
            <h1>{apiResponse}</h1>
    </div>
  )
}

export default SignUp