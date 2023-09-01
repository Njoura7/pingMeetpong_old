import { createContext, useContext, useState } from "react"

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [loggedInUsername, setLoggedInUsername] = useState("")

  return (
    <UserContext.Provider value={{ loggedInUsername, setLoggedInUsername }}>
      {children}
    </UserContext.Provider>
  )
}

export function useLoggedInUsername() {
  return useContext(UserContext)
}
