# Proyecto-4 y 3-GeoEco-Front y Back-End

## GeoEco.Com

!-- Accede a la web: [GeoEco.com](https://rafi95geoeco.herokuapp.com/) --> 

![Portada](https://user-images.githubusercontent.com/96442220/162167230-2e18274b-60d3-4418-b267-d9e2e7c6005c.jpg)


Se trata de un proyecto en el cual se va a desarrollar una web de contenidos sobre Geología y Economía y también a futuro diversos temas sobre ciencia, política economía, esta destinado a personas curiosas que les guste aprender sobre este tipo de temas, va a constar de una página Home otra de contactos, otra de vídeos y otra de blog de artículos y noticias en los cuales se va a poder realizar comentarios, para acceder a la Home y a la página de contacto no va a ser necesario suscribirse y pagar pero para acceder a los contenidos del blog y vídeos sí. Esto se va a controlar estableciendo un acceso en el que será necesario escribir tu usuario y contraseña y para poder validar este usuario o contraseña que obtienes registrándote en el formulario de la página de contactos, deberás haber pagado el importe mensual/anual que se haya establecido.

## La estructura de la web se compone de:

1. HOME: Es la página principal, en ella tenemos una NavBar que te lleva al resto de páginas,en ella ponemos a que nos dedicamos y que es lo que ofrecemos, además consta de enlaces que te llevan a contacto que es donde puedes ver nuestras redes sociales, correos y donde se encuentra el formulario de registro a la suscripción.
***
2. Contacto: En esta página podemos observar nuestras redes sociales, explicamos la diferencia entre una suscripción u otra (quizás hacer otra página para el formulario ( aquí eligirá la suscripción) y explicar aquí el pago) y es donde va estar el formulario de registro y el enlace que te lleva al pago.
***
3. Pago: Esta página se abrirá al cliente que haya rellenado el formulario de suscripción y podrá realizar el pago del tipo de suscripción que haya elegido.
***
4. Blogs: En esta página se van a poder disfrutar de los artículos y noticias agrupados en 2 categorías Geología y Economía, también se podrá responder con comentarios a esas noticias y artículos, solo podrá acceder quien se haya suscrito y realizado el pago.
***
5. Vídeos: Aquí el suscriptor podrá visualizar todo tipo de vídeos agrupados en 2 categorías Geología y Economía,  también se podrá responder con comentarios a esas noticias y artículos, solo podrá acceder quien se haya suscrito y realizado el pago.
***
6. Login: Aquí el suscriptor o administrador podrán loguearse.

7. Registro: Aquí el suscriptor podrá registrarse y procederá al pago.
***

8. Pago: Aquí el suscriptor podrá realizar el pagop en la categoría que considere y accederá al Login.
***

9. LogOut: Aquí se podrá desloguearse tanto el suscriptor como el administrador.
***

10. Contenidos: Aquí los suscriptores podrán ver los contenidos de vídeos y noticias.
***

11. Contacto/Landing Page: En esta página se explica como es la empresa, lo que contiene y se puede registrar o hacer login, lo que te permite acceder a los contenidos.
***

* En blogs y videos se podrá poner comentarios.



## Para poder acceder hemos utilizado 2 tipos de usuarios:

1. Administrador: Es el que se va a encargar de subir los contenidos a la página y se va a ocupar del mantenimiento. El rol es 1.

3. Suscriptor: Van a ser los clientes que hayan realizado el registro y el pago, estos usuarios podrán acceder a los contenidos de vídeos y del blog asi como realizaer comentarios a los mismos. El rol es 2.

*Para poder ser usuario de la página es necesario proceder al pago.

## El arbolado que hemos utilizado para los Modelos e Id es:
![Home](https://user-images.githubusercontent.com/96442220/157062458-465a45de-127e-4a6b-a2b1-9f34238f9b71.png)



## Tenologías hemos empleado: 

![Mern](https://user-images.githubusercontent.com/96442220/162167570-4391228d-e653-4899-ab1a-8b1ea984ca9e.png)


![Postman](https://user-images.githubusercontent.com/96442220/153619900-b7e046bc-6146-4175-ba61-23f6d37c7fed.png)

![images](https://user-images.githubusercontent.com/96442220/157254686-8fb73679-084e-482d-b0ae-7e0aa2dd9231.png)

- React o React.js  es una biblioteca Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página. Es mantenido por Facebook y la comunidad de software libre: Ha sido nustro lenguaje de Front End, con el hemos conectado las rutas del back y las hemos puesto en los diversos componentes que se han ido creando así como hemos codificado que queriamos que saliera en cada componente, tenemos componentes de:

     - Vídeos
     - Noticias
     - Comentarios
     - Login
     - LogOut
     - Registro
     - modificar noticia y vídeo

Hemos usados diversos Hooks, Los Hooks son una nueva característica en React 16.8. Estos te permiten usar el estado y otras características de React sin escribir una clase.

   - UseState: Aquí, useState es un Hook . Lo llamamos dentro de un componente de función para agregarle un estado local. React mantendrá este estado entre re-renderizados. useState devuelve un par: el valor de estado actual y una función que le permite actualizarlo. Puedes llamar a esta función desde un controlador de eventos o desde otro lugar. Es similar a this.setState en una clase, excepto que no combina el estado antiguo y el nuevo. (Mostraremos un ejemplo comparando useState con this.state en Usando el Hook de estado).El único argumento para useState es el estado inicial. En el ejemplo anterior, es 0 porque nuestro contador comienza desde cero. Ten en cuenta que a diferencia de this.state, el estado aquí no tiene que ser un objeto — aunque puede serlo si quisieras. El argumento de estado inicial solo se usa durante el primer renderizado.

   - UseEffect: El Hook de efecto, useEffect, agrega la capacidad de realizar efectos secundarios desde un componente de función. Tiene el mismo propósito que componentDidMount,componentDidUpdate y componentWillUnmount en las clases React, pero unificadas en una sola API. (Mostraremos ejemplos comparando useEffect con estos métodos en Usando el Hook de efecto). Cuando llamas a useEffect, le estás diciendo a React que ejecute tu función de “efecto” después de vaciar los cambios en el DOM. Los efectos se declaran dentro del componente para que tengan acceso a sus props y estado. 
   
   - UseNavigate: Sirve para que la página se vaya a otro componente, pero sin recargar la página.
   
   - UseParams: Sirve para coger la Id proveniente de otro componente y usarlo.


- Node JS: Ha sido el lenguaje de Backend que hemos utilizado, lo hemos usado para realizar las rutas al servidor así como describir los modelos, exportarlos y conectarlos vía node modules.

     Dependencias:
            
     Se han utilizado varias dependencias, que nos han permitido diversas funcionalidades:
     
     * Mongoose: Es una librería para Node. js que nos permite escribir consultas para una base de datos de MongoDB, con características como validaciones,                   construcción de queries, middlewares, conversión de tipos y algunas otras, que enriquecen la funcionalidad de la base de datos.
            
    * Nodemoon: Es una utilidad de interfaz de línea de comandos (CLI) desarrollada por @rem que envuelve su aplicación Node, vigila el sistema de archivos y reinicia                 automáticamente el proceso ( no necesitas reiniciar el servidor cada vez que realizas un cambio)
            
     * Express: Express es el framework web más popular de Node, y es la librería subyacente para un gran número de otros frameworks web de Node populares. Proporciona                 mecanismos para:

      - Escritura de manejadores de peticiones con diferentes verbos HTTP en diferentes caminos URL (rutas).
                  
      - Integración con motores de renderización de "vistas" para generar respuestas mediante la introducción de datos en plantillas.

      - Establecer ajustes de aplicaciones web como qué puerto usar para conectar, y la localización de las plantillas que se utilizan para renderizar la respuesta.

      - Añadir procesamiento de peticiones "middleware" adicional en cualquier punto dentro de la tubería de manejo de la petición.
            
     * Dotenv: La librería Dotenv nos permitirá cargar a través del método config() y el objeto path, el archivo .env que necesitemos de acuerdo al entorno deseado.                  Agregamos 2 nuevas tareas en nuestro archivo package.
            
     * Bcrypt: Es una función de hashing de passwords diseñado por Niels Provos y David Maxieres, basado en el cifrado de Blowfish. Lleva incorporado un valor llamado                  salt, que es un fragmento aleatorio que se usará para generar el hash asociado a la password, y se guardará junto con ella en la base de datos. Así se evita que                  dos passwords iguales generen el mismo hash y los problemas que ello conlleva, por ejemplo, ataque por fuerza bruta a todas las passwords del sistema a la vez. Con              el salt, se añade un grado de complejidad que evita que el hash asociado a una password sea único.
            
     * JWT (JsonWebToken): Es un token de seguridad que nosotros creamos al momento que el usuario se registra con sus credenciales. Este token se devuelve al cliente el cual          tendrá que enviar cada vez que solicita información al servidor. Nos permite identificarnos cuando realizamos el Login.


            


***
- Mongo DB: Es el tipo de base de datos que hemos utilizado para el proyecto, se trata de una base NOSQL donde hemos almacenado todos nuestros datos de la web.
***
- PostMan: Se trata de una aplicación que nos permite realizar pruebas API. Es un cliente HTTP que nos da la posibilidad de testear ‘HTTP requests’ a través de una interfaz gráfica de usuario, por medio de la cual obtendremos diferentes tipos de respuesta que posteriormente deberán ser validados.

     - Métodos:
      
        - Postman nos ofrece muchos métodos para interactuar con los ‘endpoints’. Los más utilizados y sus funciones son:

          * GET: Obtener información
          * POST: Agregar información
          * PUT: Reemplazar la información 
          * PATCH: Actualizar alguna información
          * DELETE: Borrar información

- VisualStudio: Es el editor de código empleado.

- Git es nuestro repositorio y Github es nuestra cuenta.
---

## Modelos:

Los modelos dentro de NodeJS van a representar a una entidad de la base de datos y más concretamente van a representar a un único registro o documento de nuestra base de de datos.

Por ejemplo, si tenemos una colección en la base de datos llamada pagos, dentro de ella se guardarán documentos de tipo Pago. Pues en nuestro código tendremos el modelo de Pago con todos sus campos y cuando queramos crear un Pago haremos una instancia de ese modelo.

Se han establecido varios modelos: CommentVideo, CommentBlog, Users, Pay, Video, Blog y Category.

## Rutas:

El direccionamiento hace referencia a la determinación de cómo responde una aplicación a una solicitud de cliente en un determinado punto final, que es un URI (o una vía de acceso) y un método de solicitud HTTP específico (GET, POST, etc.).

Cada ruta puede tener una o varias funciones de manejador, que se excluyen cuando se correlaciona la ruta.

La definición de ruta tiene la siguiente estructura:

* app es una instancia de express.
* METHOD es un método de solicitud HTTP.
* PATH es una vía de acceso en el servidor.
* HANDLER es la función que se ejecuta cuando se correlaciona la ruta.

En nuestro proyecto hemos realizado diversas rutas que interrealcionan modelos y hacen diversas solicitudes o llamdas:

- CommentBlogRouter: Consta todo de Auth (es necesario estar logueado y disponer de un usuario) No hace falta ser administrador.

    - Get: Permite ver todos los comentarios. http://localhost:5000/api/commentsvideo
    - Find: Permite ver un comentario en concreto gracias a la ID. http://localhost:5000/api/commentvideo/:id
    - Post: Permite crear un nuevo comentario, este se almacena en la propiedad del blog commentNew (es una array []). http://localhost:5000/api/newcommentvideo/:videoId
    - Update: Permite modificar un comentario que hayas realizado tú, no otra persona. http://localhost:5000/api/updatecommentvideo/:id
    - Delete: Permite borrar un usuario que hayas realizado tú, no otra persona. http://localhost:5000/api/deletecommentvideo/:id


- CommentVideoRouter: Todas las rutas constan de la función Auth (es necesario estar logueado y disponer de un usuario) No hace falta ser administrador.

    - Get: Permite ver todos los comentarios. http://localhost:5000/api/commentsblog
    - Find: Permite ver un comentario en concreto gracias a la ID. http://localhost:5000/api/commentblog/:id
    - Post: Permite crear un nuevo comentario, este se almacena en la propiedad del video commentV (es una array []). http://localhost:5000/api/newcommentblog/:blogId
    - Update: Permite modificar un comentario que hayas realizado tú, no otra persona. http://localhost:5000/api/updatecommentblog/:id
    - Delete: Permite borrar un usuario que hayas realizado tú, no otra persona. http://localhost:5000/api/deletecommentblog/:id

- PayRouter: No disponen de la solicitud de modificar ni borrar debido a la seguridad.

    - Get: Permite ver todos los pagos, es necesario loguearte y ser administrador. http://localhost:5000/api/payments
    - Find: Permite ver un pago en concreto gracias a la ID, es necesario loguearte y solo podrás ver el tuyo. http://localhost:5000/api/findpay/:id
    - Post: Permite crear un nuevo pago,  No es necesario loguearte ni ser administrador para facilitar que puedas realizarlo ya que es paso previo 
     a poder crerar un usuario nuevo. http://localhost:5000/api/newpayment


- UserRouter: Todas las rutas constan de la función Auth salvo el Post.

    - Get: Permite ver todos los usuarios, para verlos todos es necesario tener el rol de aministrador. http://localhost:5000/api/users
    - Find: Permite ver un usuario en concreto gracias a la ID. http://localhost:5000/api/finduser/:id
    - Post: Permite crear un nuevo usuario Es la única que no lleva auth ya que tiene que permitir crear los usuarios, en React lo configuraremos para que haste después de             haber realizado el pago no se cree el usuario. http://localhost:5000/api/newuser
    - Update: Permite modificar un usuario creado por ti. http://localhost:5000/api/updateuser/:id
    - Delete: Permite borrar un usuario creado por ti. http://localhost:5000/api/deleteuser/:id
    
    - Login: Permite al usuario registrarse gracias a la función AccessToken que crear el token y la función Auth revisa si es válido así como la función Admin revisas i es            administrador o No. http://localhost:5000/api/login

- CategoryRouter: No dispone de find (GetbyID), ya que solo va a ver dos categorías (Geología y Economía), tampoco dispone de borrar por aumentar la seguridad.

    - Get: Permite ver todos las categorías, es necesario loguearte. http://localhost:5000/api/categories
    - Post: Permite crear una nueva categoría, es necesario loguearte y ser administrador. http://localhost:5000/api/newcategory
    - Update: Permite modificar una categoría, es necesario loguearte y ser administrador. http://localhost:5000/api/updatecategory/:id

- BlogRoter: Todas las rutas constan de la función Auth (ya que solo tienen acceso los uasuarios)

    - Get: Permite ver todas las noticias. http://localhost:5000/api/news
    - Find: Permite ver una noticia en concreto gracias a la ID. http://localhost:5000/api/findnew/:id
    - Post: Permite crear una nueva noticia, es necesario ser administrador pues él es el encargado del mantenimiento del contenido. http://localhost:5000/api/newarticle
    - Update: Permite modificar una noticia, es necesario ser administrador. http://localhost:5000/api//updatenew/:id
    - Delete: Permite borrar una noticia, es necesario ser administrador. http://localhost:5000/api//deletenew/:id

- VideoRouter: Todas las rutas constan de la función Auth (ya que solo tienen acceso los uasuarios)

    - Get: Permite ver todos los videos. http://localhost:5000/api/videos
    - Find: Permite ver un video en concreto gracias a la ID. http://localhost:5000/api/findvideo/:id
    - Post: Permite crear un nuevo video, es necesario ser administrador pues él es el encargado del mantenimiento del contenido. http://localhost:5000/api/newvideo
    - Update: Permite modificar un vídeo, es necesario ser administrador. http://localhost:5000/api//updatevideo/:id
    - Delete: Permite borrar un vídeo, es necesario ser administrador. http://localhost:5000/api//deletevideo/:id


***

## Funcionalidades:

* Login: Hemos realizado un control, estableciendo la necesidad de loguearse para saber quién ha procedido al pago y pueda visualizar los contenidos, para ello nos hemos apoyado en las funcionalidades de Auth (authorization) y Admin (adminsitrador)

* Auth: Nos permite comprobar si el usuario se ha logueado a través del token, una vez comprobado el token, el usuario ya puede acceder a los contenidos y comentarlos, esto se ha configurado poniendo esta funcionalidad en la rutas dirigidas al servidor.

* Admin: Nos permite comprobar si el usuario es administrador o es suscriptor, si es administrador se le habilita a poder subir, modificar o borrar contenidos, esto se comprueba gracias al establecimiento de una propiedad en el modelo de usuario, el rol, 1 si es administrador, 0 si es suscriptor. Esto también se ha configurado poniendo esta funcionalidad en la rutas dirigidas al servidor.

* .env: Son archivos que pueden valorarse como un modelo para el almacenamiento de variables de entorno y su formato es muy sencillo de entender. Escribiremos los .env con pares clave (nombre de variable) y valor, separados por un carácter = y situaremos cada uno en una línea diferente. Colocaremos el archivo .env en la raíz del proyecto (nos referimos a fuera del directorio de publicación), sin nombre (solo extensión). Es decir, en un directorio por encima para no dar acceso a los usuarios a estas variables. Este no lo subiremos (o lo oacultaremos de) a nuestro repositorio git (ya se accede a él gracias a las dependencias y de esa forma no revelamos nuestras credenciales, contraseñas o tokens.)


* .gitignore: El archivo .gitignore, es un archivo de texto que le dice a Git qué archivos o carpetas ignorar en un proyecto. En nuestro caso va a ser node_modules y .env ya que no queremos que se rastreen credenciales, llaves privadas, las claves API y otra información confidencial en un repositorio de git, especialmente uno público.

* nodeMailer: Contiene una función que combinado con las veriables USER_MAIL Y PASS_MAIL en el archivo .env y la dependencia nodemailer provee la funcionalidad de que cuando el usuario se registra en nuestra web se le envía un correo eléctónico a su cuenta dándole la bienvenida y le proporciona los datos del nombre, email y contraseña que ha creado.

***
Contacto: Hotmail: **rafaelabancesserrate@hotmail.com**
Telf: **+34 608 292 160**

