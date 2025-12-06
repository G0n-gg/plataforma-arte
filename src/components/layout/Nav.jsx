import { Link } from 'react-router-dom'
import { VscChromeClose } from 'react-icons/vsc';


export const Nav = ({ visible, setVisible }) => {

  if (visible) {
    return (
      <nav className='nav'>
        <div className='botonCerrarNav'>
          <VscChromeClose className='iconMenu' onClick={() => { setVisible(prev => !prev) }} />
        </div>
        
        <div className='logo'>
          <Link to={'/inicio'}>
            <img src='/Logo.png' alt='' />
          </Link>
        </div>

        <Link to={'/registro'}>
          <h1>ÚNETE, EXPLORA</h1>
        </Link>

        <Link to={'/login'}>
          <h1>Inicia sesión</h1>
        </Link>

        <Link to={'/perfil'}>
          <h1>Mi perfil</h1>
        </Link>
        
        <ul>
          <li> <Link to={'/profesionales'}>Profesionales</Link></li>
          <li> <Link to={'/galeria'}>Galería</Link></li>
          <li> <Link to={'/contacto'}>Contacto</Link></li>
          <li> <Link to={'/asociados'}>Asociados</Link></li>
          <li> <Link to={'/opiniones'}>Opiniones</Link></li>
        </ul>

      </nav>
    )
  }
  else {
    return null;
  }
}
