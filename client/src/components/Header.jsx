import { Link } from "react-router-dom"
import { logo } from "../assets"

import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

import { useLoggedInUsername } from "../contexts/UserContext"

const Header = () => {
  const { isAuthenticated, handleLogout } = useContext(AuthContext)
  //track the logged in user using the UserContext
  const { loggedInUsername } = useLoggedInUsername()
  return (
    <header>
      <Link to='/'>
        <img
          src={logo}
          alt='logo'
          className='img'
        />
      </Link>
      <div>
        {isAuthenticated ? (
          <div>
            <p>Welcome, {loggedInUsername}!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <>
            <Link to='/signup'>
              <button>Sign Up</button>
            </Link>
            <Link to='/login'>
              <button>Login</button>
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
