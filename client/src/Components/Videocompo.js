import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./video.css";
import Navbar from "./NavBar";
import CreateCommentV from "./CrearComentarioV";


const Videocompo = () => {

    const { videoId } = useParams() //recibes el prámetro de Noticias Js

    const [video2, setVideo2] = useState({})
    const [category, setCategory] = useState({})
    const [comment, setComment] = useState([])
    const [like, setLike] = useState([])
    const token = localStorage.getItem("token")


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

    return (
        <div>
            <Navbar/>
            <h1 className="videoh1">{video2.titleVideo}  </h1>
            
            <p className="videop">{video2.description} </p> 
            <p className="videop">{video2.date} </p>
             <p className="videop">{video2.videoV} </p>
      

            <div key={category._id}>
                <p className="videop">{category.categoryName} </p>
            </div>

            <div>
                {
                    comment.map(comentario => {
                        return (
                            <div key={comentario._id}>
                                <p className="videop">{comentario.commentTextVideo} </p>

                            </div>
                        )
                    })
                }
            </div>

            
            <div>
                {
                    like.map(megusta => {
                        return (
                            <div key={megusta._id}>
                                <p className="videop">{megusta} </p>

                            </div>
                        )
                    })
                }
            </div>

            < CreateCommentV />

            <Link to="/videos" className="geo nav-link active " >Atrás</Link>
        </div>
    )





}

export default Videocompo;