import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import { logo } from "./assets"
import { Home, SignUp, Login, CreateEvent, JoinEvent, LookForPlayer } from "./pages"
// import "./index.css"

function App() {
  return (
    <BrowserRouter>
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
      <main>
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/signup'
            element={<SignUp />}
          />
          <Route
            path='/login'
            element={<Login />}
          />
          <Route
            path='/create-event'
            element={<CreateEvent />}
          />
          <Route
            path='/join-event'
            element={<JoinEvent />}
          />
          <Route
            path='/look-forPlayer'
            element={<LookForPlayer />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
