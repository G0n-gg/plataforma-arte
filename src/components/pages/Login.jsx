import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useState } from 'react'
import { CookieContext } from '../../context/CookieContext'
import { url } from '../../config/config'

export const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorDatos, setErrorDatos] = useState('')
    const { setCookie } = useContext(CookieContext)

    const redireccion = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setErrorDatos('')

        const fecha = new Date().toLocaleDateString()
        const hora = new Date().toLocaleTimeString()

        try {
            const response = await fetch(`${url}login`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ username: username, password: password, fecha, hora }),
                headers: { 'Content-Type': 'application/json' }
            }
            )

            const errorValidacion = await response.json()

            if (!response.ok || errorValidacion.error) {
                setErrorDatos(errorValidacion.error)
                return
            }

            setCookie(true)
            redireccion('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='registro'>
            <form onSubmit={handleLogin}>
                <Link to={'/inicio'}>
                    <div className='salir'><div><AiOutlineCloseCircle></AiOutlineCloseCircle></div></div>
                </Link>
                <div>
                    <label htmlFor='email'>Nombre de usuario:</label>
                    <input type='text' name='username' id='username' value={username} placeholder='Nombre de usuario...' onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='password'>Contraseña:</label>
                    <input type='password' name='password' id='password' value={password} placeholder='********' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <button type='submit'>Iniciar sesión</button>
                </div>
                <div className='errorValidacion'>
                    {errorDatos}
                </div>
            </form>
        </div>
    )
}
