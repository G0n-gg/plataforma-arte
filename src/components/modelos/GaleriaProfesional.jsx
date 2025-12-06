import { useEffect, useState } from 'react';
import { ImagenProfesional } from './ImagenProfesional'
import { url } from '../../config/config';
import { Link } from 'react-router-dom';

export const GaleriaProfesional = ({ usuario, datosImagenes, galeria, ampliacion }) => {

  const [artistaUsername, setArtistaUsername] = useState('')
  const [borrarImagenUsername, setBorrarImagenUsername] = useState(usuario.username)
  const [listaImagenes, setListaImagenes] = useState([])


  useEffect(() => {
    setArtistaUsername(usuario.username)
  }, [])

  useEffect(() => {
    setBorrarImagenUsername(usuario.username)
  }, [usuario.username])

  useEffect(() => {
    setListaImagenes(datosImagenes)
  }, [datosImagenes])

  const handleAñadirImagen = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('imagenUsuario', file)
    formData.append('username', artistaUsername)

    const response = await fetch(`${url}galeria`, {
      method: 'POST',
      credentials: 'include',
      body: formData
    })

    const datos = await response.json()

    if (!response.ok) {
      console.log('Imagen no añadida')
      return
    }

    const imagenAñadida = datos[0]
    setListaImagenes(lista => [
      ...lista, imagenAñadida
    ])
  }

  const handleBorrarImagen = async (borrarImagenUsername, ruta) => {
    try {
      if (borrarImagenUsername != '' && ruta) {
        const response = await fetch(`${url}galeria`, {
          method: 'DELETE',
          headers: { 'Content-Type': "application/json" },
          body: JSON.stringify({ username: borrarImagenUsername, ruta }),
          credentials: 'include'
        })

        if (!response.ok) {
          console.error(response);
          return;
        }

        const rutaBorrada = await response.json()
        setListaImagenes(lista => lista.filter(img => img.ruta !== ruta))
        console.log('borrada', rutaBorrada)
      }

    } catch (error) {
      console.error('Error en la petición:', error);
    }
  }

  return (
    <>
      {galeria == false ? <section className="galeriaProfesional">
        <label htmlFor="añadirImagen">Añade una imagen a la galería</label>
        <input type='file' id='añadirImagen' accept='image/*' name='imagenUsuario' onChange={handleAñadirImagen}></input>
      </section> : <></>}

      <section className='galeriaImagenes'>
        {listaImagenes.map(i => (<Link key={i.id} to={galeria == true ? `../perfil/${i.artista_username}` : null}>
          <ImagenProfesional artistaUsername={galeria == 'galeria' ? '' : i.artista_username} enlace={i.ruta}
            onBorrar={handleBorrarImagen} borrarImagenUsuario={borrarImagenUsername} galeria={galeria} ampliacion={ampliacion} >
          </ImagenProfesional>
        </Link>
        ))}
      </section>
    </>
  )
}