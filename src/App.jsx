import { useState } from 'react'
import { Rutas } from './routes/Rutas'
import { Cabecera } from './components/layout/Cabecera'
import { Nav } from './components/layout/Nav'
import { Footer } from './components/layout/Footer'

function App() {
  const [visible, setVisible] = useState(false);

  return (
      <div id='wrapper'>
      <Cabecera setVisible={setVisible} />
      <Nav visible={visible} setVisible={setVisible} />
      <div className="paginas">
        <Rutas />
      </div>
      <Footer />
    </div>
  )
}

export default App
