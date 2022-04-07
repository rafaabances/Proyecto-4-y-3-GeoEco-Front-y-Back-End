import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link , useNavigate} from "react-router-dom";
import Navbar from "./NavBar";
import Modificar from "./img/Modificar.jpg";
import Editar from "./img/Editar.png";
import Geología from "./img/Geología.jpg"
import Economía from "./img/Economía.png"


const VideoModify = () =>{
    const [category, setCategory] = useState([])
    const {videoId} = useParams()
    const token = localStorage.getItem("token")

    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const navigate = useNavigate()

    useEffect(()=>{
        const getCategory = async () =>{
            const response = await axios.get("http://localhost:5000/api/categories",
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



    const [info, setInfo] = useState({
        titleVideo:"",
        description:"",
        categoryId:""
    })


    const OnChangeInput = (e) =>{
        const {name, value} = e.target
        setInfo({...info, [name]:value})
    }

    const formSubmit = async e =>{
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:5000/api/updatevideo/${videoId}`, {...info},
            {
                headers:{
                    "Authorization": token
                }
            })
            setSuccessMessage(response.data.message)
            setTimeout(() => {
                navigate("/videos")
            }, 3000) // tiempo en milisegundos para ir de un endpoint a otro.
        } catch (error) {
            setErrorMessage(error.response.data.message)
        }
    }

    return(
        <div className="fondo">
            <Navbar/>
            <h1><img className="GeoEco2" src= {Economía} /><span className="geo">Geo</span><span className="eco">Eco</span> <img className="GeoEco2" src= {Geología} /></h1>
            <h2 className="web">La web del Conocimiento</h2>

            <form onSubmit={formSubmit} className="registro">
            <h2 className="Crearvid" >Modificar <span className="crearv">Video </span><img className="GeoEco2" src= {Modificar} /></h2>

                <label className="labelR" htmlFor="titleVideo"> Título:  </label>
                 <input className=" borR" type="text" name="titleVideo" value={info.titleVideo} required onChange={OnChangeInput} />

                 <label  className="labelR" htmlFor="description"> Descripción:  </label>
                <input  className=" borR" type="text" name="description" value={info.description} required  onChange={OnChangeInput} />

                <label  className="labelR" htmlFor="category" > Categoría:  </label>
                <select name="categoryId"   onChange={OnChangeInput}>
                {
                    category.map(categoria =>{
                        return(
                            <option key={categoria._id} value={categoria._id}>{categoria.categoryName}  </option>
                        )
                    })
                }
            </select>



                <div className="message_ok" style={{ display: successMessage ? "block" : "none" }}>
                    {successMessage}
                </div>

                <div className="message_error" style={{ display: errorMessage ? "block" : "none" }}>
                    {errorMessage}
                </div>


                <button className="botonR" type="submit">Modificar</button>


                <Link to="/videos"><button className="botonR">Atras</button></Link>
            </form>


            <img className="ecocien" src= {Editar} />
        </div>
    )

}




export default VideoModify;