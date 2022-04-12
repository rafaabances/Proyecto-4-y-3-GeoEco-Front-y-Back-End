import React, { useState } from "react";
import "./crearcomentarioV.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";




const CreateCommentV = () => {
    const token = localStorage.getItem("token")
    const { videoId } = useParams()
    const [commentV, setCommentV] = useState({
        // userId: "",
        comment: "",
        // video: "",
        // likes:"",
        
    
    })

    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)


    const onChangeInput = e => { //e=event
        const { name, value } = e.target // con target guardamos los datos que vamos escribiendo dentro de nuestro input.
        setCommentV({ ...commentV, [name]: value })
    }


    console.log(commentV)


    const registerSubmit = async e => {
        e.preventDefault() // no se refresca la página cuando llamas a la función, con esto no envía datos hasta que no se da a registro


        try {
            const response = await axios.post(`/api/newcommentvideo/${videoId}`, { ...commentV },
            {
                headers:{
                    "Authorization": token
                }
            })
            console.log(response)
            // localStorage.setItem("token", response.data.accessToken ) // esto irá en el login
            setSuccessMessage(response.data.message)
            setTimeout(() => {
               window.location.href = `/videos/${videoId}`
            }, 3000) // tiempo en milisegundos para ir de un endpoint a otro.
         // tiempo en milisegundos para ir de un endpoint a otro.

        } catch (error) {
            setErrorMessage(error.response.data.message)
        }
    }

    return (
        <div >
          
          <form onSubmit={registerSubmit} className="registro" >
                <h2 className="titulocomentar" >Comente aquí!</h2>
                <label className="introducir" htmlFor="name"> Sea libre de introducir un Texto</label>
                <input className=" reducir expand-lg borR" type="text" name="comment" value={commentV.comment} placeholder="Introduzca comentario" onChange={onChangeInput} />
                <button className="botonRcomen btn btn-outline-dark " type="Submit">Enviar</button>



                <div className="message_ok" style={{ display: successMessage ? "block" : "none" }}>
                    {successMessage}
                </div>

                <div className="message_error" style={{ display: errorMessage ? "block" : "none" }}>
                    {errorMessage}
                </div>


            </form>



        </div>
    )
}

export default CreateCommentV;