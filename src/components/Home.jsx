import { useUsuario } from "./Autenticacion.jsx";
import { Link, Routes, Route, useNavigate} from "react-router-dom";
import User from "./Home/User.jsx";
import Library from "./Home/Library.jsx";
import "./css/home.css"
import { useEffect } from "react";
import Book from "./Home/Book.jsx";

function Navegacion(){
    return(
        <div className="navegacion">
            <div className="nav-image">
                <img src="https://irivera.dsiv2023.com/imagenes/logo.png" alt="" />
            </div>
            <div className="nav-links">
                <div className="row-link">
                <Link className="link" to="/home/user">Usuario</Link>
                </div>
                <div className="row-link">
                <Link className="link" to="/home/library">Catálogo</Link>
                </div>
            </div>
        </div>
    )
}

function Encabezado({estudiante}){

    let nombre_completo = `${estudiante.nombre} ${estudiante.apellido_paterno} ${estudiante.apellido_materno}, ${estudiante.codigo_estudiante}`

    const useEstudent = useUsuario();

    return(
        <div className="encabezado">
            <div className="titulo">
                <h3>BIENVENIDO: {nombre_completo.toUpperCase()}</h3>
            </div>
            <div className="boton">
                <button className="btn btn_principal" onClick={()=>{useEstudent.cerrarSesion()}}>Cerrar sesión</button>
            </div>
        </div>
    )
}

function Cuerpo({estudiante}){

    return(
        <Routes>
            <Route path="/user" element={<User estudiante={estudiante}/>}/>
            <Route path="/library" element={<Library />}/>
            <Route path="/book" element={<Book/>}/>
        </Routes>
    )
}

function Home(){
    const estu = useUsuario()
    const estudiante = estu.getEstudiante()
    const direccion = useNavigate()

    useEffect(
        ()=>{
            if(estu.autenticacion == false){
                direccion("/login")
            }
        },
        [estu]
    )

    return(
        <div className="contenedor">
            <Navegacion />
            <div className="cuerpo">
                <Encabezado estudiante={estudiante}/>
                <Cuerpo estudiante={estudiante}/>
            </div>
        </div>
    )
}

export default Home;