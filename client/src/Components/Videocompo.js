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
    const [category, setCategory] = useState([])
    const [comment, setComment] = useState([])
    const [like, setLike] = useState([])
    const token = localStorage.getItem("token")

    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const navigate = useNavigate()

    

    useEffect(() => {
        const getVideo = async () => {
            const response = await axios.get(`/api/findvideo/${videoId}`, { // por eso cambiamos findnew/:id por findnew/${noticiaId}
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

    const addlikes = async () =>{
        try {
            const res = await axios.post(`/api/videolikes/${videoId}`, {...videoId}, {
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


    const deleteVideo = async() =>{
        try {
            const res = await axios.delete(`/api/deletevideo/${videoId}`, {
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

            <h1 className="tituloV"><span className="titulovid">Título: </span> {video2.titleVideo}  </h1>
            
            <p className="des"> <span className="videotil">Descripción: </span> {video2.description} </p> 
            
             <p className="videoV"> Vídeo:{video2.videoV} </p>
             <p className="date"> <span className="videotil">Fecha:</span> {video2.date} </p>

      

            <div key={category._id}>
            <p className="cate"><span className="videotil">Categoría: </span> {category.categoryName} </p>
            </div>

{/*             
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
            </div> */}

            </div>

            < CreateCommentV />

            <h2 className="titlecomentario">Comentarios:</h2>

            <div >
                {
                    comment.map(comentario => {
                        return (
                            <div key={comentario._id}>
                                <p className="comentariosV">{comentario.commentTextVideo} </p>

                            </div>
                        )
                    })
                }
            </div>
            
            <p className="borrar">Borrar /Modificar solo Administrador</p>
            <button className="botonborrar" onClick={deleteVideo}>Borrar Vídeo</button>
            <Link key={video2._id} to={`/videomodify/${video2._id}`}>
                <button className="botonborrarv">Modificar Vídeo</button>
            </Link>

            <p className="borrarv">Dar Like</p>

            <button className="botonborrargustaV" onClick={addlikes}>Me Gusta</button>
            
            
            
           

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