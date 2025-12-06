import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { url } from '../../config/config'

export const Registro = () => {


  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatpassword, setRepeatpassword] = useState('')
  const [errorDatos, setErrorDatos] = useState('')
  const [esArtista, setEsartista] = useState(false)

  const redireccion = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorDatos('')
    
    try {
      const response = await fetch(`/registro`, {
        method: 'POST',
        body: JSON.stringify({ email: email, username: username, password: password, rpassword: repeatpassword, esArtista: esArtista }),
        headers: { 'Content-Type': 'application/json' }
      })

      const datos = await response.json()
      
      console.log(datos)

      if (!response.ok) {
        setErrorDatos(datos.error || 'Error no declarado')
        return
      }

      redireccion('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='registro'>
      <form onSubmit={handleSubmit}>
        <Link to={'/inicio'}>
          <div className='salir'><div><AiOutlineCloseCircle></AiOutlineCloseCircle></div></div>
        </Link>
        
        <div>
          <label htmlFor='email'>Correo electrónico:</label>
          <input type='text' name='email' id='email' value={email} placeholder='Email...' onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
          <label htmlFor='username'>Nombre de usuario:</label>
          <input type='text' name='username' id='username' value={username} placeholder='Nombre de usuario...' onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div>
          <label htmlFor='password'>Contraseña:</label>
          <input type='password' name='password' id='password' value={password} placeholder='********' onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div>
          <label htmlFor='checkPass'>Confirma tu contraseña:</label>
          <input type='password' name='check_pass' id='checkPass' value={repeatpassword} placeholder='********' onChange={(e) => setRepeatpassword(e.target.value)} />
        </div>

        <div>
          <label className='tipousuario' htmlFor='tipousuario'>Soy un artista:</label>
          <input type='checkbox' name='tipousuario' id='tipousuario' checked={esArtista} onChange={(e) => setEsartista(e.target.checked)} />
        </div>
        
        <div>
          <button type='submit'>Crear usuario</button>
        </div>

        <div className='errorValidacion'>
          {errorDatos}
        </div>
      </form>
    </div>
  )
}
