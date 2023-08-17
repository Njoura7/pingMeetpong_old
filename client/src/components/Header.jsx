import { Link } from "react-router-dom"
import { logo } from "../assets"

function Header() {
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
        <Link to='/signup'>
          <button>Sign Up</button>
        </Link>
        <Link to='/login'>
          <button>Login</button>
        </Link>
      </div>
    </header>
  )
}

export default Header
