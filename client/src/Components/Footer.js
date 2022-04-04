import React from "react";
import "./footer.css";


const Footer = () => {

    return (
        <div Class="Footer">
 <footer Class="bg-dark text-center text-white border border-success border-4">
    <div Class="container p-4 ">
      <section Class="mb-4">
        <img Class="redimg" src="https://cdn-icons-png.flaticon.com/512/145/145802.png" alt="Face"/>

        <img Class="redimg" src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" alt="Whatshap"/>
        <img Class="redimg" src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Insta"/>
        <img Class="redimg" src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="Youtube"/>
        <img Class="redimg twit" src="https://assets.webiconspng.com/uploads/2017/01/Twitter-Graphic-Icon.png"
          alt="Twitter"/>
      </section>

      <section Class="centrarfooter">
        <form action="">
          <div Class="row d-flex justify-content-center">
            <div Class="col-auto">
              <p Class="pt-2">
                <strong>Síguenos en Redes Sociales!</strong>
              </p>
            </div>

            <div Class="col-md-5 col-12">
              <div Class="form-outline form-white mb-4">
                <input type="email" id="form5Example21" Class="form-control" />
                <label Class="form-label" for="form5Example21"> <span>¿Necesitas más Información? </span> Escribe tu E-mail y nos pondremos en contacto contigo</label>
              </div>
            </div>

            <div Class="col-auto">
              <button type="submit" Class="btn btn-outline-light mb-4 bot">
                Enviar E-Mail
              </button>
            </div>
          </div>
        </form>
      </section>

      <section Class="mb-4 centrartextfooter">
        <p>
          Somos <span>GeoEco</span>, la mejor web de divulgación, te ofrecemos los mejores <span>documentales de Geología y Economía </span>
           para que tengas todo el conocimiento de la mano de los mejores divulgadores Geólogos y Economistas
          Y también te brindamos todas las <span>noticias y artículos científicos</span> relacionadas con estas disciplinas, 
          trabajamos porque el conocimiento llegue a todo el Mundo.
        </p>
      </section>

    </div>

     <div ClassName="text-center p-3 footersep dark" >
      © 2022 GeoEco Rafael Abances Serrate </div> 
  </footer>

        </div >
    )

}

export default Footer;