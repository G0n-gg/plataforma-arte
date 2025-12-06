import { useContext, useEffect, useState } from 'react'
import { CookieContext } from '../../context/CookieContext'
import { GaleriaProfesional } from '../modelos/GaleriaProfesional'
import { useParams } from 'react-router-dom'
import { url } from '../../config/config'
import { VscThumbsup, VscThumbsdown } from "react-icons/vsc";

export const ProfesionalPerfil = () => {
  const { username } = useParams()
  const { user, cargarPerfil } = useContext(CookieContext) || {}
  const [userArtista, setUserArtista] = useState({})
  const [galeria, setGaleria] = useState([])
  const [imagenAmpliada, setImagenAmpliada] = useState('')
  const [contactoConsulta, setContactoConsulta] = useState('')
  const [proyectoConsulta, setProyectoConsulta] = useState('')
  const [estadoLike, setEstadoLike] = useState(null)


  useEffect(() => {
    cargarPerfil()
  }, [])

  useEffect(() => {
    const getLike = async () => {
      try {
        if (user && user.username) {
          console.log(user)
          const response = await fetch(`${url}likes/${user.username}?usernameLikeado=${userArtista.username}`, {
            method: 'GET',
            credentials: 'include'
          })

          if (!response.ok) {
            console.log('DENTRO !',response)
            return
          }

          const datos = await response.json()
          console.log(datos)
          console.log('DENTRO ',response)
          if (datos.length > 0) 
            setEstadoLike(true)
          return
        }

        setEstadoLike(false)

      } catch (error) {
        console.log(error)
      }
    }
    
    getLike()
  }, [user, userArtista.username])

  useEffect(() => {
    const cargaImagenes = async () => {
      const response = await fetch(`${url}getUsuarioNopass/${username}`, {
        method: 'GET',
        credentials: 'include'
      })

      const responseImagenes = await fetch(`${url}galeria/${username}`, {
        method: 'GET',
        credentials: 'include'
      })

      const datos = await response.json()
      const datosImg = await responseImagenes.json()

      if (!response.ok || datos.error || datosImg.error) {
        console.log('Error al obtener imágenes')
        return
      }

      setUserArtista(datos)
      setGaleria(datosImg)
    }

    cargaImagenes()
  }, [])

  const ampliacionMouseOver = (ruta) => {
    setImagenAmpliada(ruta)
  }

  const handleConsulta = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${url}consulta`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ nombreConsulta: user.username, contactoConsulta, proyectoConsulta, artistaUsername: userArtista.username }),
        credentials: 'include'
      })

      if (!response.ok) {
        console.log(response)
        return
      }

      const datos = await response.json()

    } catch (error) {
      console.log(error)
    }
  }

  const handleLike = async () => {
    if (estadoLike == false) {
      try {
        const response = await fetch(`${url}likes`, {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            username: user.username, usernameLikeado: userArtista.username
          }),
          credentials: 'include'
        })

        if (!response.ok) {
          console.log(response)
          return
        }

        const datos = await response.json()
        console.log(datos)
        setEstadoLike(true)
      } catch (error) {
        console.log(error)
      }

    } else {
      try {
        const response = await fetch(`${url}likes/${ user.username }?usernameLikeado=${ userArtista.username }`, {
          method: 'DELETE',
          credentials: 'include'
        })

        if (!response.ok) {
          console.log(response)
          return
        }

        const datos = await response.json()
        setEstadoLike(false)
      } catch (error) {
        console.log(error)
        return
      }
    }
  }

  return (
    <div>
      <section className='profesionalPerfil'>
        <article className='descripcionPerfil'>
          <h2>{userArtista.username}</h2>

          <div>
            <img src={`${userArtista.imagenperfil}` || null} alt='' />
          </div>

          <div>{userArtista.descripcion}</div>
        </article>

        <article className='galeriaPerfil'>
          <div className='ampliacionImagen'><img src={ imagenAmpliada || null } ></img></div>

          <GaleriaProfesional usuario={userArtista} datosImagenes={galeria} galeria={true} ampliacion={ampliacionMouseOver}></GaleriaProfesional>
        </article>

        {estadoLike == false ? <article className='like'><p>Recomendar!!!</p><VscThumbsup className='likeBoton' onClick={handleLike} /></article> : <article className='like'><p>Ya no me gusta</p><VscThumbsdown className='noLikeBoton' onClick={handleLike} /></article>}


      </section>

      {user && user.tipo == 'cliente' ? <section className="contactoProfesional">
        <h2>Coméntame tu proyecto</h2>
        <form onSubmit={handleConsulta}>

          <div className="inputs">
            <label htmlFor="contactoConsulta">Tu contacto:</label><input type="text" name="contactoConsulta" id="contactoConsulta" placeholder='Tu contacto' value={contactoConsulta} onChange={(e) => { setContactoConsulta(e.target.value) }} />
          </div>

          <div className="textareas"><label htmlFor="proyectoConsulta">Tu idea:</label><textarea name="proyectoConsulta" id="proyectoConsulta" placeholder='Describe lo que quieres' maxLength={300} minLength={20} value={proyectoConsulta} onChange={(e) => setProyectoConsulta(e.target.value)}></textarea></div>

          <div className='botonConsulta'>
            <button type='submit'>Envía tu consulta</button>
          </div>
        </form>
      </section> : null}
    </div>
  )
}
