import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Inicio } from '../components/pages/Inicio'
import { Registro } from '../components/pages/Registro'
import { Profesionales } from '../components/pages/Profesionales'
import { Asociados } from '../components/pages/Asociados'
import { Contacto } from '../components/pages/Contacto'
import { Perfil } from '../components/pages/Perfil'
import { ProfesionalPerfil } from '../components/pages/ProfesionalPerfil'
import { Login } from '../components/pages/Login'
import { Galeria } from '../components/pages/Galeria'
import { CookieProvider } from '../context/CookieContext'
import { Reporte } from '../components/pages/Reporte'
import { Opiniones } from '../components/pages/Opiniones'
import { Empezando } from '../components/pages/Empezando'

export const Rutas = () => {
  return (
    <CookieProvider>
      <Routes>
        <Route path='/' element={<Inicio></Inicio>}></Route>
        <Route path='/inicio' element={<Inicio></Inicio>}></Route>
        <Route path='/registro' element={<Registro></Registro>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/perfil' element={<Perfil></Perfil>}></Route>
        <Route path='/perfil/:username' element={<ProfesionalPerfil></ProfesionalPerfil>}></Route>
        <Route path='/profesionales' element={<Profesionales></Profesionales>}></Route>
        <Route path='/galeria' element={<Galeria></Galeria>}></Route>
        <Route path='/asociados' element={<Asociados></Asociados>}></Route>
        <Route path='/contacto' element={<Contacto></Contacto>}></Route>
        <Route path='/reporte' element={<Reporte></Reporte>}></Route>
        <Route path='/opiniones' element={<Opiniones></Opiniones>}></Route>
        <Route path='/empezando' element={<Empezando></Empezando>}></Route>
      </Routes>
    </CookieProvider>
  )
}
