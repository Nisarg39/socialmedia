import React, { useState } from 'react'
import axios from 'axios'

const Verification = () => {
    const [isFile, setFile] = useState(null)
    const [isError, setIsError]= useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    function checkValues(event){
        // event.preventDefault();
        const formData = new FormData()

        formData.append('image', "nash")
        formData.append('profilepic', isFile)
        async function checkVerification(){
            const key = localStorage.getItem("jwt")
            const verify = await axios.post(`${process.env.URL}/api/user/profile/uploadpic`,formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": key,
                }
            })
        }
        checkVerification()
    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        
        if (!allowedTypes.includes(selectedFile?.type)) {
            setIsError(true);
            setErrorMsg("Only JPEG, PNG, and GIF images are allowed.");
            return;
        }
        setIsError(false);
        setFile(selectedFile);
    }

  return (
    <form onSubmit={checkValues} encType='multipart/form-data'>
        <input type='file' name="profilepic" onChange={handleFileChange}/>
        {isError ? <span style={{color: "red"}}>{errorMsg}</span> : <></>}
        {/* <label>DOB : </label> */}
        {/* <input type="date" id="birthday" name="birthday" /> */}
        <input type='submit' name="submit"></input>
    </form>
  )
}

export default Verification