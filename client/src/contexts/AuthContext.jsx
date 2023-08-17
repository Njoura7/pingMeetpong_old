import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const authToken = localStorage.getItem("authToken")
    if (authToken) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (authToken) => {
    localStorage.setItem("authToken", authToken)
    setIsAuthenticated(true)
  }

  //TODO to Be implemented for the logout
  const handleLogout = () => {
    localStorage.removeItem("authToken")
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
