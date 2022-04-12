import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./getCategories.css";


const GetUser = () => {

    const { userId } = useParams() //recibes el prámetro de Noticias Js

    const [user, setUser] = useState({})

    const token = localStorage.getItem("token")
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)


    useEffect(() => {
        const getUser= async () => {
            const response = await axios.get(`/api/finduser/${userId}`, { // por eso cambiamos findnew/:id por findnew/${noticiaId}
                headers: {
                    "Authorization": token
                }
            })

            console.log(response)
            setUser(response.data.user)
        }

        getUser()
    }, [])


    const DeleteUser = async () => {
        try {
            const res = await axios.delete(`/api/deleteuser/${userId}`, {
                headers:
                {
                    "Authorization": token
                }
            })
            setSuccessMessage(res.data.message)
            setTimeout(() => {
                window.location.href = "/consultarusuarios/:userId"
            }, 3000) // tiempo en milisegundos para ir de un endpoint a otro.

        } catch (error) {
            setErrorMessage(error.res.data.message)
        }
    }



    return (
        <div >
          

          <button className="botonborrarcat" onClick={DeleteUser}>Borrar Usuario</button>


            
        </div>
    )





}

export default GetUser;