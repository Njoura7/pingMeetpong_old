import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import React,{useEffect, useState} from "react";
import axios from "axios"
import { useLocation } from "react-router-dom";


    
function PlayerProfile() {
  const location=useLocation();
  const urlQuery=new URLSearchParams(location.search)
  const username=urlQuery.get('id');
  const [availabality,setAvailablity]=useState(false);
  const [reviews,setReviews]=useState([]); 
 async function fetchUserData(){
  try {
    const response=await axios.get(`http://localhost:8080/api/users/search-player?q=${username}`)
    JSON.stringify(response),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
    return response.data;
  } catch (error) {
   alert("errors fetching user data")
   return [];
  }
  }
  useEffect(()=>{
    setReviews(fetchUserData().reviews);
    setAvailablity(fetchUserData().Availabality);
  },[])

    //set username basedo n the clicked link ? 
    return (
    <>
    <div>
      <h1>{username}</h1>
      <div className='avatar'>
      <img src="https://s3-us-west-2.amazonaws.com/harriscarney/images/150x150.png"/>
      </div>
      <div>
        <h2>Match History : </h2>
        <h2>Reviews :{reviews} </h2>
        <h2>Availabality :{availabality} </h2>

      </div>
    </div>
    </>
  )
}

export default PlayerProfile
