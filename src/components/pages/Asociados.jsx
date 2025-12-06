import { useEffect, useState } from 'react'
import { Asociado } from '../modelos/Asociado'
import { url } from '../../config/config'

export const Asociados = () => {
  const [asociadoMsg, setAsociadoMsg] = useState('')
  const [listaAsociados, setListaAsociados] = useState([])

  useEffect(() => {
    const getAsociados = async () => {
      try {
        const response = await fetch(`${url}asociados`)

        if (!response.ok) throw new Error('Peticón fallida al obtener asociados')

        const datos = await response.json()
        setListaAsociados(datos)
        console.log(listaAsociados)
      } catch (error) {
        console.error('Error en la carga de asociados', error)
      }
    }

    getAsociados()
    console.log(listaAsociados)
  }, [])

  return (
    <div className="paginaAsociados">
      {listaAsociados.map((a) => <Asociado key={a.id} enlace={a.enlace} imagen={a.imagen}></Asociado>)}
    </div>
  )
}
