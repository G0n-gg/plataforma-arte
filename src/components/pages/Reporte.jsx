import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react';
import { url } from '../../config/config';

export const Reporte = () => {
    const location = useLocation()
    const [lenguaje, setLenguaje] = useState(false)
    const [contenido, setContenido] = useState(false)
    const [amenazas, setAmenazas] = useState(false)
    const [otros, setOtros] = useState(false)
    const [msgReporte, setMsgReporte] = useState('')
    const redireccion = useNavigate()

    const { cliente, consulta } = location.state || {}

    useEffect(() => {
        if (cliente == null){
            redireccion('/')
        }
    },[cliente])

    const handleEnviarReporte = async (e) => {
        e.preventDefault()

        const motivosSeleccionados = []
        if (lenguaje) motivosSeleccionados.push("Lenguaje ofensivo")
        if (contenido) motivosSeleccionados.push("Contenido inadecuado")
        if (amenazas) motivosSeleccionados.push("Amenazas")
        if (otros) motivosSeleccionados.push("Otros")

        const motivo = motivosSeleccionados.join(", ")

        try {
            const response = await fetch(`${url}reporte`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: cliente, mensaje: consulta, motivo
                })
            })

            if (!response.ok) {
                setMsgReporte('El reporte no se envió correctamente')
            }

            const datos = await response.json()

            setMsgReporte('Reporte enviado')
            console.log(datos)

            setTimeout(() => {
                redireccion('/perfil')
            }, 1500);

        } catch (error) {
            setMsgReporte('El reporte no se envió correctamente')
            console.log(error)
        }
    }

    return (
        <section className='seccionReporte'>
            <form onSubmit={handleEnviarReporte} className='formularioReporte'>
                <label htmlFor="Lenguaje">Lenguaje ofensivo</label>
                <input type='checkbox' id='Lenguaje' checked={lenguaje} onChange={(e) => setLenguaje(e.target.checked)}></input>

                <label htmlFor="Contenido">Contenido inadecuado</label>
                <input type='checkbox' id='Contenido' checked={contenido} onChange={(e) => setContenido(e.target.checked)}></input>

                <label htmlFor="Amenazas">Amenazas</label>
                <input type='checkbox' id='Amenazas' checked={amenazas} onChange={(e) => setAmenazas(e.target.checked)}></input>

                <label htmlFor="Otros">Otros</label>
                <input type='checkbox' id='Otros' checked={otros} onChange={(e) => setOtros(e.target.checked)}></input>

                <button type='submit'>Enviar reporte</button>
            </form>
            <article className='msgReporte'>{msgReporte}</article>
        </section>
    )
}
