import {useEffect, useState} from "react"
import { useUsuario } from "./Autenticacion.jsx"
import { useNavigate } from "react-router-dom"
import "./css/principal.css";

function Logo(){
    return(
        <div className="card-1">
            <div className="imagen">
            <img src="https://irivera.dsiv2023.com/imagenes/logo.png" alt="Logo istta" />
            </div>
        </div>
    )
}

function Formulario({funcion}){

    const [usuario, setUsuario] = useState("")
    const [contra, setContra] = useState("")

    const [btn_u_1, setBtn1] = useState("btn_u_1")
    const [btn_u_2, setBtn2] = useState("btn_u_2")

    
    const user = useUsuario()

    const loguearse = ()=>{
        user.loguearse(usuario, contra)
    }

    return(
        <div className="card-2">
            <div className="card-2-1">
                <div className="row boton-1">
                    <button style={{padding:"10px 30px"}} className={`btn ${btn_u_1}`} onClick={
                        ()=>{
                            if(btn_u_1 != "btn_u_1"){
                                setBtn1("btn_u_1")
                                setBtn2("btn_u_2")
                                funcion("https://irivera.dsiv2023.com/imagenes/fondo1.png")
                            }
                        }
                    }>Usuario</button>
                    <button className={`btn ${btn_u_2}`} onClick={
                        ()=>{
                            if(btn_u_2 != "btn_u_1"){
                                setBtn2("btn_u_1")
                                setBtn1("btn_u_2")

                                funcion("https://irivera.dsiv2023.com/imagenes/fondo2.png")
                            }
                        }
                    } >Administrador</button>
                </div>
                <div className="row"><input type="text" className="input_usuario" placeholder="Usuario" onChange={(e)=>{setUsuario(e.target.value)}}/></div>
                <div className="row"><input type="password" className="input_contra" placeholder="Contraseña" onChange={(e)=>{setContra(e.target.value)}}/></div>
                <div className="row"><button className="btn btn_principal" onClick={loguearse}>Ingresar</button></div>
            </div>
        </div>
    )
}

function Principal(){    

    const user = useUsuario()
    const [imagen, setImagen] = useState("https://irivera.dsiv2023.com/imagenes/fondo1.png")

    const direccion = useNavigate();

    if(user.autenticacion == true){
        direccion("/home/user")
    }


    return(
        <div className="contenedor">
            <div className="contenedor-1">
                <Logo />
                <Formulario funcion={setImagen}/>
            </div>
            <div className="contenedor-2">
                <img className="animacion" src={imagen} alt="" />
            </div>
        </div>
    )
}

export default Principal;