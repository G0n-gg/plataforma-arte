import { url } from "../../config/config"

export const Asociado = ({enlace, imagen}) => {

  return (
    <div className='asociado'>
        <a href={enlace} target='_blank'><img src={`${imagen}` ? `${imagen}` : 'Logo.png'  } alt='Imagen de asociado' /></a>
    </div>
  )
}