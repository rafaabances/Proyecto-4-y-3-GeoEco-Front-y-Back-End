import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {



  const role = localStorage.getItem("role")


  const navbarUser = () => {


    return (
      <div >

        <nav className=" NavBar navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link to="#" className="navbar-brand text-success fw-bold grande" ><span className="geo">Geo</span><span className="eco">Eco</span></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/login" className="geo nav-link active " aria-current="page" >Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/registro" className="yellow nav-link" >Registro de Usuario</Link>
                </li>
                <li className="nav-item dropdown">
                  <Link to="/contenido" className="whit nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Contenidos
                  </Link>
                  <ul className="dropdown-menu backg text-center" aria-labelledby="navbarDropdown">
                    <li><Link to="/videos" className="geo dropdown-item" >Vídeos</Link></li>
                    <li><Link to="/noticias" className="yellow dropdown-item" >Noticias</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link to="/merchandising" className="geo dropdown-item" >Merchandising para ti</Link></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link to="/" className="yellow nav-link">Contacto</Link>
                </li>
                <li className="nav-item">
                  <Link to="/logout" className="yellow nav-link">LogOut</Link>
                </li>
              </ul>
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>


      </div >
    )

  }




  const navbarAdmin = () => {


    return (
      <div>
        <nav className=" NavBar navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link to="#" className="navbar-brand text-success fw-bold grande" ><span className="geo">Geo</span><span className="eco">Eco</span></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/login" className="geo nav-link active " aria-current="page" >Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/registro" className="yellow nav-link" >Registro de Usuario</Link>
                </li>
                <li className="nav-item dropdown">
                  <Link to="/contenido" className="whit nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Contenidos
                  </Link>
                  <ul className="dropdown-menu backg text-center" aria-labelledby="navbarDropdown">
                    <li><Link to="/videos" className="geo dropdown-item" >Vídeos</Link></li>
                    <li><Link to="/noticias" className="yellow dropdown-item" >Noticias</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link to="/merchandising" className="geo dropdown-item" >Merchandising para ti</Link></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link to="/" className="yellow nav-link">Contacto</Link>
                </li>
                <li className="nav-item">
                  <Link to="/logout" className="yellow nav-link">LogOut</Link>
                </li>
                <li className="nav-item">
                  <Link to="/crearvideo" className="admin nav-link">Subir Vídeo</Link>
                </li>
                <li className="nav-item">
                  <Link to="/crearnoticia" className="admin nav-link">Subir Noticia</Link>
                </li>
                <li className="nav-item">
                  <Link to="/crearcategoria" className="admin nav-link">Crear Categoría</Link>
                </li>
                <li className="nav-item">
                  <Link to="/consultarpagos" className="admin nav-link">Consultar Pagos</Link>
                </li>
                <li className="nav-item">
                  <Link to="/consultarcategorias/:categoryId" className="admin nav-link">Consultar Categorias</Link>
                </li>
                <li className="nav-item">
                  <Link to="/consultarusuarios/:userId" className="admin nav-link">Consultar Usuarios</Link>
                </li>
              </ul>
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    )
  }



  return (
    <div>
      {
        role == 0 ? navbarUser() : navbarAdmin()
      }


    </div>
  )



}

export default Navbar;