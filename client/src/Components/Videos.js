import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./videos.css";
import Navbar from "./NavBar";
import videos2 from "./img/videos.jpg";
import Youtube from "./img/Youtube.jpg"
import Geología from "./img/Geología.jpg"
import Economía from "./img/Economía.png"



const Videos = () => {

    const [videos, setVideos] = useState([])
 
    const token = localStorage.getItem("token")
    //tendrás que coger el role cuando sea post ya que para esto necesitas ser administrador


    useEffect(() => {
        const getVideos = async () => {
            const response = await axios.get("/api/videos", {
                headers: { // esto para cuando la ruta es privada (auth, es decir necesitas token)
                    "Authorization": token
                }
            })
            // console.log(response)

            setVideos(response.data.videos) // hay que poner lo del back
            
            // setCategory(response.data.videos.category)
            // console.log(response.data.videos.category)
        }

        getVideos()

    }, []) // se pone array vacío porque si no sería un bucle infinito, renderizaría continuamente, con la array hace el renderizado hasta que encuentre toda la array. 

    return (
        <div className="fondo">
            <Navbar />
            <h1><img className="GeoEco2" src={Economía} /><span className="geo">Geo</span><span className="eco">Eco</span> <img className="GeoEco2" src={Geología} /></h1>
            <h2 className="web">La web del Conocimiento</h2>
            <h1 className="tenemos2pay">Todos nuestros Vídeos  <img className="GeoEco2" src={videos2} /></h1>
            {

                videos.map(video => {
                    return (

                        <Link key={video._id} to={`/videos/${video._id}`}>

                            <div className="caja" >

                                <h3 className="tituloV"> <span className="titulovid">Título:</span> {video.titleVideo} </h3>
                                <h3 className="videoV">Vídeo:{video.videoV} </h3>
                                <h3 className="likes2V"> <span className="videotil">Nº de Likes:</span> {video.likes.length} </h3>
                                <p className="cate"><span className="videotil">Categoría:</span> {video.category.categoryName} </p>



                            </div>
                        </Link>

                    )
                })
            }
            
        
         

            <Link to="/contenido" className="registroboton3  nav-link active " >Atrás</Link>
            <h1 className="ahora">Ahora puedes disfrutar de todos los Vídeos de nuestro canal de  <span className="youtube2">Youtube</span></h1>
            <h1 className="siguenos">Síguenos en nuestro canal de <span className="youtube">Youtube</span> !</h1>
            <img className="ecocien2" src={Youtube} />
        </div>
    )
}


export default Videos;