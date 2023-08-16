import { useState, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { setIsAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const { from } = location.state || { from: { pathname: "/" } }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userData = {
      username,
      password,
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        JSON.stringify(userData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      // Handle the response here
      if (response.data === "success") {
        setIsAuthenticated(true)
        navigate(from)
        console.log("Login successful")
      } else {
        setError(response.data)
      }
    } catch (error) {
      //handle errors here
      console.log(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type='text'
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input
          type='submit'
          value='Submit'
        />
        {error && <p>{error}</p>}
      </form>
      <p> Don&apos;t have an account?</p>
      <Link to='/signup'>
        <button>Signup</button>
      </Link>
    </>
  )
}

export default Login
