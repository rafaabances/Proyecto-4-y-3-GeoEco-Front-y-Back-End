import React, { useEffect, useState } from "react";
import "./createvideo.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "./NavBar";
import videos from "./img/videos.jpg";
import Icon from "./img/Icon.svg";


const CreateVideo = () => {
    const [category, setCategory] = useState([])

    useEffect(()=>{
        const getCategory = async () =>{
            const response = await axios.get("/api/categories",
            {
                headers:{
                    "Authorization": token
                }

            
            });
            console.log(response)
            setCategory(response.data.categories)
            
        }
        getCategory()
    },[]) 


    const [vid, setvid] = useState({
        titleVideo: "",
        description: "",
        date: "",
        categoryId: "",
    })

    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const onChangeInput = e => { //e=event
        const { name, value } = e.target // con target guardamos los datos que vamos escribiendo dentro de nuestro input.
        setvid({ ...vid, [name]: value })
    }


    console.log(vid)


    const registerSubmit = async e => {
        e.preventDefault() // no se refresca la página cuando llamas a la función, con esto no envía datos hasta que no se da a registro


        try {
            const response = await axios.post("/api/newvideo", { ...vid },
            {
                headers:{
                    "Authorization": token
                }

            });
            console.log(response)
            // localStorage.setItem("token", response.data.accessToken ) // esto irá en el login
            setSuccessMessage(response.data.message)
            setTimeout(() =>{
                navigate("/contenido")
            },3000) // tiempo en milisegundos para ir de un endpoint a otro.

        } catch (error) {
            setErrorMessage(error.response.data.message)
        }
    }

    return (
        <div className="fondocv" >
            <Navbar/>
            <form onSubmit={registerSubmit} className="registro" >
                <h2 className="Crearvid" >Crear <span className="crearv">Vídeo </span><img className="GeoEco2" src= {videos} /></h2>
                <label className="labelCV" htmlFor="name">Título</label>
                <input className="expand-lg borR" type="text" name="titleVideo" value={vid.titleVideo} placeholder="Introduzca el título" onChange={onChangeInput} />
                <label className="labelCV" htmlFor="email">Texto</label>
                <input className="expand-lg borR" type="text" name="description" value={vid.description} placeholder="Introduzca el texto" onChange={onChangeInput} />
                <label className="labelCV" htmlFor="contraseña">date</label>
                <input className="expand-lg borR" type="date" name="date" value={vid.date} placeholder="Introduzca la fecha" onChange={onChangeInput} />
                <label className="labelCV" htmlFor="DNI">Categoría</label>
                <select name="categoryId"  onChange={onChangeInput}>
                {
                    category.map(categoria =>{
                        return(
                            <option key={categoria._id} value={categoria._id}>{categoria.categoryName} </option>
                        )
                    })
                }
            </select>

                <label className="labelCV" htmlFor="DNI">Seleccione el Vídeo</label>
                <input className="botonRsel" type="file" />
                <button className="botonRcv btn btn-outline-dark " type="Submit">Crear</button>



                <div className="message_ok" style={{ display: successMessage ? "block" : "none" }}>
                    {successMessage}
                </div>

                <div className="message_error" style={{ display: errorMessage ? "block" : "none" }}>
                    {errorMessage}
                </div>


            </form>
          
            <Link to="/contenido" className="registrobotoncv nav-link active " aria-current="page" >Atrás</Link>
            <img className="iconocv" src= {Icon} />

        </div>
    )
}

export default CreateVideo;