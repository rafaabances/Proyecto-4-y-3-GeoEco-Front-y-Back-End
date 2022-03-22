import React from "react";
import Alumnos from "./Alumnos";

const Welcome = (props) => {
    const {name} =props
    return (
        <div>
            <p>Hola, {props.nombre} </p>
            <p>Estamos en el workshop de React</p>
            <Alumnos name = {props.nombre} />
        </div>
    )
}


export default Welcome;