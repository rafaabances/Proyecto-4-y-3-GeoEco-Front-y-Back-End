import { Link } from "react-router-dom";
import Navbar from "./NavBar";

const Logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")


    return (
        <div>

            <div className="logout">
                <h2>Esperamos verle pronto !!!!</h2>

            </div>

            <Link to="/login">
            <button> Ir al Login </button>

            </Link>

       </div>
    )
}

export default Logout;