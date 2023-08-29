import { useState } from "react"
import axios from "axios"
// get the username of logged in user , check if he created a game already on the database , if he did he can't create one more till the other game ends 
const CreateEvent = () => {
  const [eventTitle, setEventTitle] = useState("")
  const [playersList, setPlayersList] = useState([])
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [status, setStatus] = useState(true)
  const [hostUsername, sethostUsername] = useState("")

let todayDate=new Date().toISOString().split('T')[0];

const handleSubmit = async (e) => {
    e.preventDefault()

    const matchData = {
      eventTitle,
      hostUsername,
      location,
      date,
      time,
      status,
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
      //a page should replace the create event that have players list and the invite code which is the matchID ,  
alert("Match was created with a matchID : "+response.data);    
} catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Enter The Game Title :
          <input
            type='text'
            name='event-title'
            value={eventTitle}
            required
            onChange={(e) => setEventTitle(e.target.value)}
          />
        </label>
        <label>
          Location:
          <input
            type='text'
            name='location'
            placeholder='Address'
            value={location}
            required
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label>
          Date:
          <input
            type='date'
            min={todayDate}
            name='date'
            value={date}
            required
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Time:
          <input
            type='time'
            name='time'
            value={time}
            required
            onChange={(e) => setTime(e.target.value)}
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

export default CreateEvent
