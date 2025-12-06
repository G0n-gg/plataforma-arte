import { useState, useEffect } from 'react'
import { Profesional } from '../modelos/Profesional'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CookieContext } from '../../context/CookieContext'
import { url } from '../../config/config'

export const Profesionales = () => {
  const [listaProfesionales, setListaProfesionales] = useState([]);
  const { cookie } = useContext(CookieContext)

  useEffect(() => {
    const getProfesionales = async () => {
      try {
        const response = await fetch(`${url}profesionales`, {
          headers: {'Content-type' : 'application/json'},
          credentials: 'include'
        })

        if (!response.ok) throw new Error('Peticón fallida al obtener profesionales')

        const datos = await response.json()

        setListaProfesionales(datos)
      } catch (error) {
        console.error('Error en la carga de profesionales', error)
      }
    }

    getProfesionales()
  }, [])  

  console.log(listaProfesionales)

  return (
    <div className="paginaProfesionales">
      {listaProfesionales.map((p) => <Link key={p.id} to={cookie ? `/perfil/${p.username}` : '/login' }><Profesional nombre={p.username} descripcion={p.descripcion} imagen={p.imagenperfil}></Profesional></Link>)}
    </div>
  )
}
