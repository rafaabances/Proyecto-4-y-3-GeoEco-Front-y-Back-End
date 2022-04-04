import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./noticia.css";
import Navbar from "./NavBar";
import CreateCommentN from "./CrearComentarioN";


const Noticia = () => {

    const { noticiaId } = useParams() //recibes el prámetro de Noticias Js

    const [new2, setNew2] = useState({})
    const [category, setCategory] = useState({})
    const [comment, setComment] = useState([])
    const [like, setLike] = useState([])
    const token = localStorage.getItem("token")


    useEffect(() => {
        const getNoticia = async () => {
            const response = await axios.get(`http://localhost:5000/api/findnew/${noticiaId}`, { // por eso cambiamos findnew/:id por findnew/${noticiaId}
                headers: {
                    "Authorization": token
                }
            })

            console.log(response)
            setNew2(response.data.blog)
            setCategory(response.data.blog.category)
            setComment(response.data.blog.commentNew)
            setLike(response.data.blog.likes)
        }

        getNoticia()
    }, [])

    return (
        <div>
             <Navbar/>
            <h1 className="noticiah1">{new2.titleNew}  </h1>  
            <p className="noticiap">{new2.description} </p>
            <p className="noticiap">{new2.date} </p>
            {/* <p className="noticiap">{new2.image} </p> */}
      

            <div key={category._id}>
                <p className="noticiap">{category.categoryName} </p>
            </div>

          

            
            <div>
                {
                    like.map(megusta => {
                        return (
                            <div key={megusta._id}>
                                <p className="noticiap">{megusta} </p>

                            </div>
                        )
                    })
                }
            </div>

            <CreateCommentN />

            <h2 className="titlecomentario">Comentarios</h2>

            <div>
                {
                    comment.map(comentario => {
                        return (
                            <div key={comentario._id}>
                                <p className="noticiap">{comentario.commentTextBlog} </p>

                            </div>
                        )
                    })
                }
            </div>

          

            <Link to="/noticias" className="geo nav-link active " >Atrás</Link>
        </div>
    )





}

export default Noticia;