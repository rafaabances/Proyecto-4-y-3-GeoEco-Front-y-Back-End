import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./noticias.css";
import Navbar from "./NavBar";



const Noticias = () => {

    const [noticias, setNoticias] = useState([])
    const token = localStorage.getItem("token")
    //tendrás que coger el role cuando sea post ya que para esto necesitas ser administrador


    useEffect(() => {
        const getNoticias = async () => {
            const response = await axios.get("http://localhost:5000/api/news", {
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
        <div>
            <Navbar />
            <h1 className="noticiash1">GeoEco</h1>
            <h2 className="noticiash2">La web del Conocimiento</h2>
            {

                noticias.map(noticia => {
                    return (

                        <Link key={noticia._id} to={`/noticias/${noticia._id}`}>

                            <div >

                                <h3 className="noticiash3"> {noticia.titleNew} </h3>

                            </div>
                        </Link>

                    )
                })
            }
            <Link to="/contenido" className="geo nav-link active " >Atrás</Link>
        </div>
    )
}


export default Noticias;