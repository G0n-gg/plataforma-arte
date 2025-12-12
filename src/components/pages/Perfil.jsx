import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { GaleriaProfesional } from '../modelos/GaleriaProfesional'
import { CookieContext } from '../../context/CookieContext'
import { VscReport, VscTrash } from 'react-icons/vsc';
import { url } from '../../config/config'


export const Perfil = () => {
    const [username, setUsername] = useState('')
    const [prevPassword, setPrevpassword] = useState('')
    const [newPassword, setNewpassword] = useState('')
    const [errorDatos, setErrorDatos] = useState('')
    const [msgDescripcion, setMsgdescripcion] = useState('')
    const [msgEliminarusuarior, setMsgeliminarusuarior] = useState('')
    const [user, setUser] = useState({})
    const [rutaImagen, setRutaimagen] = useState(null)
    const [descripcion, setDescripcion] = useState('')
    const [email, setEmail] = useState('')

    //-------------Datos buscar usuario en admin--------------------------------

    const [adminUser, setAdminuser] = useState('')
    const [adminEmail, setAdminemail] = useState('')
    const [adminUsername, setAdminusername] = useState('')
    const [adminTipo, setAdmintipo] = useState('')
    const [adminDescripcion, setAdmindescripcion] = useState('')
    const [adminImagen, setAdminimagen] = useState('')
    const [adminMsg, setAdminmsg] = useState('')

    //-------------Datos actualizar usuario en admin----------------------------

    const [putUsername, setPutusername] = useState('')
    const [putEmail, setPutemail] = useState('')
    const [putDescripcion, setPutdescripcion] = useState('')
    const [msgActualizado, setMsgactualizado] = useState('')

    //-------------Datos para asociado en admin---------------------------------

    const [crearNombreAsociado, setCrearNombreAsociado] = useState('')
    const [crearEnlaceAsociado, setCrearEnlaceAsociado] = useState('')
    const [crearImagenAsociado, setCrearImagenAsociado] = useState('')
    const [crearMsg, setCrearMsg] = useState('')
    const [adminAsociado, setAdminAsociado] = useState('')
    const [buscarNombreAsociado, setBuscarNombreAsociado] = useState('')
    const [buscarEnlaceAsociado, setBuscarEnlaceAsociado] = useState('')
    const [buscarImagenAsociado, setBuscarImagenAsociado] = useState('')
    const [adminAsociadoMsg, setAdminasociadoMsg] = useState('')
    const [estadoSubida, setEstadoSubida] = useState(false)

    const [putNombreAsociado, setPutNombreAsociado] = useState('')
    const [putEnlaceAsociado, setPutEnlaceAsociado] = useState('')
    const [asociadoMsgActualizado, setAsociadoMsgActualizado] = useState('')

    //-------------Datos para listado logins---------------------------------
    const [listaLogins, setListaLogins] = useState([])
    const [botonLogin, setBotonLogin] = useState(true)

    //-------------Datos para galeria----------------------------------------
    const [imagenes, setImagenes] = useState([])

    //-------------Datos para consultas--------------------------------------
    const [consultas, setConsultas] = useState([])

    //-------------Datos para reportes---------------------------------------
    const [listaReportes, setListaReportes] = useState([])
    const [botonReportes, setBotonReportes] = useState(true)

    //-------------Datos para opiniones---------------------------------------
    const [AdminOpiniones, setAdminOpiniones] = useState([])
    const [botonOpiniones, setBotonOpiniones] = useState(true)



    const fileInputPerfilRef = useRef(null)
    const fileInputAsociadoRef = useRef(null)
    const { setCookie } = useContext(CookieContext)
    const redireccion = useNavigate()

    useEffect(() => {
        const cargarPerfil = async () => {
            const response = await fetch(`${url}perfil`, {
                method: 'GET',
                credentials: 'include'
            })

            const datos = await response.json()

            if (!response.ok || datos.error) {
                redireccion('/login')
                return
            }

            if (datos) {
                setUser(datos)
                setUsername(datos.username)
                setRutaimagen(datos.imagenperfil)
                setEmail(datos.email)
            }
        }

        cargarPerfil()
    }, [])

    useEffect(() => {
        if (user && username && user.tipo == 'artista') {
            const cargarImagenes = async () => {
                const responseImagenes = await fetch(`${url}galeria/${username}`, {
                    method: 'GET',
                    credentials: 'include',
                })

                if (!responseImagenes.ok) {
                    return
                }

                const datos = await responseImagenes.json()
                setImagenes(datos)
            }

            cargarImagenes()
        }
    }, [user])

    useEffect(() => {
        if (user && username && user.tipo == 'artista') {
            const cargarConsultas = async () => {
                try {
                    const response = await fetch(`${url}consulta/${username}`, {
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include'
                    })
                    console.log('name', username)

                    if (!response.ok) {
                        return
                    }

                    const datos = await response.json()
                    setConsultas(datos)

                } catch (error) {
                    console.log(datos.error)
                }
            }

            cargarConsultas()
        }
    }, [user])

    useEffect(() => {
        const cargarOpiniones = async () => {
            try {
                const response = await fetch(`${url}opiniones`, {
                    method: 'GET',
                    credentials: 'include'
                })

                const datos = await response.json()
                console.log(datos)

                const invertirLista = datos.reverse()
                setAdminOpiniones(invertirLista)
            } catch (error) {
                console.log(error)
            }
        }
        cargarOpiniones()
    }, [])

    const handleLogout = async (e) => {
        e.preventDefault()
        await fetch(`${url}logout`, {
            method: 'POST',
            credentials: 'include'
        })
        setCookie(false)
        redireccion('/')
    }

    const handlePassword = async (e) => {
        e.preventDefault()

        setErrorDatos('')
        const response = await fetch(`${url}perfil/cambiarPassword`, {
            method: 'PUT',
            body: JSON.stringify({ username, prevPassword, newPassword }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })

        const errorValidacion = await response.json()

        if (!response.ok) {
            setErrorDatos(errorValidacion.error)
            return
        }

        console.log(errorValidacion)
    }

    const handleImagen = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        const formData = new FormData()
        formData.append('imagenPerfil', file)
        formData.append('adminUser', adminUser)

        const response = await fetch(`${url}perfil/imagen`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })

        const data = await response.json()

        if (response.ok) {
            console.log(data)
            setRutaimagen(data)
        }
    }

    const handleDescripcion = async (e) => {
        e.preventDefault()

        if (descripcion != '') {
            const response = await fetch(`${url}perfil/descripcion`, {
                method: 'PUT',
                body: JSON.stringify({ username, descripcion }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })

            const errorValidacion = await response.json()

            if (!response.ok) {
                setMsgdescripcion(errorValidacion.error)
                return
            } else {
                setMsgdescripcion('Descripción actualizada')
                setDescripcion('')
            }
        }
    }

    const handleActualizarUsuario = async (e) => {
        e.preventDefault()

        setMsgactualizado('')

        if (username == 'admin' && adminUser) {
            const response = await fetch(`${url}perfil/admin/actualizarUsuario`, {
                method: 'PUT',
                body: JSON.stringify({ adminUser, putUsername, putEmail, putDescripcion, rutaImagen }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })

            const datos = await response.json()

            if (!response.ok) {
                setMsgactualizado(datos.error)
                return
            }

            setPutusername('')
            setPutemail('')
            setPutdescripcion('')
            if (fileInputPerfilRef.current) fileInputPerfilRef.current.value = null;
            setMsgactualizado('Datos actualizados')
        }
    }

    const handleBorrarusuario = async (e) => {
        e.preventDefault()

        if (username == 'admin') {
            const confirmar = window.confirm(`¿Quieres borrar este usuario: ${adminUser}`)
            if (!confirmar) return

            const response = await fetch(`${url}perfil`, {
                method: 'DELETE',
                body: JSON.stringify({
                    username, adminUsername
                }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })

            const datos = await response.json()

            if (!response.ok) {
                setMsgeliminarusuarior(datos.error)
                return
            }

            setMsgeliminarusuarior('Usuario borrado... Saliendo...')
            setAdminemail('')
            setAdminusername('')
            setAdmindescripcion('')
            setAdminimagen('')

            if (username != 'admin') redireccion('/')

        } else {
            const confirmar = window.confirm('¿Quieres borrar este usuario?')
            if (!confirmar) return

            const response = await fetch(`${url}perfil`, {
                method: 'DELETE',
                body: JSON.stringify({ username }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })

            const datos = await response.json()

            if (!response.ok) {
                setMsgeliminarusuarior(datos.error)
                return
            }

            setMsgeliminarusuarior('Usuario borrado... Saliendo...')
            redireccion('/')
        }
    }

    const handleAdminuser = async () => {
        setMsgactualizado('')

        if (adminUser == '') {
            setAdminemail('')
            setAdminusername('')
            setAdmindescripcion('')
            setAdminimagen('')
            setAdminmsg('Pon un usuario')
        }
        else {
            const response = await fetch(`${url}getUsuarioNopass/${adminUser}`, {
                method: 'GET',
                credentials: 'include'
            })

            const datos = await response.json()

            if (!response.ok) {
                setAdminmsg(datos.error)
                return
            }

            if (datos.tipo == 'artista') {
                const responseImagenes = await fetch(`${url}galeria/${adminUser}`, {
                    method: 'GET',
                    credentials: 'include'
                })

                const datosImg = await responseImagenes.json()
                const datosImgReverse = datosImg.reverse()

                if (!responseImagenes.ok) {
                    setAdminmsg('No se cargaron las imágenes')
                    return
                }

                setImagenes(datosImgReverse)
            }

            setAdminemail(datos.email)
            setAdminusername(datos.username)
            setAdmintipo(datos.tipo)
            setAdmindescripcion(datos.descripcion)
            setAdminimagen(datos.imagenperfil)
            setAdminmsg('Usuario encontrado')

            console.log(datos)
        }
    }

    const handleCrearAsociado = async (e) => {
        e.preventDefault()

        const limpiarInputs = () => {
            setCrearNombreAsociado('')
            setCrearEnlaceAsociado('')
            setCrearImagenAsociado('')
            setCrearMsg('')
            if (fileInputAsociadoRef.current) fileInputAsociadoRef.current.value = null;
        }

        console.log("nombreAsociado:", crearNombreAsociado, "enlaceAsociado:", crearEnlaceAsociado, "imagenAsociado", crearImagenAsociado)

        const response = await fetch(`${url}asociados`, {
            method: 'POST',
            body: JSON.stringify({
                nombreAsociado: crearNombreAsociado,
                enlaceAsociado: crearEnlaceAsociado,
                imagenAsociado: crearImagenAsociado
            }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })

        const error = await response.json()

        if (response.ok) {
            limpiarInputs()
        } else {
            setCrearMsg(error)
        }
    }

    const handleImagenAsociado = async (e) => {
        e.preventDefault()

        setEstadoSubida(true)

        const file = e.target.files[0]
        if (!file) return

        const formData = new FormData()
        formData.append('crearImagenAsociado', file)

        const response = await fetch(`${url}asociados/imagen`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })

        const datos = await response.json()
        if (response.ok) {
            setCrearImagenAsociado(datos)
        }
        setEstadoSubida(false)
    }

    const handleBuscarAsociado = async () => {
        setAsociadoMsgActualizado('')
        if (adminAsociado == '') {
            setBuscarNombreAsociado('')
            setBuscarEnlaceAsociado('')
            setBuscarImagenAsociado('')
            setAdminAsociado('')
            setAdminasociadoMsg('Pon un asociado')
        }
        else {
            const response = await fetch(`${url}asociados/${adminAsociado}`, {
                method: 'GET',
                credentials: 'include'
            })

            const datos = await response.json()
            console.log(datos)
            if (!response.ok) {
                setAdminasociadoMsg(datos.error)
                return
            }
            setBuscarNombreAsociado(datos.nombreAsociado)
            setBuscarEnlaceAsociado(datos.enlace)
            setBuscarImagenAsociado(datos.imagen)
            setAdminasociadoMsg('Usuario encontrado')
        }
    }

    const handleActualizarAsociado = async (e) => {
        e.preventDefault()

        setAdminasociadoMsg('')

        if (username == 'admin' && adminAsociado) {
            const response = await fetch(`${url}asociados`, {
                method: 'PUT',
                body: JSON.stringify({ adminAsociado, putNombreAsociado, putEnlaceAsociado, crearImagenAsociado }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })

            const datos = await response.json()

            if (!response.ok) {
                setAsociadoMsgActualizado(datos.error)
                return
            }

            setBuscarNombreAsociado('')
            setBuscarEnlaceAsociado('')
            setBuscarImagenAsociado('')
            setAdminAsociado('')
            if (fileInputAsociadoRef.current) fileInputAsociadoRef.current.value = null;

            setAsociadoMsgActualizado('Datos actualizados')
        }
    }

    const handleBorrarAsociado = async (e) => {
        e.preventDefault()

        const confirmar = window.confirm(`¿Quieres borrar este usuario: ${adminAsociado}`)
        if (!confirmar) return

        const response = await fetch(`${url}asociados`, {
            method: 'DELETE',
            body: JSON.stringify({
                adminAsociado
            }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })

        const datos = await response.json()

        if (!response.ok) {
            console.log(datos.error)
            return
        }

        setBuscarNombreAsociado('')
        setBuscarEnlaceAsociado('')
        setBuscarImagenAsociado('')
        setAdminAsociado('')
    }

    const handleActualizarLogins = async (e) => {
        e.preventDefault()

        setBotonLogin(!botonLogin)
        const response = await fetch(`${url}login`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })

        const datos = await response.json()

        if (!response.ok) {
            console.log(datos.error)
            return
        }

        const listaInvertida = datos.reverse()
        setListaLogins(listaInvertida)
    }

    const handleMandarReporte = (cliente, consulta) => {
        redireccion('/reporte', {
            state: { cliente, consulta }
        })
    }

    const handleGetReportes = async () => {
        try {
            const response = await fetch(`${url}reporte`, {
                headers: { 'Content-type': 'application/json' },
                credentials: 'include'
            })

            if (!response.ok) {
                console.log(response)
                return
            }

            const datos = await response.json()

            const listaReportesInvertida = datos.reverse()
            setListaReportes(listaReportesInvertida)
        } catch (error) {
            console.log(error)
        }
        setBotonReportes(!botonReportes);
    }

    const handleBorrarReportes = async (id) => {
        try {
            const response = await fetch(`${url}reporte/${id}`, {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json' },
                credentials: 'include'
            })

            if (!response.ok) {
                console.log(response)
                return
            }

            const datos = await response.json()
            console.log(datos)

            const reportesActualizados = listaReportes.filter(r => r.id != id)
            setListaReportes(reportesActualizados)
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetOpiniones = async () => {
        try {
            const response = await fetch(`${url}opiniones`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json' },
                credentials: 'include'
            })

            if (!response.ok) {
                console.log(response)
                return
            }

            const datos = await response.json()

            const listaOpinionesInvertida = datos.reverse()
            setAdminOpiniones(listaOpinionesInvertida)
        } catch (error) {
            console.log(error)
        }
        setBotonOpiniones(!botonOpiniones);
    }

    const handleBorrarOpiniones = async (id) => {
        try {
            const response = await fetch(`${url}opiniones/${id}`, {
                headers: { 'Content-type': 'application/json' },
                method: 'DELETE',
                credentials: 'include'
            })

            if (!response.ok) {
                console.log(response)
                return
            }

            const datos = await response.json()
            console.log(datos)

            const opinionesActualizadas = AdminOpiniones.filter(r => r.id != id)
            setAdminOpiniones(opinionesActualizadas)
        } catch (error) {
            console.log(error)
        }
    }

    const handlePriorizar = async (artista) => {
        try {
            const response = await fetch(`${url}perfil/admin/actualizarUsuario`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ adminUser: artista, priorizar: 'true' }),
                credentials: 'include'
            })

            if (!response.ok) {
                console.log(error)
                return
            }

        } catch (error) {
            console.log(error)
        }
    }

    if (user.username == 'admin') {
        return (
            <div className='perfilAdmin'>
                <section className='perfilUsuarios'>
                    <button className='adminCerrar' onClick={handleLogout}>
                        Cerrar sesión
                    </button>

                    <h1>Usuarios</h1>

                    <br></br>

                    <input type='text' placeholder='Buscar usuario' value={adminUser} onChange={(e) => setAdminuser(e.target.value)} />
                    <button onClick={handleAdminuser}>Buscar usuario</button>
                    <div>{adminMsg}</div>

                    {adminMsg == 'Usuario encontrado' ? <> <div className="adminDatosFlex">
                        <div><span>Nombre de usuario: </span>{adminUsername}</div>
                        <div><span>Email:</span> {adminEmail}</div>
                        <div><span>Descripción:</span> {adminDescripcion}</div>
                        <div><span>Imagen de perfil:</span> </div>
                        <img src={`${adminImagen}` || null} alt=''></img>
                    </div>

                        <div className="adminInputFlex">
                            <form onSubmit={handleActualizarUsuario}>
                                <label htmlFor="nombreUsuario">Usuario:</label><input type="text" name='nombreUsuario' placeholder='Nombre usuario' value={putUsername} onChange={(e) => setPutusername(e.target.value)} />

                                <label htmlFor="emailUsuario">Email:</label><input type="text" name='emailUsuario' placeholder='Email' value={putEmail} onChange={(e) => setPutemail(e.target.value)} />

                                <label htmlFor="descripcionUsuario">Descripción:</label><input type="text" name='descripcionUsuario' placeholder='Descripción' value={putDescripcion} onChange={(e) => setPutdescripcion(e.target.value)} />

                                <button type='submit'>Actualiza el usuario</button>
                            </form>
                        </div>

                        <form className='imagenForm'>
                            <label htmlFor="imagenUsuario">Imagen de perfil:</label>
                            <input type='file' accept='image/*' name='imagenUsuario' ref={fileInputPerfilRef} onChange={handleImagen}></input>
                        </form>

                        <div className='msgActualizado'>{msgActualizado}</div>

                        {adminTipo == 'artista' ? <GaleriaProfesional usuario={{ username: adminUsername }} datosImagenes={imagenes} galeria={false}></GaleriaProfesional> : null}

                        <div className="botonesUsuario">
                            <button onClick={handleBorrarusuario}>Eliminar usuario</button>
                            {adminTipo == 'artista' ? <button onClick={() => { handlePriorizar(adminUsername) }}>Priorizar artista</button> : null}
                        </div>
                    </> : null}
                </section>

                <section className='perfilAsociados'>
                    <h1>Asociados</h1>

                    <br></br>
                    <br></br>

                    <div className='crearAsociado'>
                        <h3>Crear asociado:</h3>

                        <div className='wrapperCrearAsociado'>
                            <form onSubmit={handleCrearAsociado}>
                                <div>
                                    <label htmlFor="nombre">Nombre de asociado:</label>
                                    <input type="text" name="crearNombreAsociado" required value={crearNombreAsociado} onChange={(e) => setCrearNombreAsociado(e.target.value)} />
                                    {crearMsg}
                                </div>

                                <div>
                                    <label htmlFor="enlace">Enlace:</label>
                                    <input type="string" name="crearEnlaceAsociado" required value={crearEnlaceAsociado} onChange={(e) => setCrearEnlaceAsociado(e.target.value)} />
                                </div>

                                <div>
                                    <label htmlFor="imagen">Imagen:</label>
                                    <input type="file" name="crearImagenAsociado" accept="image/*" required ref={fileInputAsociadoRef} onChange={handleImagenAsociado} />
                                </div>

                                <button type="submit" disabled={estadoSubida || !crearImagenAsociado}>Crear Asociado</button>
                            </form>
                        </div>
                    </div>

                    <br></br>
                    <br></br>

                    <h3>Buscar asociado</h3>

                    <br></br>

                    <input type='text' placeholder='Buscar asociado' value={adminAsociado} onChange={(e) => setAdminAsociado(e.target.value)} />
                    <button onClick={handleBuscarAsociado}>Buscar asociado</button>
                    <div>{adminAsociadoMsg}</div>

                    <br></br>

                    {adminAsociadoMsg == 'Usuario encontrado' ? <><div className="adminDatosFlex">
                        <div><span>Nombre de asociado:</span> {buscarNombreAsociado}</div>
                        <div><span>Enlace:</span> {buscarEnlaceAsociado}</div>
                        <div><span>Imagen:</span></div>
                        <img src={`${buscarImagenAsociado}` || null} alt=''></img>
                    </div>

                        <div className="adminInputFlex">
                            <form onSubmit={handleActualizarAsociado}>
                                <label htmlFor="crearNombreAsociado">Asociado:</label>
                                <input type="text" placeholder='Nombre asociado' value={putNombreAsociado} onChange={(e) => setPutNombreAsociado(e.target.value)} />

                                <label htmlFor="crearNombreAsociado">Enlace:</label>
                                <input type="text" placeholder='Enlace web' value={putEnlaceAsociado} onChange={(e) => setPutEnlaceAsociado(e.target.value)} />

                                <button type='submit'>Actualizar asociado</button>
                            </form>
                        </div>

                        <form className='imagenForm'>
                            <label htmlFor="imagenAsociado">Imagen de asociado:</label>
                            <input type='file' accept='image/*' name='imagenAsociado' ref={fileInputAsociadoRef} onChange={handleImagenAsociado}></input>
                        </form>

                        <div className='msgActualizado'>{asociadoMsgActualizado}</div>

                        <button onClick={handleBorrarAsociado}>Eliminar asociado</button>
                    </> : null}
                </section>

                <section className='perfilReportes'>
                    <h1>Reportes</h1>

                    <br></br>

                    <button onClick={handleGetReportes}>{botonReportes == true ? 'Mostrar reportes' : 'Ocultar reportes'}</button>

                    {botonReportes == false ? <section className='perfilListaReportes'>
                        {listaReportes.length > 0 ? listaReportes.map((r) => (
                            <article key={r.id}>
                                <div><span>Usuario reportado:</span> {r.username}</div>
                                <div><span>Mensaje:</span> {r.mensaje}</div>
                                <div><span>Motivo:</span> {r.motivo}</div>
                                <div className='divIconReportes'><VscTrash className='iconReportes' onClick={() => { handleBorrarReportes(r.id) }} /></div>
                            </article>)) : <></>}
                    </section> : <></>}
                </section>

                <section className='perfilOpiniones'>
                    <h1>Opiniones</h1>

                    <br></br>

                    <button onClick={handleGetOpiniones}>{botonOpiniones == true ? 'Mostrar opiniones' : 'Ocultar opiniones'}</button>

                    {botonOpiniones == false ? <section className='perfilAdminOpiniones'>
                        {AdminOpiniones.length > 0 ? AdminOpiniones.map((r) => (
                            <article key={r.id}>
                                <div><span>Usuario:</span> {r.username}</div>
                                <div><span>Opinión:</span> {r.opinion}</div>
                                <div className='divIconReportes'><VscTrash className='iconReportes' onClick={() => { handleBorrarOpiniones(r.id) }} /></div>
                            </article>)) : <></>}
                    </section> : <></>}
                </section>

                <section className='perfilLogins'>
                    <h1>Logins</h1>

                    <br></br>

                    <button onClick={handleActualizarLogins}>{botonLogin ? "Mostrar logins" : "Ocultar logins"}</button>

                    {botonLogin == false ? (listaLogins.length === 0 ? (<div>No hay registros</div>) : (
                        <table className="tablaLogins">
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                </tr>
                            </thead>

                            <tbody>
                                {listaLogins.map(l => (
                                    <tr key={l.id}>
                                        <td>{l.usuario}</td>
                                        <td>{l.fecha}</td>
                                        <td>{l.hora}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )) : null}
                </section>
            </div>
        )
    }
    else if (user.tipo == 'cliente') {
        return (
            <div className='perfilCliente'>
                <section className='perfilDatos'>
                    <div><span>Tu nombre:</span> {username}</div>

                    <div className='perfilContraseña'><span>Tu contraseña:</span>
                        <input type='password' name='perfilPassword' placeholder='Contraseña actual' value={prevPassword} onChange={(e) => { setPrevpassword(e.target.value) }} />

                        <input type='password' name='perfilcheckPassword' placeholder='Nueva contraseña' value={newPassword} onChange={(e) => { setNewpassword(e.target.value) }} />
                    </div>

                    <div className='errorValidacion'>
                        {errorDatos}
                    </div>

                    <button onClick={handlePassword}>Actualizar contraseña</button>

                    <div><span>Tu imagen de perfil:</span></div>

                    <form action="/perfil/imagen" method='post' encType='multipart/form-data'>
                        <input type='file' accept='image/*' name='imagenPerfil' onChange={handleImagen}></input>
                    </form>
                </section>

                <section className='perfilImagen'>
                    {rutaImagen ? <img src={`${rutaImagen}`} alt="" /> : <img src="Logo.png" alt="" />}
                </section>

                <section className='perfilCuenta'>
                    <button onClick={handleLogout}>
                        Cerrar sesión
                    </button>

                    <button onClick={handleBorrarusuario}>
                        Eliminar cuenta
                        <h3>Cuidado!</h3>
                    </button>

                    <div className='errorValidacion'>
                        {msgEliminarusuarior}
                    </div>
                </section>
            </div>
        )
    } else if (user.tipo == 'artista') {
        return (
            <div className='perfilArtista'>
                <div className='wrapperPerfil'>
                    <section className='perfilDatosArtista'>
                        <div><span>Tu nombre:</span> {username}</div>

                        <div className='perfilContraseña'><span>Tu contraseña:</span>
                            <input type='password' name='perfilPassword' value={prevPassword} placeholder='Contraseña actual' onChange={(e) => { setPrevpassword(e.target.value) }} />

                            <input type='password' name='perfilcheckPassword' value={newPassword} placeholder='Contraseña nueva' onChange={(e) => { setNewpassword(e.target.value) }} />
                        </div>

                        <div className='errorValidacion'>
                            {errorDatos}
                        </div>

                        <button onClick={handlePassword}>Actualizar contraseña</button>

                        <div><span>Tu imagen de perfil:</span></div>

                        <form action="/perfil/imagen" method='post' encType='multipart/form-data'>
                            <input type='file' accept='image/*' name='imagenPerfil' onChange={handleImagen}></input>
                        </form>

                        <label htmlFor='descripcion'><span>Tu descripción:</span></label>
                        <textarea id='descripcion' name='descripcion' value={descripcion} maxLength='200' onChange={(e) => { setDescripcion(e.target.value) }}></textarea>
                        <button onClick={handleDescripcion}>Actualizar descripción</button>

                        <div className='errorValidacion'>
                            {msgDescripcion}
                        </div>

                        <div><span>Email de contacto:</span></div>
                        <div>{`${email}`}</div>
                    </section>

                    <section className='perfilImagen'>
                        {rutaImagen ? <img src={`${rutaImagen}`} alt="" /> : <img src="Logo.png" alt="" />}
                    </section>

                    <section className='perfilCuenta'>
                        <button onClick={handleLogout}>
                            Cerrar sesión
                        </button>

                        <button onClick={handleBorrarusuario}>
                            Eliminar cuenta
                            <h3>Cuidado!</h3>
                        </button>

                        <div className='errorValidacion'>
                            {msgEliminarusuarior}
                        </div>
                    </section>

                    {consultas.length > 0 ? <section className='perfilConsultas'>
                        <h2>Consultas de clientes</h2>
                        <ul>
                            {consultas.map(c => (
                                <li key={c.id}>
                                    <div className='consultaNombre'>{c.cliente}:</div>
                                    <div className='consultaContacto'>Contacto: {c.contacto}</div>
                                    <div className='consultaAsunto'>{c.consulta}</div>
                                    <VscReport className='iconReport' onClick={() => { handleMandarReporte(c.cliente, c.consulta) }} />
                                </li>
                            )
                            )}
                        </ul>
                    </section> : null}
                    <GaleriaProfesional usuario={user} datosImagenes={imagenes} galeria={false}></GaleriaProfesional>
                </div>
            </div>
        )
    }
    else {
        return null
    }
}
