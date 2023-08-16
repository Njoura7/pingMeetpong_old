import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom"
import { logo } from "./assets"
import { Home, SignUp, Login, CreateEvent, JoinEvent, LookForPlayer } from "./pages"

import { AuthProvider } from "./contexts/AuthContext"
import ProtectedRoute from "./routes/ProtectedRoute"
// import "./index.css"

function App() {
  return (
    <AuthProvider>
      <Router>
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
              element={<ProtectedRoute component={Home} />}
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
      </Router>
    </AuthProvider>
  )
}

export default App
