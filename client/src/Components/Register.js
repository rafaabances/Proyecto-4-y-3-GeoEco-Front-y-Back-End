import React, { useState } from "react";
import "./register.css";
import axios from "axios";



const Register = ( )=> {
    const [user, setuser] = useState({
        name:"",
        email:"",
        password:"",
        DNI:"",
        BankData:"",
    })
    
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const onChangeInput = e =>{ //e=event
        const{name,value} = e.target // con target guardamos los datos que vamos escribiendo dentro de nuestro input.
        setuser({...user, [name]: value})
    }


console.log(user)


const registerSubmit = async e =>{
    e.preventDefault() // no se refresca la página cuando llamas a la función, con esto no envía datos hasta que no se da a registro




            try {
                const response = await axios.post("http://localhost:5000/api/newuser", {...user});
                console.log(response)
                // localStorage.setItem("token", response.data.accessToken ) // esto irá en el login
                setSuccessMessage(response.data.message)

        } catch (error) {
            setErrorMessage(error.response.data.message)
        } 
}

    return(
        <div className="registro2">

            <form onSubmit={registerSubmit} className="registro">
                <h2>Registro</h2>
                <input type="text" name="name" value={user.name}  placeholder="Introduzca tu nombre" onChange={onChangeInput} />
                <input type="text"name="email" value={user.email}  placeholder="Introduzca tu email" onChange={onChangeInput} />
                <input type="text" name="password" value={user.password}  placeholder="Introduzca una constraseña" onChange={onChangeInput}/>
                <input type="text" name="DNI" value={user.DNI}  placeholder="Introduzca su DNI" onChange={onChangeInput}/>
                <input type="text" name="BankData" value={user.BankData}  placeholder="Introduzca su contraseña para el pago" onChange={onChangeInput}/>

                <button type="Submit">Registro</button> 



                <div className="message_ok" style={{display: successMessage ? "block" : "none"}}>
                        {successMessage}
                </div>

                <div className="message_error" style={{display: errorMessage ? "block" : "none"}}>
                        {errorMessage}
                </div>
            </form>



        </div>
    )
}

export default Register;