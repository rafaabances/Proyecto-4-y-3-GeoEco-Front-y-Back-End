import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./getCategories.css";


const GetCategory = () => {

    const { categoryId } = useParams() //recibes el prámetro de Noticias Js

    const [category, setCategory] = useState({})

    const token = localStorage.getItem("token")
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)


    useEffect(() => {
        const getCategory= async () => {
            const response = await axios.get(`/api/findcategory/${categoryId}`, { // por eso cambiamos findnew/:id por findnew/${noticiaId}
                headers: {
                    "Authorization": token
                }
            })

            console.log(response)
            setCategory(response.data.category)
        }

        getCategory()
    }, [])


    const DeleteCategory = async () => {
        try {
            const res = await axios.delete(`/api/deletecategory/${categoryId}`, {
                headers:
                {
                    "Authorization": token
                }
            })
            setSuccessMessage(res.data.message)
            setTimeout(() => {
                window.location.href = "/consultarcategorias/:categoryId"
            }, 3000) // tiempo en milisegundos para ir de un endpoint a otro.

        } catch (error) {
            setErrorMessage(error.res.data.message)
        }
    }



    return (
        <div >
          

          <button className="botonborrarcat" onClick={DeleteCategory}>Borrar Categoría</button>


            
        </div>
    )





}

export default GetCategory;