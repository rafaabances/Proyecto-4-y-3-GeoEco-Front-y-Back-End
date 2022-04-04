import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./videos.css";
import Navbar from "./NavBar";



const Videos = () => {

    const [videos, setVideos] = useState([])
    const token = localStorage.getItem("token")
    //tendrás que coger el role cuando sea post ya que para esto necesitas ser administrador


    useEffect(() => {
        const getVideos = async () => {
            const response = await axios.get("http://localhost:5000/api/videos", {
                headers: { // esto para cuando la ruta es privada (auth, es decir necesitas token)
                    "Authorization": token
                }
            })
            console.log(response)

            setVideos(response.data.videos) // hay que poner lo del back
        }

        getVideos()

    }, []) // se pone array vacío porque si no sería un bucle infinito, renderizaría continuamente, con la array hace el renderizado hasta que encuentre toda la array. 

    return (
        <div>
            <Navbar/>
            <h1 className="videosh1">GeoEco</h1>
            <h2 className="videosh2">La web del Conocimiento</h2>

            {

                videos.map(video => {
                    return (

                        <Link key={video._id} to={`/videos/${video._id}`}>

                            <div >

                                <h3 className="videosh3"> {video.titleVideo} </h3>

                            </div>
                        </Link>

                    )
                })
            }

            <Link to="/contenido" className="geo nav-link active " >Atrás</Link>

        </div>
    )
}


export default Videos;