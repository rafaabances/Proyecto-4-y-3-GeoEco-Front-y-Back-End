import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./getCategories.css";
import Navbar from "./NavBar";
import Cat from "./img/cat.jpg";
import Categoría from "./img/categoria.jpg";
import GetCategory from "./DeleteCategory";
import Geología from "./img/Geología.jpg"
import Economía from "./img/Economía.png"



const GetCategories = () => {


    const [categories, setCategories] = useState([])
    const token = localStorage.getItem("token")
    //tendrás que coger el role cuando sea post ya que para esto necesitas ser administrador






    useEffect(() => {
        const getCategories = async () => {
            const response = await axios.get("/api/categories", {
                headers: { // esto para cuando la ruta es privada (auth, es decir necesitas token)
                    "Authorization": token
                }
            })
            console.log(response)

            setCategories(response.data.categories) // hay que poner lo del back
        }

        getCategories()

    }, []) // se pone array vacío porque si no sería un bucle infinito, renderizaría continuamente, con la array hace el renderizado hasta que encuentre toda la array. 









    return (
        <div className="fondo">
            <Navbar />
            <h1><img className="GeoEco2" src= {Economía} /><span className="geo">Geo</span><span className="eco">Eco</span> <img className="GeoEco2" src= {Geología} /></h1>
            <h2 className="web">La web del Conocimiento</h2>
            <h1 className="tenemos2pay">Las Categorias:  <img className="GeoEco2" src={Cat} /></h1>
            {

                categories.map(category => {
                    return (

                        <Link key={category._id} to={`/consultarcategorias/${category._id}`}>

                            <div className="caja" >

                                <h5 className="tiposus"> <span className="dirC">Categoría:</span>  {category.categoryName} </h5>
                                
                                <GetCategory />

                            </div>
                        </Link>

                    )
                })
            }

    

            <Link to="/contenido" className="registroboton3  nav-link active " >Atrás</Link>
            <img className="iconocat" src={Categoría} />
        </div>
    )
}


export default GetCategories;