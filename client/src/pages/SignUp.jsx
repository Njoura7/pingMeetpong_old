import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

const SignUp = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const handleSuccessfulSignup = () => {
    // Clear the authentication token from localStorage so that user log in
    localStorage.removeItem("authToken")
    // Redirect to the login page
    navigate("/login")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    const userData = {
      username,
      password: confirmPassword,
    }

    try {
      const response = await axios.post(
        //waiting for the api/signup endpoint to be created
        //auth/signup?
        "http://localhost:8080/auth/signup",
        JSON.stringify(userData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      handleSuccessfulSignup() // Call handleSuccessfulSignup function after successful signup

      // Handle the response here, such as displaying a success message
      console.log(response.data)
    } catch (error) {
      // Handle errors here
      console.log(error)
      setError(error.response.data.msg)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <br />
        <button type='submit'>Sign Up</button>
        {error && <p className='error-msg'>{error}</p>}
      </form>
      <p>already have an account ?</p>
      <Link to='/login'>
        <button>Login</button>
      </Link>
    </>
  )
}

export default SignUp
