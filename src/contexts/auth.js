import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [userData, setUserData] = useState(null)

  const updateUser = newData => {
    setUserData(newData)
  }

  return (
    <AuthContext.Provider value={{ userData, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useUser = () => {
  return useContext(AuthContext)
}
