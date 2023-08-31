import { useState, useEffect } from "react"
import axios from "axios"
// get the username of logged in user , check if he created a game already on the database , if he did he can't create one more till the other game ends
const CreateEvent = () => {
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
  const [submissions, setSubmissions] = useState(
    JSON.parse(localStorage.getItem("submissions")) || []
  )

  let todayDate = new Date().toISOString().split("T")[0]

  useEffect(() => {
    localStorage.setItem("submissions", JSON.stringify(submissions))
  }, [submissions])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // add the new form data to the submissions list
    setSubmissions([...submissions, formData])

    //create the match data "aka form data also" to be sent to the server
    const matchData = {
      eventTitle: formData.eventTitle,
      hostUsername: formData.hostUsername,
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
      console.log(response)
      // Use response.data.matchID directly when rendering
      const newSubmission = {
        ...formData,
        matchID: response.data.matchID,
      }
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
      // Add the newSubmission to submissions
      setSubmissions([...submissions, newSubmission])
    } catch (error) {
      console.log(error)
    }
  }
  const handleDelete = (index) => {
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
          <div
            key={index}
            className='match-card'>
            <h2>
              Event{index + 1}: {submission.eventTitle}
            </h2>
            <div>Location: {submission.location}</div>
            <div>Date: {submission.date}</div>
            <div>Time: {submission.time}</div>
            <div>MatchId: {submission.matchID}</div>

            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        )
      })}
    </>
  )
}

export default CreateEvent
