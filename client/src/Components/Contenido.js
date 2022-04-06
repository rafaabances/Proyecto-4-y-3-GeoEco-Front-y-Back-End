import React from "react";
import Icon from "./img/Icon.svg";
import NewIcon from "./img/NewIcon.png";
import Navbar from "./NavBar";
import { Link } from "react-router-dom";
import "./contenido.css";
import videos from "./img/videos.jpg";
import artículos from "./img/artículos.jpg";
import ciencia from "./img/Ciencia.jpg";
import economía from "./img/Eco.jpg";

const Contenido = () => {
    
    return (
        <div className="fondo">
            <Navbar/>
            <h1><span className="geo2">Geo</span><span className="eco2">Eco</span></h1>
            <h2 className="web">La web del Conocimiento</h2>
            <h5 className="tenemos">En <span className="geo2">Geo</span><span className="eco2">Eco</span> tenemos un gran número de contenidos para ti! </h5>

            <img className="ecocien" src= {economía} />

            <p className="preguntare2">  <img className="GeoEco2" src= {artículos} /> Accede a nuestros <span className="artvid">Artículos</span></p>
            <img className="icono" src= {NewIcon} />
            <Link to="/noticias" className="registroboton2 nav-link active " >Artículos</Link>

            <p className="preguntare2"> Accede a nuestros <span className="artvid">Vídeos</span> <img className="GeoEco2" src= {videos} /></p>
            <img className="icono" src= {Icon} />
            
            <Link to="/videos" className="registroboton2 nav-link active " >Vídeos</Link>
            


          
            <img className="ecocien" src= {ciencia} />
        </div>
    )
}


export default Contenido;