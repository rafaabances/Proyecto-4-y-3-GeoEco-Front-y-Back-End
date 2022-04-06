import React, { useState } from "react";
import "./createcategory.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./NavBar";
import Cat from "./img/cat.jpg";
import Categoría from "./img/categoria.jpg";


const CreateCategory = () => {
    const token = localStorage.getItem("token")
    const [category, setCategory] = useState({
        categoryName: "",
    
    })

    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)


    const onChangeInput = e => { //e=event
        const { name, value } = e.target // con target guardamos los datos que vamos escribiendo dentro de nuestro input.
        setCategory({ ...category, [name]: value })
    }


    console.log(category)


    const registerSubmit = async e => {
        e.preventDefault() // no se refresca la página cuando llamas a la función, con esto no envía datos hasta que no se da a registro


        try {
            const response = await axios.post("http://localhost:5000/api/newcategory", { ...category }, {
                headers:{
                    "Authorization": token
                }
            });
            
            console.log(response)
            // localStorage.setItem("token", response.data.accessToken ) // esto irá en el login
            setSuccessMessage(response.data.message)
         // tiempo en milisegundos para ir de un endpoint a otro.

        } catch (error) {
            setErrorMessage(error.response.data.message)
        }
    }

    return (
        <div className="fondocv" >
            <Navbar/>
            <form onSubmit={registerSubmit} className="registro" >
                <h2 className="Crearvidcat" >Crear <span className="crearcat">Categoría </span> <img className="GeoEco2cat" src= {Cat} /></h2>
                <label className="labelCV" htmlFor="name">Nombre de la Categoría</label>
                <input className="expand-lg borR" type="text" name="categoryName" value={category.name} placeholder="Introduzca la nueva categoría" onChange={onChangeInput} />
                <button className="botonRcv btn btn-outline-dark " type="Submit">Crear Categoría</button>



                <div className="message_ok" style={{ display: successMessage ? "block" : "none" }}>
                    {successMessage}
                </div>

                <div className="message_error" style={{ display: errorMessage ? "block" : "none" }}>
                    {errorMessage}
                </div>


            </form>

            <Link to="/contenido" className="registrobotoncv nav-link active " aria-current="page" >Atrás</Link>
            <img className="iconocat" src= {Categoría} />

        </div>
    )
}

export default CreateCategory;