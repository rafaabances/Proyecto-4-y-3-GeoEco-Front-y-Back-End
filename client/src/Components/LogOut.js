import { Link } from "react-router-dom";
import "./logOut.css";
import GeoEco2 from "./img/GeoEco2.jpg";




const Logout = () =>{
    
localStorage.removeItem("token")
localStorage.removeItem("role")


return(
    <div className="fondo">



    <h1><span className="geo">Geo</span><span className="eco">Eco</span></h1>
    <h2 className="web">La web del Conocimiento</h2>

      
        <div className="logout" >
            <h2 className="Logout" >Esperamos verte pronto !!!</h2>
        </div>
        <Link to="/login">
            <button className="boton ">Ir al login</button>
        </Link>
        <img className="GeoEco" src={GeoEco2} />
    </div>
)


}

export default Logout