import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footerWrapper'>

        <div className='redes'>
          <h3>Nuestras redes</h3>

          <ul>
            <Link to={'http://www.instagram.com'} target='_blank'><li>Instagram</li></Link>
            <Link to={'http://www.facebook.com'} target='_blank'><li>Facebook</li></Link>
            <Link to={'http://www.tiktok.com'} target='_blank'><li>TikTok</li></Link>
          </ul>
        </div>

        <div className='ayuda'>
          <h3>Ayuda</h3>
          <ul>
            <Link to='/empezando'><li>Empezando</li></Link>
            <li>Servicios</li>
            <Link to={'/contacto'}><li>Contacto</li></Link>
          </ul>
        </div>

        <div className='enlaces'>
          <h3>Enlaces</h3>
          <ul>
            <Link to={'/profesionales'}><li>Nuestros artistas</li></Link>
            <Link to={'/asociados'}><li>Asociados</li></Link>
            <Link to={'/registro'}><li>Regístrate</li></Link>
          </ul>
        </div>
      </div>
    </footer>
  )
}
