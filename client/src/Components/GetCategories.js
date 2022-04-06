import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./getCategories.css";
import Navbar from "./NavBar";
import Cat from "./img/cat.jpg";
import Categoría from "./img/categoria.jpg";



const GetCategories = () => {
    const { categoryId } = useParams() //recibes el prámetro de Noticias Js

    const [categories, setCategories] = useState([])
    const token = localStorage.getItem("token")
    //tendrás que coger el role cuando sea post ya que para esto necesitas ser administrador

    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)



    const navigate = useNavigate()

    useEffect(() => {
        const getCategories = async () => {
            const response = await axios.get("http://localhost:5000/api/categories", {
                headers: { // esto para cuando la ruta es privada (auth, es decir necesitas token)
                    "Authorization": token
                }
            })
            console.log(response)

            setCategories(response.data.categories) // hay que poner lo del back
        }

        getCategories()

    }, []) // se pone array vacío porque si no sería un bucle infinito, renderizaría continuamente, con la array hace el renderizado hasta que encuentre toda la array. 


    const deleteCategory = async () => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/deletecategory/${categoryId}`, {
                headers:
                {
                    "Authorization": token
                }
            })
            setSuccessMessage(res.data.message)
            setTimeout(() => {
                navigate("/consultarcategorias")
            }, 3000) // tiempo en milisegundos para ir de un endpoint a otro.

        } catch (error) {
            setErrorMessage(error.res.data.message)
        }
    }






    return (
        <div className="fondo">
            <Navbar />
            <h1><span className="geo">Geo</span><span className="eco">Eco</span></h1>
            <h2 className="web">La web del Conocimiento</h2>
            <h1 className="tenemos2pay">Las Categorias:  <img className="GeoEco2" src={Cat} /></h1>
            {

                categories.map(category => {
                    return (

                        <Link key={category._id} to={`/consultarcategorias/${category._id}`}>

                            <div className="caja" >

                                <h5 className="tiposus"> <span className="dirC">Categoría:</span>  {category.categoryName} </h5>
                                <button className="botonborrarcat" onClick={deleteCategory}>Borrar Categoría</button>


                            </div>
                        </Link>

                    )
                })
            }

            <div className="message_ok" style={{ display: successMessage ? "block" : "none" }}>
                {successMessage}
            </div>

            <div className="message_error" style={{ display: errorMessage ? "block" : "none" }}>
                {errorMessage}
            </div>

            <Link to="/contenido" className="registroboton3  nav-link active " >Atrás</Link>
            <img className="iconocat" src={Categoría} />
        </div>
    )
}


export default GetCategories;