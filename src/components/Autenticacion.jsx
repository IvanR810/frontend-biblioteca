import { useContext, createContext,  useState} from "react";
import url from "../variables.js";

const InsertEstudiante = createContext({
    autenticacion: false,
    loguearse: (codigo, dni)=>{},
    getEstudiante: ()=>{},
    cerrarSesion: ()=>{},
    insertarLibro: (id_libro)=>{},
    getLibro: ()=>{}
})

export function GestionUsuario({children}){
    const [autenticacion, setAutenticacion] = useState(false)
    const [estudiante, setEstudiante] = useState({})
    const [libro, setLibro] = useState({})

    function getEstudiante(){
        return estudiante
    }

    async function loguearse(codigo, dni){
        const respuesta = await fetch(`${url}/api/estudiante/${dni}/${codigo}`)
        if(respuesta.ok){
            const fila = await respuesta.json()
            if(fila.mensaje == 1){
                setEstudiante(fila.estudiante)
                setAutenticacion(true)
            }
        }
    }
    async function insertarLibro(id_libro){
        const respuesta = await fetch(`${url}/api/libro/ID/${id_libro}`)
        if(respuesta.ok){
            const fila = await respuesta.json()
            setLibro(fila)
        }
    }

    function getLibro(){
        return libro
    }

    function cerrarSesion(){
        setAutenticacion(false)
        setEstudiante({})
    }

    return(
        <InsertEstudiante.Provider
        value={
            {
                autenticacion,
                loguearse,
                getEstudiante,
                cerrarSesion,
                insertarLibro,
                getLibro
            }
        }>
            {children}
        </InsertEstudiante.Provider>
    )
}

export const useUsuario = ()=>useContext(InsertEstudiante)
