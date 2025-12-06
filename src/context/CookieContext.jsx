import { createContext, useState } from 'react'
import { url } from '../config/config'

export const CookieContext = createContext()

export const CookieProvider = ({ children }) => {
  const [cookie, setCookie] = useState(null)
  const [user, setUser] = useState(null)
  const cargarPerfil = async () => {
    try {
      const response = await fetch(`${url}perfil`, {
        method: 'GET',
        credentials: 'include'
      })
      const datos = await response.json()

      if (response.ok && !datos.error) {
        setCookie(true)
        setUser(datos)
      } else {
        setCookie(false)
        setUser({})
      }
    } catch (err) {
      setCookie(false)
      setUser({})
    }
  }

  return (
    <CookieContext.Provider value={{ cookie, setCookie, user, cargarPerfil }}>
      {children}
    </CookieContext.Provider>
  )
}
