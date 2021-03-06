import React from "react";
import "./contacto.css";
import GeoEco from "./img/GeoEco2.jpg";
import GeoEco1 from "./img/GeoEco1.jpg";
import videos from "./img/videos.jpg";
import artículos from "./img/artículos.jpg";
import Mapa from "./img/Mapa.jpg";
import Direccion from "./img/Direccion.jpg";
import Geología from "./img/Geología.jpg"
import Economía from "./img/Economía.png"


import { Link } from "react-router-dom";

const Contacto = () => {
    
    return (
        <div className="fondo">
            <h1><img className="GeoEco2" src= {Economía} /><span className="geo">Geo</span><span className="eco">Eco</span> <img className="GeoEco2" src= {Geología} /></h1>
            <h2 className="web">La web del Conocimiento</h2>
            <h1 className="tenemos2pay">Contacto</h1>
            <img className="GeoEco" src= {GeoEco} />
            <h5 className="quienes">¿Quiénes somos?</h5>

            <div className="resaltar">

            
            <p className="registrate">Somos una web de contenidos que funciona como tu enciclopedia electrónica, dinámica y potenciadora de conocimiento.
            nuestro equipo, lleva trabajando en ella desde 2015. <p>
               
            </p><span className="geoe">GeoEco</span> contiene una gran cantidad de información 
            dividida en dos tipos, Vídeos <img className="GeoEco2" src= {videos} /> y Artículos  <img className="GeoEco2" src= {artículos} />, de momento solo tenemos 2 categorias Geología y Economía 
            pero en el futuro con tu apoyo crearemos muchas más.</p>

            </div>

            <p className="registrate2">Regístrate y disfruta de un contenido inolvidable !!!!</p>

            <Link  to="/registro" className="registroboton nav-link active " >Registro</Link>

            <p className="pregunta">¿Ya tienes cuenta?</p>
            <Link to="/login" className="registroboton nav-link active" >Sign In</Link>

            <h5 className="quienes">Nos encontraras fisicamente en:</h5>
            <img className="mapa" src= {Mapa} />

            <h5 className="quienes">Nuestra dirección:</h5>
            <img className="direccion" src= {Direccion} />

            <p className="exclama">Únete a nuestra comunidad! </p>

            <img className="GeoEco" src= {GeoEco1} />
        </div>
    )
}


export default Contacto;