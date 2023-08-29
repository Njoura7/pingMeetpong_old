import { useState } from "react"
import axios from "axios"

const JoinEvent = () => {
  const [matchID,setMatchID]=useState("");
  const [username,setUsername]=useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()

    const matchData = {
    matchID,
    username
    }
    try {
      const response = await axios.post(
        //waiting for the api/signup endpoint to be created
        "http://localhost:8080/api/events/join-event",
        JSON.stringify(matchData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      //a page should replace the create event that have players list and the invite code which is the matchID ,  
alert("Match was found with a matchID : "+response.data);    
} catch (error) {
  alert("No match was Found");
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          EventID:
          <input
            type='text'
            name='event-id'
            value={matchID}
            onChange={(e)=>setMatchID(e.target.value)}
          />
        </label>
        <label>
          enter your username:
          <input
            type='text'
            name='participant-username'
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />
        </label>
        <input
          type='submit'
          value='Submit'
        />
      </form>
    </>
  )
}

export default JoinEvent
