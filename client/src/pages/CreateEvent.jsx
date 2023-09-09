import { useState, useEffect, useContext } from "react"
import axios from "axios"

import UserContext from "../contexts/UserContext"

// get the username of logged in user , check if he created a game already on the database , if he did he can't create one more till the other game ends
const CreateEvent = () => {
  //track the logged in user using the UserContext
  const { loggedInUsername } = useContext(UserContext)
  
  async function fetchMatches(){
      try {
        const response = await axios.get(`http://localhost:8080/api/events/create-event?user=${loggedInUsername}`)
        console.log("api response")
        console.log(response.data)
        return response.data 
      } catch (error) {
         alert(error)
         return [];
      }

    
  }
  const [formData, setFormData] = useState({
    eventTitle: "",
    playersList: [],
    location: "",
    date: "",
    time: "",
    status: true,
    hostUsername: "",
    matchID: "",
  })

  //List of submissions that will be stored in localStorage
const [submissions, setSubmissions] = useState([])

  let todayDate = new Date().toISOString().split("T")[0]

//check why submission is not being updated 
  useEffect(()=>{
    async function fetchData() {
      try {
        const data = await fetchMatches();
        console.log("the dtat:")
        console.log(data)
        console.log("Before setSubmissions:", submissions);
        setSubmissions(data);        
        console.log("After setSubmissions:", typeof submissions);
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
    console.log(submissions)
  },[])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    //create the match data "aka form data also" to be sent to the server
    const matchData = {
      eventTitle: formData.eventTitle,
      hostUsername: loggedInUsername,
      location: formData.location,
      date: formData.date,
      time: formData.time,
      status: formData.status,
    }
   
    try {
      const response = await axios.post(
        //waiting for the api/signup endpoint to be created
        "http://localhost:8080/api/events/create-event",
        JSON.stringify(matchData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      //In React, directly modifying the state object (e.g., formData) by assigning a new property value (e.g., formData.matchID) is generally discouraged because it may not trigger a re-render of your component. 
      //React relies on immutable state updates to detect changes and trigger re-renders efficiently.
      //When you update state by directly modifying the state object, React may not recognize the change, and your component may not re-render to reflect the updated state. This can lead to unexpected and inconsistent behavior in your application.
      //The recommended approach in React is to use the state update function (e.g., setFormData) to create a new state object with the desired changes. This ensures that React knows about the state change and can re-render the component accordingly.
      // get the match id from response 
         const newMatchID= response.data.matchID  
  
         setSubmissions([...submissions, {...formData,matchID:newMatchID,hostUsername:loggedInUsername}])
         
         //clear the form
         setFormData({
        eventTitle: "",
        playersList: [],
        location: "",
        date: "",
        time: "",
        status: true,
        hostUsername: "",
        matchID: "",
      })
    } catch (error) {
      console.log(error)
    }
  }
  const handleDelete = async (index,matchid) => {
    try{
      console.log(matchid)
      await axios.delete(`http://localhost:8080/api/events/create-event?matchID=${matchid}`).
      then((response)=>console.log(response));  
    }catch(error){
      console.log(error);
    }
    const newSubmissions = [...submissions]
    newSubmissions.splice(index, 1)
    setSubmissions(newSubmissions)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Enter The Game Title :
          <input
            type='text'
            name='eventTitle'
            value={formData.eventTitle}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Location:
          <input
            type='text'
            name='location'
            placeholder='Address'
            value={formData.location}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Date:
          <input
            type='date'
            min={todayDate}
            name='date'
            value={formData.date}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Time:
          <input
            type='time'
            name='time'
            value={formData.time}
            required
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Create</button>
      </form>
      {submissions.map((submission, index) => {
        return (
          <div key={index} className='match-card'>
            <h2>Event {index + 1}: {submission.eventTitle}</h2>
            <p>Host: {submission.hostUsername}!</p>
            <div>Location: {submission.location.x+submission.location.y}</div>
            <div>Date: {submission.date}</div>
            <div>Time: {submission.time}</div>
            <div>MatchId: {submission.matchID}</div>
            <button onClick={() => handleDelete(index, submission.matchID)}>Delete</button>
          </div>
        )
      })
     }
    </>
  )
}

export default CreateEvent
