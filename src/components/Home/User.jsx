import { Link } from "react-router-dom";

function TablaDatos({estudiante}){
    return(
        <div>
            <table>
                <tr><td>Codigo:</td><td>{estudiante.codigo_estudiante}</td></tr>
                <tr><td>Nombre:</td><td>{estudiante.nombre}</td></tr>
                <tr><td>Apellido paterno:</td><td>{estudiante.apellido_paterno}</td></tr>
                <tr><td>Apellido materno:</td><td>{estudiante.apellido_materno}</td></tr>
                <tr><td>Fecha de nacimiento:</td><td>{estudiante.fecha_nacimiento}</td></tr>
            </table>
        </div>
    )
}


function DatosUsuario({estudiante}){
    return(
        <div className="datos">
            <div className="datos-titulo">
                <h4>Datos de usuario</h4>
            </div>
            <div className="datos-contenido">
                <div className="datos-1">
                    <div className="datos-imagen">
                        <img src={estudiante.foto} alt="imagen_usuario" />
                    </div>
                    <div className="tabla">
                        <TablaDatos estudiante={estudiante}/>
                    </div>
                </div>
                <hr />
                <div className="datos-2">
                    <table>
                        <tr><td>Correo:</td><td>{estudiante.correo}</td></tr>
                        <tr><td>Programa de estudios:</td><td>{estudiante.programa_estudios}</td></tr>
                        <tr><td>Ciclo:</td><td>{estudiante.ciclo}</td></tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

function ColeccionLibros(){
    return(
        <div className="coleccion">
            <div className="coleccion-titulo">
                <h4>Coleccion de libros</h4>
            </div>
            <div className="coleccion-contenido">
                <p>Vaya al parecer no hay ningún libro</p>
                <Link className="consulta" to="/home/library">Consulte el catálogo de libros</Link>
            </div>
        </div>
    )
}


function User({estudiante}){

    return(
        <div className="usuario">
            <div className="sub_usuario">
                <DatosUsuario estudiante={estudiante}/>
            </div>
            <div className="sub_usuario">
                <ColeccionLibros />
            </div>
        </div>
    )
}

export default User;