import { useNavigate } from "react-router-dom";
import { useUsuario } from "../Autenticacion";

function Book(){
    const usar = useUsuario()
    const navegacion = useNavigate()
    const libro = usar.getLibro()

    let funcionCambiar = ()=>{
    }
    return(
        <div className="contenido-libro">
            <div className="contenido-libro-1">
                <div className="titulo">
                    <h3>{libro.titulo}</h3>
                </div>
                <div className="descripcion">
                    {libro.descripcion}
                </div>
                <div className="libro-botones">
                    <button className="btn btn_principal">Atras</button>
                    <button onClick={()=>{navegacion("/view_pdf")}} className="btn btn_principal derecha">Empezar a leer</button>
                </div>
            </div>
            <div className="contenido-libro-2">
                <div className="portada">
                    <img src={libro.url_portada} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Book;