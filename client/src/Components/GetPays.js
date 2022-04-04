import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "./noticias.css";
import Navbar from "./NavBar";



const GetPays = () => {

    const [payments, setPayments] = useState([])
    const token = localStorage.getItem("token")
    //tendrás que coger el role cuando sea post ya que para esto necesitas ser administrador


    useEffect(() => {
        const getpays = async () => {
            const response = await axios.get("http://localhost:5000/api/payments", {
                headers: { // esto para cuando la ruta es privada (auth, es decir necesitas token)
                    "Authorization": token
                }
            })
            console.log(response)

            setPayments(response.data.Payments) // hay que poner lo del back
        }

        getpays()

    }, []) // se pone array vacío porque si no sería un bucle infinito, renderizaría continuamente, con la array hace el renderizado hasta que encuentre toda la array. 

    return (
        <div>
            <Navbar />
            <h1 className="noticiash1">GeoEco</h1>
            <h2 className="noticiash2">La web del Conocimiento</h2>
            {

                payments.map(pago => {
                    return (

                        <Link key={pago._id} to={`/pagos/${pago._id}`}>

                            <div >

                                <h5 className="noticiash3"> {pago.user} </h5>
                                <h5 className="noticiash3"> {pago.address} </h5>
                                <h5 className="noticiash3"> {pago.paymentId} </h5>
                                <h5 className="noticiash3"> {pago.membership} </h5>
                               

                            </div>
                        </Link>

                    )
                })
            }
            <Link to="/contenido" className="geo nav-link active " >Atrás</Link>
        </div>
    )
}


export default GetPays;