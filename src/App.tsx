import icon from './assets/icon.png'
import manutencao2 from './assets/pagina-em-manutencao.png'
import './App.css'

function App() {


  return (
    <>
      <div>
        < div className='manutencao' >
          <img src={manutencao2} className='img-manutencao' alt="Tequaly logo" />
        </div >
        <div>
          <h1>O sistema logo, logo estará de volta...</h1>
        </div>
        <img src={icon} className="logo-img" alt="Img logo" />
      </div>
    </>
  )
}

export default App
