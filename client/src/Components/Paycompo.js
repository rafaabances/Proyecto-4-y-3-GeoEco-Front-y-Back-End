import React, { useState } from "react";
import "./paycompo.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import GeoEco1 from "./img/GeoEco1.jpg";
import Flecha from "./img/flechaabajo.jpg";


const Paycompo = () => {
    const [pay, setPay] = useState({
        user: "", // traer del usuario que vien???
        address: "",
        paymentId: "",
        membership: "",
    })

    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const navigate = useNavigate()

    const onChangeInput = e => { //e=event
        const { name, value } = e.target // con target guardamos los datos que vamos escribiendo dentro de nuestro input.
        setPay({ ...pay, [name]: value })
    }


    console.log(pay)


    const registerSubmit = async e => {
        e.preventDefault() // no se refresca la página cuando llamas a la función, con esto no envía datos hasta que no se da a registro


        try {
            const response = await axios.post("http://localhost:5000/api/newpayment", { ...pay });
            console.log(response)
            // localStorage.setItem("token", response.data.accessToken ) // esto irá en el login
            setSuccessMessage(response.data.message)
            setTimeout(() => {
                navigate("/login")
            }, 3000) // tiempo en milisegundos para ir de un endpoint a otro.

        } catch (error) {
            setErrorMessage(error.response.data.message)
        }
    }

    return (
        <div className="fondo" >

            <h1><span className="geo">Geo</span><span className="eco">Eco</span></h1>
            <h2 className="web">La web del Conocimiento</h2>

            <form onSubmit={registerSubmit} className="registro" >
                <h2 className="Pago" >Pago</h2>
                <label className="labelR" htmlFor="user">Usuario</label>
                <input className="expand-lg borR" type="text" name="user" value={pay.user} placeholder="Introduzca su susuario" onChange={onChangeInput} />
                <label className="labelR" htmlFor="address">Dirección</label>
                <input className="expand-lg borR" type="text" name="address" value={pay.address} placeholder="Introduzca su dirección" onChange={onChangeInput} />
                <label className="labelR" htmlFor="paymentId">paymentId</label>
                <input className="expand-lg borR" type="text" name="paymentId" value={pay.paymentId} placeholder="Introduzca su paymentId" onChange={onChangeInput} />
                <label className="labelR" htmlFor="membership">Tipo de suscripción</label>
                <select  className="op" name="membership">
                    <option  className="op" value="value1">Premium  10 Euros/mes</option>
                    <option  className="op" value="value2">Plata 5 Euros/mes</option>
                    <option  className="op" value="value3">Bronze 1 Euro/mes </option>
                </select>


                <label className="labelR" htmlFor="invalidCheck2">Acepto las condiciones del Banco para procecer al pago</label>
                <input className="form-check-input  expand-lg borR chek " type="checkbox" />
                <button className="botonR btn btn-outline-dark " type="Submit">Pago</button>



                <div className="message_ok" style={{ display: successMessage ? "block" : "none" }}>
                    {successMessage}
                </div>

                <div className="message_error" style={{ display: errorMessage ? "block" : "none" }}>
                    {errorMessage}
                </div>


            </form>

            <h3 className="preguntare">¿Ya estás registrado?</h3>
            <img className="flecha" src= {Flecha} />
            <Link to="/login" className="registroboton nav-link active " aria-current="page" >Login</Link>
            
            <img className="GeoEco" src={GeoEco1} />


        </div>
    )
}

export default Paycompo;