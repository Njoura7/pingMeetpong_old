import { useState } from "react"
import axios from "axios"
import Modal from "../components/Modal"
import { useNavigate } from "react-router-dom"
const JoinEvent = () => {
  const [matchID, setMatchID] = useState("")
  const [username, setUsername] = useState("")
  //states for the modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()

    const matchData = {
      matchID,
      username,
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
      console.log("Match was found with Event Title : " + response.data)

      setModalMessage("Match was found with Event Title: " + response.data)
      setIsModalOpen(true)
    } catch (error) {
      console.log("No match was Found")

      setModalMessage("No match was found")
      setIsModalOpen(true)
    }
  }
  const navigateHome=()=>{
    navigate('/');
  }

  const closeModal = () => {
    setIsModalOpen(false)
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
            onChange={(e) => setMatchID(e.target.value)}
          />
        </label>
        <label>
          enter your username:
          <input
            type='text'
            name='participant-username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button type='submit'>Join</button>
        <button onClick={navigateHome}>Back</button>

      </form>
      {/* Render the Modal component */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        message={modalMessage}
      />
    </>
  )
}

export default JoinEvent
