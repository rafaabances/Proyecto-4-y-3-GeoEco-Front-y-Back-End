
import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import Contenido from './Components/Contenido';
import Contacto from './Components/Contacto';

import Noticias from "./Components/Noticias";
import Noticia from './Components/Noticia';
import CreateCommentN from './Components/CrearComentarioN';
import CreateNoticia from './Components/CreateNoticia';

import Videos from './Components/Videos';
import Videocompo from './Components/Videocompo';
import CreateCommentV from './Components/CrearComentarioV';
import CreateVideo from './Components/CreateVídeo';

import Paycompo from './Components/Paycompo';
import GetPay from './Components/GetPays';

import CreateCategory from './Components/CreateCategory';

import { Routes, Route } from "react-router-dom"




import Footer from './Components/Footer';

import Logout from './Components/LogOut';


const App = () => { // function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/pago" element={<Paycompo />} />
        <Route path="/contenido" element={<Contenido />} />

        <Route path="/noticias" element={<Noticias />} />
        <Route path="/noticias/:noticiaId" element={<Noticia />} />
        <Route path="/comentarioblog/:noticiaId" element={<CreateCommentN />} />
        <Route path="/crearnoticia" element={<CreateNoticia />} />

        <Route path="/videos" element={<Videos />} />
        <Route path="/videos/:videoId" element={<Videocompo />} />
        <Route path="/comentariovideo/:videoId" element={<CreateCommentV />} />
        <Route path="/crearvideo" element={<CreateVideo />} />
        
        <Route path="/logout" element={<Logout />} />

        <Route path="/crearcategoria" element={<CreateCategory />} />


        <Route path="/consultarpagos" element={<GetPay />} />

      </Routes>
      <Footer />

    </div>
  );
}

export default App;
