import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import React,{useEffect, useState, useContext} from "react";
import axios from "axios"
import { useLocation } from "react-router-dom";
import UserContext from "../contexts/UserContext"


    
function PlayerProfile() {
  const location=useLocation();
  const urlQuery=new URLSearchParams(location.search)
  const username=urlQuery.get('id');
  const [availabality,setAvailablity]=useState(false);
  const [reviews,setReviews]=useState(["Bouheli","Dhab3i"]); 
  const [record,setRecord]=useState({Wins:0,Losses:0});
  const { loggedInUsername } = useContext(UserContext)

 async function fetchUserData(){
  try {
    const response=await axios.get(`http://localhost:8080/api/users/profile?id=${username}`)
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
  
const handleAdd=async (username)=>{
  try{
  const response=await axios.post(`http://localhost:8080/api/users/addFriend`,{
    loggedinUsername:loggedInUsername,
  friendToAdd:username})
  console.log(response);
  }catch(error){
   console.log(error)
  }
  }
  useEffect(()=>{
    async function fetchData(){
      const userData=await fetchUserData();
    setReviews(userData.reviews);
    setAvailablity(userData.availability);
    setRecord(userData.record);
  }
  fetchData();
},[])

    //set username basedo n the clicked link ? 
    return (
    <>
    <div>
      <h2>{username}</h2>
      <div className='avatar'>
      <img src="https://s3-us-west-2.amazonaws.com/harriscarney/images/150x150.png"/>
      </div>
      <div>
      <h2>Record : </h2>
      <p>Wins: {record.Wins}, Losses: {record.Losses}</p>
      {(reviews.length>0) ? (
      <div>
        <h2>Reviews :</h2>
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>{review}</li>
          ))}
        </ul>
      </div>
    ) : (
      <div>
      <h2>Reviews :</h2> 
      <p> No reviews available.</p>
    </div>)}
      <h2>Availabality : </h2>
        <p>{availabality.toString()}</p>
       {/* needs to be wrapped in an arrow function so that it is only invoked whne cliccked , otherwise it will be invoked handleAdd(username) immediately when rendering the component */}
      <button onClick={()=>handleAdd(username)}>Add Friend</button>
      </div>
    </div>
    </>
  )
}

export default PlayerProfile
