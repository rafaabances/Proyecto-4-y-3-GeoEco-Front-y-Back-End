import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./getpays.css";
import Navbar from "./NavBar";
import Pago from "./img/Pago.jpg"
import Pago2 from "./img/Pago2.png"
import Geología from "./img/Geología.jpg"
import Economía from "./img/Economía.png"



const GetPays = () => {

    const [payments, setPayments] = useState([])
    // const [user2, setUser2] = useState([{}])
    const token = localStorage.getItem("token")
   
    //tendrás que coger el role cuando sea post ya que para esto necesitas ser administrador


    useEffect(() => {
        const getpays = async () => {
            const response = await axios.get("http://localhost:5000/api/payments", {
                headers: { // esto para cuando la ruta es privada (auth, es decir necesitas token)
                    "Authorization": token
                }
            })

            setPayments(response.data.Payments) // hay que poner lo del back
            // setUser2(response.data.Payments.user)

            console.log(response)
        }

        getpays()

    }, []) // se pone array vacío porque si no sería un bucle infinito, renderizaría continuamente, con la array hace el renderizado hasta que encuentre toda la array. 

    return (
        <div className="fondo">
            <Navbar />
            <h1><img className="GeoEco2" src= {Economía} /><span className="geo">Geo</span><span className="eco">Eco</span> <img className="GeoEco2" src= {Geología} /></h1>
            <h2 className="web">La web del Conocimiento</h2>
            <h1 className="tenemos2pay">Los pagos de los Usuarios  <img className="GeoEco2" src={Pago} /></h1>
            

            {

                payments.map(pago => {
                    return (

                        <Link key={pago._id} to={`/pagos/${pago._id}`}>

                            <div className="caja" >

                                <h5 className="tituloVpayP"> <span className="dirP">Usuario:</span>  {pago.user.name} </h5>
                                <h5 className="payidP"> <span className="dirP">Dirección:</span> {pago.address} </h5>
                                <h5 className="clasecol"> <span className="dirP">PaymentId:</span> {pago.paymentId} </h5>
                                <h5 className="tiposusP"> <span className="dirP">Tipo de Suscripción:</span> {pago.membership} </h5>


                            </div>
                        </Link>

                    )
                })
            }
            <Link to="/contenido" className="registroboton3  nav-link active " >Atrás</Link>
            <img className="ecocien2" src={Pago2} />
        </div>
    )
}


export default GetPays;