export const ImagenProfesional = ({ artistaUsername, enlace, onBorrar, borrarImagenUsuario, galeria, ampliacion}) => {

    const ampliar = () => {
        ampliacion(`${enlace}`)
    }

    return (
        <article className='imagenProfesional'>
            { galeria != true ? <></> : <div className='imagenUsuario'>{artistaUsername}</div> }
            <div className='imagenProfUsuario' onMouseOver={ampliacion ? ampliar : undefined}>
                <img src={enlace ? `${enlace}` : 'Logo.png'} alt={`Imagen del usuario ${artistaUsername}` }  />
            </div>
                { galeria != true ? (<button onClick={() => (onBorrar(borrarImagenUsuario, enlace))}>Borrar imagen</button>): (<></>) }
        </article>
    );
}; 