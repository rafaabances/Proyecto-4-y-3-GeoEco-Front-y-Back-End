import React from "react";
import "./contacto.css";
import GeoEco from "./img/GeoEco2.jpg";
import GeoEco1 from "./img/GeoEco1.jpg";
import videos from "./img/videos.jpg";
import artículos from "./img/artículos.jpg";


import { Link } from "react-router-dom";

const Contacto = () => {
    
    return (
        <div className="fondo">
            <h1><span className="geo">Geo</span><span className="eco">Eco</span></h1>
            <h2 className="web">La web del Conocimiento</h2>
            <img className="GeoEco" src= {GeoEco} />
            <h5 className="quienes">¿Quénes somos?</h5>

            <p className="registrate">Somos una web de contenidos que funciona como tu enciclopedia electrónica, dinámica y potenciadora de conocimiento.
            nuestro equipo, lleva trabajando en ella desde 2015. <p>
               
            </p><span className="geoe">GeoEco</span> contiene una gran cantidad de información 
            dividida en dos tipos, Vídeos <img className="GeoEco2" src= {videos} /> y Artículos  <img className="GeoEco2" src= {artículos} />, de momento solo tenemos 2 categorias Geología y Economía 
            pero en el futuro con tu apoyo crearemos muchas más.</p>

            <p className="registrate2">Regístrate y disfruta de un contenido inolvidable !!!!</p>

            <Link  to="/registro" className="registroboton nav-link active " >Registro</Link>

            <p className="pregunta">¿Ya tienes cuenta?</p>
            <Link to="/login" className="registroboton nav-link active" >Sign In</Link>

    

            <p className="exclama">Únete a nuestra comunidad! </p>

            <img className="GeoEco" src= {GeoEco1} />
        </div>
    )
}


export default Contacto;