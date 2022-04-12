import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./noticias.css";
import Navbar from "./NavBar";
import Blog from "./img/Blog.jpg";
import artículos from "./img/artículos.jpg";
import Geología from "./img/Geología.jpg"
import Economía from "./img/Economía.png"



const Noticias = () => {

    const [noticias, setNoticias] = useState([])
    const token = localStorage.getItem("token")
    //tendrás que coger el role cuando sea post ya que para esto necesitas ser administrador


    useEffect(() => {
        const getNoticias = async () => {
            const response = await axios.get("/api/news", {
                headers: { // esto para cuando la ruta es privada (auth, es decir necesitas token)
                    "Authorization": token
                }
            })
            console.log(response)

            setNoticias(response.data.news) // hay que poner lo del back
        }

        getNoticias()

    }, []) // se pone array vacío porque si no sería un bucle infinito, renderizaría continuamente, con la array hace el renderizado hasta que encuentre toda la array. 

    return (
        <div className="fondo">
            <Navbar />
            <h1><img className="GeoEco2" src= {Economía} /><span className="geo">Geo</span><span className="eco">Eco</span> <img className="GeoEco2" src= {Geología} /></h1>
            <h2 className="web">La web del Conocimiento</h2>
            <h1 className="tenemos2pay">Todas nuestras Noticias  <img className="GeoEco2" src= {artículos} /></h1>
          {

                noticias.map(noticia => {
                    return (

                     

                        <Link key={noticia._id} to={`/noticias/${noticia._id}`}>

                            <div className="caja">
                               
                            <h3 className="tituloV"> <span className="titulovid">Título:</span>  {noticia.titleNew} </h3>
                            <h3 className="videoN">Noticia: </h3>
                            <h3 className="likes2V"> <span className="videotil">Nº de Likes:</span> {noticia.likes.length} </h3>
                            <p className="cate"><span className="videotil">Categoría:</span> {noticia.category.categoryName} </p>

                            </div>
                        </Link>

                    )
                })
            }
          
            <Link to="/contenido" className="registroboton3  nav-link active " >Atrás</Link>
            <h1 className="ahora">Ahora puedes disfrutar de todos los Noticias de nuestro <span className="blog2">Blog</span></h1>
            <h1 className="siguenos">Síguenos en nuestro Blog <span className="blog">GeoEco</span> !</h1>
            <img className="ecocien2" src= {Blog} />
            
        </div>
    )
}


export default Noticias;