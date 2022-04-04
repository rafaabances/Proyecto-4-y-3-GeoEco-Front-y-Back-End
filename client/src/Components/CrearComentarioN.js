import React, { useState } from "react";
// import "./register.css";
import axios from "axios";
import { Link } from "react-router-dom";



const CreateCommentN = () => {
    const [commentN, setCommentN] = useState({
        userId: "",
        commentTextBlog: "",
        blog: "",
        likes:"",
        
    
    })

    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)


    const onChangeInput = e => { //e=event
        const { comN, value } = e.target // con target guardamos los datos que vamos escribiendo dentro de nuestro input.
        setCommentN({ ...commentN, [comN]: value })
    }


    console.log(commentN)


    const registerSubmit = async e => {
        e.preventDefault() // no se refresca la página cuando llamas a la función, con esto no envía datos hasta que no se da a registro


        try {
            const response = await axios.post("http://localhost:5000/api/newcommentblog/:blogId", { ...commentN });
            console.log(response)
            // localStorage.setItem("token", response.data.accessToken ) // esto irá en el login
            setSuccessMessage(response.data.message)
         // tiempo en milisegundos para ir de un endpoint a otro.

        } catch (error) {
            setErrorMessage(error.response.data.message)
        }
    }

    return (
        <div >
         
            <form onSubmit={registerSubmit} className="registro" >
                <h2 className="Crearcategoría" >Comentar</h2>
                <label className="labelR" htmlFor="name">Texto</label>
                <input className="expand-lg borR" type="text" name="name" value={commentN.comment} placeholder="Introduzca comentario" onChange={onChangeInput} />
                <button className="botonR btn btn-outline-dark " type="Submit">Enviar</button>



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

export default CreateCommentN;