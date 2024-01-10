"use server"
import {cache} from 'react'
import axios from 'axios';

// pass jwt key stored in localstorage and this function will return user's detail
export const getUser = cache(async (key) => {
    const fetchUser = await axios.get(
        `${process.env.URL}/api/user/`,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",
            "Authorization": key,
          }
        },
      );
      // console.log(fetchUser.data)
      return {
        data: fetchUser.data,
        isAuthenticated: true
      };
})