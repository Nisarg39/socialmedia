'use client'
import { useState } from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";


const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authenticated, isAuthenticated] = useState(false)
    const [apiResponse, setApiResponse] = useState('')
    const router = useRouter();

    async function submitLogin(event){
        // event.preventDefault();
        
            try {
                const data = await axios.post(`${process.env.URL}/api/user/signin`,
                {
                    username: username,
                    password: password
                },
                    {   headers: {
                    'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    }
                })
                
                if(data){
                    isAuthenticated(true)
                    setApiResponse(data.data.message)
                    localStorage.setItem('jwt', data.data.token)
                    // router.back('/')
                }
    
            } catch (error) {
                isAuthenticated(false)
                setApiResponse ("invalid username or password")
            }
            
        
        
        
    }
    return(
        <div className="bg-black p-8 rounded-xl w-80 max-w-80 grid content-center">
            <form onSubmit={submitLogin} className="flex flex-col gap-8 w-64">

                <Input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                
                <Input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                
                <Button type="submit" className="text-white bg-gradient-to-r from-indigo-500 from-30% bg-pink-500">SIGN IN</Button>

            </form>
            <h1>{apiResponse}</h1>
        </div>
    )
}

export default SignIn