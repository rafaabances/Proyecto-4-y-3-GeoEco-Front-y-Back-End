import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import GeoEco1 from "./img/GeoEco1.jpg";
import Flecha from "./img/flechaabajo.jpg"

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    })


    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const navigate = useNavigate()



    const onChangeInput = e => { //e=event
        const { name, value } = e.target // con target guardamos los datos que vamos escribiendo dentro de nuestro input.
        setUser({ ...user, [name]: value })
    }

    const loginSubmit = async e => {
        e.preventDefault() // no se refresca la página cuando llamas a la función, con esto no envía datos hasta que no se da a registro
        try {
            const response = await axios.post("http://localhost:5000/api/login", { ...user });
            console.log(response)
            setSuccessMessage(response.data.message)
            localStorage.setItem("token", response.data.token) //te coje el token de inspeccionar en aplicación
            localStorage.setItem("role", response.data.role) //te coje el authadmin de inspeccionar en aplicación


            setTimeout(() => {
                navigate("/contenido")
            }, 3000) // tiempo en milisegundos para ir de un endpoint a otro.

        } catch (error) {
            setErrorMessage(error.response.data.message)
            setTimeout(() => {
                window.location.href = "/login"
            }, 3000)
        }
    }

    return (


        <div className="fondo">



            <h1><span className="geo">Geo</span><span className="eco">Eco</span></h1>
            <h2 className="web">La web del Conocimiento</h2>

            <form onSubmit={loginSubmit} className="login" >
                <h2 className="Login">Login</h2>
                <label className="label" htmlFor="email">Email</label>
                <input className="expand-lg bor" type="text" name="email" value={user.email} placeholder="Introduzca su email" onChange={onChangeInput} />
                <label className="label" htmlFor="contraseña">Contraseña</label>
                <input className="expand-lg bor" type="text" name="password" value={user.password} placeholder="Introduzca su constraseña" onChange={onChangeInput} />
                <button className="boton btn btn-outline-dark " type="Submit">Log In</button>




                <div className="message_ok" style={{ display: successMessage ? "block" : "none" }}>
                    {successMessage}
                </div>

                <div className="message_error" style={{ display: errorMessage ? "block" : "none" }}>
                    {errorMessage}
                </div>



            </form>

            <h3 className="preguntare">¿No estás registrado?</h3>
            <img className="flecha" src= {Flecha} />
            <Link to="/registro" className="registroboton nav-link active " aria-current="page" >Registro</Link>
            
            <img className="GeoEco" src={GeoEco1} />
            



        </div>
    )



}


export default Login;