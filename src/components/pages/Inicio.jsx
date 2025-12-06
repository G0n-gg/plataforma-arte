import { useEffect, useState } from 'react'
import { Profesional } from '../modelos/Profesional'
import { url } from '../../config/config'
import { GaleriaProfesional } from '../modelos/GaleriaProfesional'

export const Inicio = () => {
  const [listaArtistasPrio, setListaArtistasPrio] = useState([])
  const [listaArtistasRec, setListaArtistasReco] = useState([])
  const [ultimasImagenes, setUltimasImagenes] = useState([])

  useEffect(() => {
    const cargarPrioUsuarios = async () => {
      try {
        const response = await fetch(`${url}profesionales`, {
          method: 'GET',
          credentials: 'include'
        })

        if (!response.ok) {
          console.log(response)
          return
        }
        const datos = await response.json()

        const datosFiltradosPrio = datos.filter(a => a.priorizar == "true")
        setListaArtistasPrio(datosFiltradosPrio)
      } catch (error) {
        console.log(error)
      }
    }

    cargarPrioUsuarios()
  }, [])

   useEffect(() => {
    const cargarRecUsuarios = async () => {
      try {
        const response = await fetch(`${url}likes`, {
          method: 'GET',
          credentials: 'include'
        })

        if (!response.ok) {
          console.log(response)
          return
        }
        const datos = await response.json()

        setListaArtistasReco(datos)
      } catch (error) {
        console.log(error)
      }
    }

    cargarRecUsuarios()
  }, [])

  useEffect(() => {
    const cargarUltimasImagenes = async () => {
      try {
        const response = await fetch(`${url}galeria`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        })

        if (!response.ok) {
          console.log(response)
          return
        }

        const datos = await response.json()
        const ultimas = datos.slice(-5).reverse()
        setUltimasImagenes(ultimas)
      } catch (error) {
        console.log(error)
      }
    }

    cargarUltimasImagenes()
  }, [])

  return (
    <div className="paginaInicio">
      <h1>Los artistas más importantes</h1>
      <div className="prioArtistas">
        {listaArtistasPrio.map((a) => <Profesional key={a.id} nombre={a.username} imagen={a.imagenperfil} className='artistaPrio'></Profesional>)}
      </div>

      <h1>Los artistas más recomendados</h1>
      <div className='masRecomendados'>
        {listaArtistasRec.map((a) =><Profesional key={a.id} nombre={a.username} imagen={a.imagenperfil}></Profesional>)}
      </div>

      <div className="ultimasImagenes"><h1>Imágenes más recientes</h1> <br /><br />
        <GaleriaProfesional usuario={{}} datosImagenes={ultimasImagenes} galeria={true}></GaleriaProfesional>
      </div>
    </div>
  )
}
