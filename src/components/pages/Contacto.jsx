export const Contacto = () => {
  return (
    <div className='contacto'>
      <form action='' method=''>
        <div>
          <label htmlFor='nombre'>Nombre:</label>
          <input type='text' name='nombre' id='nombre' placeholder='Tu nombre...'/>
        </div>
        <div>
          <label htmlFor='apellido'>Apellido:</label>
          <input type='text' name='apellido' id='apellido' placeholder='Tu apellido...' />
        </div>
        <div>
          <label htmlFor='asunto'>Asunto</label>
          <input type='text' name='asunto' id='asunto' placeholder='Motivo de tu consulta' />
        </div>
        <div>
          <label htmlFor='comentario'>Escribe aquí tu consulta:</label>
          <textarea name="comentario" id="comentario" placeholder='Cuéntanos...'></textarea>
        </div>
        <div>
          <button type='submit'>Enviar consulta</button>
        </div>
      </form>
    </div>
  )
}
