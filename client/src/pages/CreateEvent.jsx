import { useState } from "react"
import axios from "axios"

const CreateEvent = () => {
  const [matchID, setMatchID] = useState("")
  const [hostUsername, setHostUsername] = useState("")
  const [playersList, setPlayersList] = useState([])

  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [status, setStatus] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const matchData = {
      matchID,
      hostUsername,
      location,
      date,
      time,
      status,
    }
    try {
      const response = await axios.post(
        //waiting for the api/signup endpoint to be created
        "http://localhost:8080/api/create-event",
        JSON.stringify(matchData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      //display match details
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          MatchID:
          <input
            type='text'
            name='event-id'
            value={matchID}
            onChange={(e) => setMatchID(e.target.value)}
          />
        </label>
        <label>
          Enter your Username(as a Host):
          <input
            type='text'
            name='creator-username'
            value={hostUsername}
            onChange={(e) => setHostUsername(e.target.value)}
          />
        </label>
        <label>
          Location:
          <input
            type='next'
            name='location'
            placeholder='address'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label>
          Date:
          <input
            type='date'
            name='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Time:
          <input
            type='time'
            name='time'
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
        <label>
          Availability:
          <input
            type='checkbox'
            name='status'
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
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
