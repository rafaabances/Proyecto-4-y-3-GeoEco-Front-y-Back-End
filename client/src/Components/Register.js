import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import GeoEco1 from "./img/GeoEco1.jpg";
import Flecha from "./img/flechaabajo.jpg"
import Geología from "./img/Geología.jpg"
import Economía from "./img/Economía.png"


const Register = () => {
    const [user, setuser] = useState({
        name: "",
        email: "",
        password: "",
        DNI: "",
        BankData: "",
    })

    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const navigate = useNavigate()

    const onChangeInput = e => { //e=event
        const { name, value } = e.target // con target guardamos los datos que vamos escribiendo dentro de nuestro input.
        setuser({ ...user, [name]: value })
    }


    console.log(user)


    const registerSubmit = async e => {
        e.preventDefault() // no se refresca la página cuando llamas a la función, con esto no envía datos hasta que no se da a registro


        try {
            const response = await axios.post("http://localhost:5000/api/newuser", { ...user });
            console.log(response)
            // localStorage.setItem("token", response.data.accessToken ) // esto irá en el login
            setSuccessMessage(response.data.message)
            localStorage.setItem("token", response.data.token)
            setTimeout(() => {
                navigate("/pago")
            }, 3000) // tiempo en milisegundos para ir de un endpoint a otro.

        } catch (error) {
            setErrorMessage(error.response.data.message)
            setTimeout(() => {
                window.location.href = "/registro"
            }, 3000)
        }
    }

    return (
        <div className="fondo" >

            <h1><img className="GeoEco2" src={Economía} /><span className="geo">Geo</span><span className="eco">Eco</span> <img className="GeoEco2" src={Geología} /></h1>
            <h2 className="web">La web del Conocimiento</h2>

            <form onSubmit={registerSubmit} className="registro" >

                <h2 className="tenemos2pay" >Registro</h2>
                <label className="labelR" htmlFor="name">Nombre</label>
                <input className="expand-lg borR" type="text" name="name" value={user.name} placeholder="Introduzca tu nombre" onChange={onChangeInput} />
                <label className="labelR" htmlFor="email">Email</label>
                <input className="expand-lg borR" type="text" name="email" value={user.email} placeholder="Introduzca tu email" onChange={onChangeInput} />
                <label className="labelR" htmlFor="contraseña">Contraseña</label>
                <input className="expand-lg borR" type="text" name="password" value={user.password} placeholder="Introduzca una constraseña" onChange={onChangeInput} />
                <label className="labelR" htmlFor="DNI">DNI</label>
                <input className="expand-lg borR" type="text" name="DNI" value={user.DNI} placeholder="Introduzca su DNI" onChange={onChangeInput} />
                <label className="labelR" htmlFor="BankData"> Opcional: Contraseña Bancaria</label>
                <input className="expand-lg borR" type="text" name="BankData" value={user.BankData} placeholder="Introduzca su contraseña para el pago" onChange={onChangeInput} />
                <label className="labelR" htmlFor="invalidCheck2">Acepto las condiciones de la política de privacidad</label>
                <input className="form-check-input  expand-lg borR chek " type="checkbox" />
                <button className="botonR btn btn-outline-dark " type="Submit">Registro</button>



                <div className="message_ok" style={{ display: successMessage ? "block" : "none" }}>
                    {successMessage}
                </div>

                <div className="message_error" style={{ display: errorMessage ? "block" : "none" }}>
                    {errorMessage}
                </div>


            </form>

            <h3 className="preguntare">¿Ya estás registrado?</h3>
            <img className="flecha" src={Flecha} />
            <Link to="/login" className="registroboton nav-link active " aria-current="page" >Login</Link>

            <img className="GeoEco" src={GeoEco1} />

        </div>
    )
}

export default Register;