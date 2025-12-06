import { useLocation } from 'react-router-dom'
import { url } from '../../config/config'

export const Profesional = ({nombre, descripcion, imagen}) => {
  const ruta = useLocation().pathname

  return (
    <div className="cardProf">
      <div className="profDat">
        <p>{nombre}</p>
        <p>{descripcion}</p>
      </div>
      <div className="profImg">
        {imagen == '' ? <img src='Logo.png' alt='' /> :<img src={`${imagen}`}  alt='' />         
        }
      </div>
    </div>
  )
}