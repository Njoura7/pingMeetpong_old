import { useEffect, useState, useContext } from "react"
import axios from "axios"
import Modal from "../components/Modal"
import { useNavigate } from "react-router-dom"
import UserContext from "../contexts/UserContext"

const JoinEvent = () => {
  const { loggedInUsername } = useContext(UserContext)

  const [matchID, setMatchID] = useState("")
  //states for the modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()

    const matchData = {
      matchID,
      loggedInUsername
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
      setModalMessage(response.data)
      setIsModalOpen(true)
    } catch (error) {
      setModalMessage(error)
      setIsModalOpen(true)
    }
  }
  const navigateHome=()=>{
    navigate('/');
  }

  //get all matches in the database to then make them appear as cards ! 
  useEffect(()=>{
    async function fetchData() {
      try {
        const response=await axios.get("http://localhost:8080/api/events/join-event")
        console.log(response.data);
      } catch (error) {
       console.log(error);
      }
    }
    fetchData();
  },[])

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
