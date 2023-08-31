import { Link } from "react-router-dom"
import { logo } from "../assets"

import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

const Header = () => {
  const { isAuthenticated, handleLogout } = useContext(AuthContext)
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
          <button onClick={handleLogout}>Logout</button>
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
