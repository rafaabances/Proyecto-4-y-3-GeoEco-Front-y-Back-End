import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./getUsers.css";
import Navbar from "./NavBar";
import Usuario from "./img/Usuario.png"
import Usuarios from "./img/Usuarios.png"
import GetUser from "./DeleteUser";
import Geología from "./img/Geología.jpg"
import Economía from "./img/Economía.png"



const GetUsers = () => {
    const { userId } = useParams()
    const [users, setUsers] = useState([])
    const token = localStorage.getItem("token")
    //tendrás que coger el role cuando sea post ya que para esto necesitas ser administrador


    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)


    useEffect(() => {
        const getUsers = async () => {
            const response = await axios.get("/api/users", {
                headers: { // esto para cuando la ruta es privada (auth, es decir necesitas token)
                    "Authorization": token
                }
            })
            console.log(response)

            setUsers(response.data.users) // hay que poner lo del back
        }

        getUsers()

    }, []) // se pone array vacío porque si no sería un bucle infinito, renderizaría continuamente, con la array hace el renderizado hasta que encuentre toda la array. 


   


    return (
        <div className="fondo">
            <Navbar />
            <h1><img className="GeoEco2" src= {Economía} /><span className="geo">Geo</span><span className="eco">Eco</span> <img className="GeoEco2" src= {Geología} /></h1>
            <h2 className="web">La web del Conocimiento</h2>
            <h1 className="tenemos2pay">Todos los Usuarios:<img className="GeoEco2" src={Usuario} /></h1>
            {

                users.map(user => {
                    return (

                        <Link key={user._id} to={`/consultarusuarios/${user._id}`}>

                            <div className="caja" >

                                <h5 className=" payidU "> <span className="dirU">Nombre:</span>  {user.name} </h5>
                                <h5 className="tituloVpayU"> <span className="dirU">Email:</span>  {user.email} </h5>
                                <h5 className="clasecolU"> <span className="dirU">DNI:</span>  {user.DNI} </h5>
                                <h5 className="tiposusU"> <span className="dirU">Rol:</span>  {user.role} / (0 = Sus. y 1 = Admin.)  </h5>
                                <GetUser />

                            </div>
                        </Link>

                    )
                })
            }


            <div className="message_ok" style={{ display: successMessage ? "block" : "none" }}>
                {successMessage}
            </div>

            <div className="message_error" style={{ display: errorMessage ? "block" : "none" }}>
                {errorMessage}
            </div>

            <Link to="/contenido" className="registroboton3  nav-link active " >Atrás</Link>
            <img className="ecocien2" src={Usuarios} />
        </div>
    )
}


export default GetUsers;