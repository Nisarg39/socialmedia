'use client'

import axios from "axios";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const WritePost = () => {
  const [isFiles, setFiles] = useState([]);
  const [errorMsg, setErrorMsg] = useState('')
  const [isError, setIsError] = useState(false)

  async function sendPost(event){
    event.preventDefault();
    const key = localStorage.getItem('jwt')
    // console.log(event.target[0].value)
    const formData = new FormData()
    formData.append("captions", event.target[0].value)

    // for loop to append single file at a time with key postpics that will be fetched by multer in backend
    for(let i=0; i<isFiles.length; i++){
      formData.append(`postpics`, isFiles[i])
    }
    
    // console.log(formData)
    
    async function uploadPost(){
      const postApi = await axios.post(`${process.env.URL}/api/user/profile/uploadpost`, formData,{
        headers: {
          'Authorization': key
        }
      })

      // console.log(postApi)
      
    }

    uploadPost()

  }

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    // console.log(selectedFile)
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    for(let i=0; i < selectedFiles.length; i++){
      // console.log(selectedFile[i])
      if (!allowedTypes.includes(selectedFiles[i]?.type)) {
        setIsError(true);
        setErrorMsg("Only JPEG, PNG & JPG images are allowed.");
        return;
      }
    }
    
    setIsError(false);
    setFiles(selectedFiles);
  }

  return (
    <div  className="w-8/12 gap-2 h-16 pt-2 bg-black rounded-lg">
      <form onSubmit={sendPost} className="flex p-0">

        <div className="basis-9/12">
        <Input 
          name= "captions"
          placeholder='Write Something ...' 
          required
        />
        </div>

        <div className="basis-10">
          <label for="files" >
            <img src="https://img.icons8.com/ios-filled/100/FFFFFF/apple-camera.png" alt="upload"/>
          </label>
          <Input type="file" id="files" multiple name='postPic' style={{visibility: "hidden"}} onChange={handleFileChange} />
        </div>
        
        <div className="basis-10 ml-10">
          <Button type='submit' name='Post' variant="outline">POST</Button>
        </div>
        
      </form>
      
    </div>
  )
}


{/* <form onSubmit={sendPost}>
  <input type='text' name='captions' placeholder='Write Something ...' style={{color: "black"}} />
  <input type='file' multiple name='postPic' onChange={handleFileChange}/>
  <input type="submit" name="Post" value={"Post"} />
</form> */}