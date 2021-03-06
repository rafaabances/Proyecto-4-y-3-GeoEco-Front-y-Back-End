import React, { useState } from "react";
import "./paycompo.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import GeoEco1 from "./img/GeoEco1.jpg";
import Flecha from "./img/flechaabajo.jpg";
import Geología from "./img/Geología.jpg"
import Economía from "./img/Economía.png"


const Paycompo = () => {
    const [pay, setPay] = useState({

        address: "",
        paymentId: "",
        membership: "",
    })

    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const token = localStorage.getItem("token")

    const navigate = useNavigate()

    const onChangeInput = e => { //e=event
        const { name, value } = e.target // con target guardamos los datos que vamos escribiendo dentro de nuestro input.
        setPay({ ...pay, [name]: value })
    }


    console.log(pay)


    const registerSubmit = async e => {
        e.preventDefault() // no se refresca la página cuando llamas a la función, con esto no envía datos hasta que no se da a registro


        try {
            const response = await axios.post("/api/newpayment", { ...pay }, {
                headers:
                {
                    "Authorization": token
                }
            });
            console.log(response)
            // localStorage.setItem("token", response.data.accessToken ) // esto irá en el login
            setSuccessMessage(response.data.message)
            localStorage.removeItem("token")
            setTimeout(() => {
                navigate("/login")
            }, 3000) // tiempo en milisegundos para ir de un endpoint a otro.

        } catch (error) {
            console.log(error)
            setErrorMessage(error.response.data.message)
        }
    }

    return (
        <div className="fondo" >

            <h1><img className="GeoEco2" src={Economía} /><span className="geo">Geo</span><span className="eco">Eco</span> <img className="GeoEco2" src={Geología} /></h1>
            <h2 className="web">La web del Conocimiento</h2>

            <form onSubmit={registerSubmit} className="registro" >
                <h2 className="Pago" >Pago</h2>
                {/* <label className="labelR" htmlFor="user">Usuario</label>
                <input className="expand-lg borR" type="text" name="user" value={pay.user} placeholder="Introduzca su susuario" onChange={onChangeInput} /> */}
                <label className="labelR" htmlFor="address">Dirección</label>
                <input className="expand-lg borR" type="text" name="address" value={pay.address} placeholder="Introduzca su dirección" onChange={onChangeInput} />
                <label className="labelR" htmlFor="paymentId">paymentId</label>
                <input className="expand-lg borR" type="text" name="paymentId" value={pay.paymentId} placeholder="Introduzca su paymentId" onChange={onChangeInput} />
                <label className="labelR" htmlFor="membership">Tipo de suscripción</label>
                <select className="op" name="membership" onChange={onChangeInput}>
                    <option className="op" value="Premium  10 Euros/mes">Premium  10 Euros/mes</option>
                    <option className="op" value="Plata 5 Euros/mes">Plata 5 Euros/mes</option>
                    <option className="op" value="Bronze 1 Euro/mes">Bronze 1 Euro/mes </option>
                </select>


                <label className="labelR" htmlFor="invalidCheck2">Acepto las condiciones del Banco para procecer al pago</label>
                <input className="form-check-input  expand-lg borR chekpago " type="checkbox" />
                <button className="botonR btn btn-outline-dark " type="Submit">Pago</button>



                <div className="message_ok" style={{ display: successMessage ? "block" : "none" }}>
                    {successMessage}
                </div>

                <div className="message_error" style={{ display: errorMessage ? "block" : "none" }}>
                    {errorMessage}
                </div>


            </form>

            <h3 className="preguntare1">¿Deseas volver atras?</h3>
            <h5 className="preguntare2">No se creará un usuario</h5>
            <img className="flecha" src={Flecha} />
            <Link to="/" className="registroboton nav-link active " aria-current="page" >Atrás</Link>

            <img className="GeoEco" src={GeoEco1} />


        </div>
    )
}

export default Paycompo;