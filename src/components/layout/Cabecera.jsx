import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as icons from 'react-icons/fa'
import * as lupa from 'react-icons/pi'
import { FaInstagram } from 'react-icons/fa'
import { FaFacebookSquare } from 'react-icons/fa'
import { FaTiktok } from 'react-icons/fa'
import { url } from '../../config/config'


export const Cabecera = ({ setVisible }) => {
  const [buscar, setBuscar] = useState('')
  const [buscarMsg, setBuscarMsg] = useState('')

  const redireccion = useNavigate()  

  const handleBuscar = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${url}profesional/${buscar}`, {
        method: 'GET',
        credentials: 'include'
      })

      const datos = await response.json()

      if (!response.ok) {
        setBuscarMsg(datos.error)
        return
      }

      setBuscarMsg('')
      redireccion(`/perfil/${buscar}`)
      setBuscar('')
    } catch (error) {
      console.log(error)
    }
  }

  console.log(buscar)
  return (
    <header className="header">
      <div className="botonMenu" onClick={() => setVisible(prev => !prev)}>
        <icons.FaBars className='iconMenu' />
      </div>
      <form onSubmit={handleBuscar}>
        <input type="text" className="buscador" value={buscar} onChange={(e) => setBuscar(e.target.value)} placeholder='Encuentra a tu artista preferido...' />
        <button type='submit' className="botonBuscador"><lupa.PiMagnifyingGlassBold /></button>
        <div className="buscarMsg">{buscarMsg}</div>
      </form>
      <div className='redesHeader'>
        <Link to={"http://www.instagram.com"} target='_blank' >
          <FaInstagram className='iconRedes'></FaInstagram>
        </Link>
        <Link to={"http://www.facebook.com"} target='_blank'>
          <FaFacebookSquare className='iconRedes'></FaFacebookSquare>
        </Link>
        <Link to={"http://www.tiktok.com"} target='_blank'>
          <FaTiktok className='iconRedes'></FaTiktok>
        </Link>
      </div>

    </header>
  )
}