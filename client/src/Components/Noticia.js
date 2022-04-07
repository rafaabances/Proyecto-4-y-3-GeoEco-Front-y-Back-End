import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./noticia.css";
import Navbar from "./NavBar";
import CreateCommentN from "./CrearComentarioN";
import Blog from "./img/Blog.jpg";


const Noticia = () => {

    const { noticiaId } = useParams() //recibes el prámetro de Noticias Js

    const [new2, setNew2] = useState({})
    const [category, setCategory] = useState([])
    const [comment, setComment] = useState([])
    const [like, setLike] = useState([])
    const token = localStorage.getItem("token")

    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const navigate = useNavigate()


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

    const addlikes = async () => {
        try {
            const res = await axios.post(`http://localhost:5000/api/bloglikes/${noticiaId}`, { ...noticiaId }, {
                headers:
                {
                    "Authorization": token
                }
            })
            setSuccessMessage(res.data.message)

        } catch (error) {
            setErrorMessage(error.message)
        }
    }



    const deleteNoticia = async () => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/deletenew/${noticiaId}`, {
                headers:
                {
                    "Authorization": token
                }
            })
            setSuccessMessage(res.data.message)
            setTimeout(() => {
                navigate("/noticias")
            }, 3000) // tiempo en milisegundos para ir de un endpoint a otro.

        } catch (error) {
            setErrorMessage(error.res.data.message)
        }
    }



    return (
        <div className="fondo">
            <Navbar />
            <div className="caja">

            <h1 className="tituloV"><span className="titulovid">Título: </span>{new2.titleNew}  </h1>

                <p className="des"> <span className="videotil">Descripción: </span>{new2.description} </p>

                <p className="videoV"> Noticia: </p>

                <p className="date"> <span className="videotil">Fecha: </span> {new2.date} </p>


                <div key={category._id}>
                    <p className="cate"><span className="videotil">Categoría:</span> {category.categoryName} </p>
                </div>

                {/* <div>
                    {
                        like.map(megusta => {
                            return (
                                <div key={megusta._id}>
                                    <p className="likesnoti">{megusta} </p>

                                </div>
                            )
                        })
                    }
                </div> */}

            </div>




            <CreateCommentN />

            <h2 className="titlecomentario">Comentarios:</h2>

            <div>
                {
                    comment.map(comentario => {
                        return (
                            <div key={comentario._id}>
                                <tr>
                                    <p className="comentariosN">{comentario.commentTextBlog} </p>
                                </tr>




                            </div>
                        )
                    })
                }
            </div>



            <p className="borrar">Borrar /Modificar solo Administrador</p>
            <button className="botonborrar" onClick={deleteNoticia}>Borrar Noticia</button>
            <Link key={new2._id} to={`/noticiamodify/${new2._id}`}>
                <button className="botonborrarv">Modificar Noticia</button>
            </Link>

            <p className="borrarv">Dar Like</p>

            <button className="botonborrargustaN" onClick={addlikes}>Me Gusta</button>


            <div className="message_ok" style={{ display: successMessage ? "block" : "none" }}>
                {successMessage}
            </div>

            <div className="message_error" style={{ display: errorMessage ? "block" : "none" }}>
                {errorMessage}
            </div>




            <Link to="/noticias" className="registroboton3  nav-link active " >Atrás</Link>
            <h1 className="ahora">Ahora puedes disfrutar de todos los Noticias de nuestro <span className="blog2">Blog</span></h1>
            <h1 className="siguenos">Síguenos en nuestro Blog <span className="blog">GeoEco</span> !</h1>
            <img className="ecocien2" src={Blog} />
        </div>
    )





}

export default Noticia;