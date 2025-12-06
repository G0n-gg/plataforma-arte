import { useState, useEffect } from 'react'
import { GaleriaProfesional } from '../modelos/GaleriaProfesional'
import { url } from '../../config/config'

export const Galeria = () => {
  const [galeria, setGaleria] = useState([])

  useEffect(() => {
    const getImagenes = async () => {
      try {
        const response = await fetch(`${url}galeria`)

        if(!response.ok) {
          console.log('Error en petición', response)
        } 

        const datos = await response.json()
        const ultimas = datos.reverse()
        setGaleria(ultimas)
      } catch (error) {
        console.log('Error al pedir imágenes: ', error)
      }
    }
    
    getImagenes()
  }, [])
  
  return (
    <div className='galeriaPrincipal'>
      <GaleriaProfesional usuario={{}} datosImagenes={galeria} galeria={true}></GaleriaProfesional>
    </div>
  )
}
