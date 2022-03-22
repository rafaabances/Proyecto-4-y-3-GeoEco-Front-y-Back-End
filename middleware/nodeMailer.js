const nodemailer = require("nodemailer");   

const userMail = process.env.USER_MAIL
const pass = process.env.PASS_MAIL

const transport = nodemailer.createTransport({    // Con esto creo la conexión SMTP (tipo de conexion) y le paso las credenciales del correo remitente
    service: "Gmail", // se puede aplicar a hotmail
    pool: true,
    host: 'smtp.gmail.com', // Gmail as mail client / si fuera hotmail pondrías smtp.hotmail.com
    port: 465,
    secure: true, // use SSL

  auth: {
    user: userMail,
    pass: pass,
  },
  tls: {
    rejectUnauthorized: false
},
});


// Aquí creo el correo de bienvenida que llamaré la función una vez creado el usuario

module.exports.sendWelcomeEmail = (email, password, name) => {
//   console.log("Check");
  transport.sendMail({ // transpor es una dependencia de nodemailer y sendmail y sendWelcomeEmail sopn funciones (le ponemos el nombre que queramos)
    from: userMail,
    to: email,
    subject: "¡Bienvenido a GeoEco!",
    html: `<h1>¡Datos de acceso a la aplicación!</h1>
        <h2>¡¡Hola ${name}! </h2>
        <p>Tus datos de acceso son los siguientes:</p>
        <p><b>Usuario:</b> ${email}</p>
        <p><b>Password:</b> ${password}</p>
        <p>Gracias por hacerte usuario de nuestra pagina web y esperemos que disfrutes! </p>
        </div>`,
  }).catch(err => console.log(err));
};



// --- donde USER_MAIL y PASS_MAIL son datos guardados en tu archivo .env y es tu correo con tu contraseña --- ojo, está hecho para gmail --- 