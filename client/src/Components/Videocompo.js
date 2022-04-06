import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./videocompo.css";
import Navbar from "./NavBar";
import CreateCommentV from "./CrearComentarioV";
import Youtube from "./img/Youtube.jpg"



const Videocompo = () => {

    const { videoId } = useParams() //recibes el prámetro de Noticias Js

    const [video2, setVideo2] = useState({})
    const [category, setCategory] = useState({})
    const [comment, setComment] = useState([])
    const [like, setLike] = useState([])
    const token = localStorage.getItem("token")

    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const navigate = useNavigate()


    useEffect(() => {
        const getVideo = async () => {
            const response = await axios.get(`http://localhost:5000/api/findvideo/${videoId}`, { // por eso cambiamos findnew/:id por findnew/${noticiaId}
                headers: {
                    "Authorization": token
                }
            })

            console.log(response)
            setVideo2(response.data.video)
            setCategory(response.data.video.category)
            setComment(response.data.video.commentV)
            setLike(response.data.video.likes)
        }

        getVideo()
    }, [])


    const deleteVideo = async() =>{
        try {
            const res = await axios.delete(`http://localhost:5000/api/deletevideo/${videoId}`, {
                headers: 
                {
                    "Authorization": token
                }
            })
            setSuccessMessage(res.data.message)
            setTimeout(() => {
                navigate("/videos")
            }, 3000) // tiempo en milisegundos para ir de un endpoint a otro.
            
        } catch (error) {
            setErrorMessage(error.res.data.message)
        }
    }

    return (
        <div className="fondo">
        <Navbar/>
        <div className="caja">

            <h1 className="titulo">{video2.titleVideo}  </h1>
            
            <p className="des">{video2.description} </p> 
            
             <p className="videoV">{video2.videoV} </p>
             <p className="date">{video2.date} </p>
      

            <div key={category._id}>
                <p className="cate">{category.categoryName} </p>
            </div>

            
            <div>
                {
                    like.map(megusta => {
                        return (
                            <div key={megusta._id}>
                                <p className="likesnoti">{megusta} </p>

                            </div>
                        )
                    })
                }
            </div>

            </div>

            < CreateCommentV />

            <h2 className="titlecomentario">Comentarios:</h2>

            <div className="cajacomen">
                {
                    comment.map(comentario => {
                        return (
                            <div key={comentario._id}>
                                <p className="comentarios">{comentario.commentTextVideo} </p>

                            </div>
                        )
                    })
                }
            </div>
            
            <p className="borrar">Borrar solo por el Administrador</p>
            <button className="botonborrar" onClick={deleteVideo}>Borrar Vídeo</button>
            
            <p className="borrar">Modificar solo por el Administrador</p>
            <Link key={video2._id} to={`/videomodify/${video2._id}`}>
                <button className="botonborrar">Modificar Vídeo</button>
            </Link>
            
           

            <div className="message_ok" style={{ display: successMessage ? "block" : "none" }}>
                    {successMessage}
                </div>

                <div className="message_error" style={{ display: errorMessage ? "block" : "none" }}>
                    {errorMessage}
                </div>


            <Link to="/videos" className="registroboton3  nav-link active " >Atrás</Link>
            <h1 className="ahora">Ahora puedes disfrutar de todos los Vídeos de nuestro canal de  <span className="youtube2">Youtube</span></h1>
            <h1 className="siguenos">Síguenos en nuestro canal de <span className="youtube">Youtube</span> !</h1>
            <img className="ecocien2" src={Youtube} />
            
        </div>
    )





}

export default Videocompo;