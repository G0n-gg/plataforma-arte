import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { CookieContext } from '../../context/CookieContext'
import { url } from '../../config/config'

export const Opiniones = () => {
  const userContext = useContext(CookieContext).user
  const cookieContext = useContext(CookieContext).cookie
  const { cargarPerfil } = useContext(CookieContext)
  const [user, setUser] = useState(null)
  const [opinion, setOpinion] = useState('')
  const [listaOpiniones, setListaOpiniones] = useState([])
  const [enviada, setEnviada] = useState(false)

  useEffect(() => {
    cargarPerfil()
  }, [])

  useEffect(() => {
    setUser(userContext)
  }, [userContext])

  useEffect(() => {
    const cargarOpiniones = async () => {
      try {
        const response = await fetch(`${url}opiniones`, {
          method: 'GET',
          credentials: 'include'
        })

        const datos = await response.json()
      
        if (Array.isArray(datos)) {
          setListaOpiniones([...datos].reverse());
        } else {
          console.error("No hay opiniones o Error");
          return
        }
      } catch (error) {
        console.log(error)
      }
    }
    cargarOpiniones()
  }, [enviada])

  const handleEnviarOpinion = async (e) => {
    e.preventDefault()

    try {
      if (user) {
        const username = user.username
        console.log(user)
        const response = await fetch(`${url}opiniones`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, opinion }),
          credentials: 'include'
        })

        if (!response.ok) {
          return
        }

        setEnviada(!enviada)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='opiniones'>
      {cookieContext ? <h1>Déjanos tu opinión!</h1> : <h1>Opiniones de nuestros usuarios!</h1>}

      {cookieContext ? <article className='formulario'>
        <form onSubmit={handleEnviarOpinion}>
          <label htmlFor=""></label>
          <textarea name="opinion" id="opinion" value={opinion} onChange={(e) => setOpinion(e.target.value)}></textarea>

          <button type='submit'>Enviar opinión</button>
        </form>
      </article> : null}

      <article className='userOpiniones'>
        {listaOpiniones.length > 0 ? (<ul>
          {listaOpiniones.map(l => (
            <li key={l.id}><span>{l.username}:</span><br></br>{l.opinion}</li>
          ))}
        </ul>) : null}
      </article>
    </section>
  )
}
