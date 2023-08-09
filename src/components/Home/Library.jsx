import {useState, useEffect} from "react"
import url_host from "../../variables.js"
import { useUsuario } from "../Autenticacion.jsx"
import { useNavigate } from "react-router-dom"

function Libro({datos}){

    const libro = useUsuario()
    const navegacion = useNavigate()
    let cambiarVentana = async(e)=>{
        await libro.insertarLibro(e.currentTarget.getAttribute("id"))
        if(await libro.getLibro().id_libro != undefined){
            navegacion("/home/book")
        }
    }


    return (
        <div className="libro" id={datos.id_libro} onClick={(e)=>{cambiarVentana(e)}}>
            <div className="libro-imagen">
                <img src={datos.url_portada} alt="" />
            </div>
            <div className="libro-titulo">
                <div>{datos.titulo}</div>
            </div>
        </div>
    )
}

function Library(){

    const [campoGrupo,setCampoGrupo] = useState("")
    const [campoCategoria,setCampoCategoria] = useState("")
    const [grupo,setGrupo] = useState([])
    const [categoria,setCategoria] = useState([])
    const [libro, setLibro] = useState([])

    let obtenerCategorias = async()=>{
        let url = `${url_host}/api/categoria`
        const respuesta = await fetch(url)
        if(respuesta.ok){
            const datos = await respuesta.json()
            setCategoria(datos)
        }
    }

    let cambioGrupo = async ()=>{
        let url = `${url_host}/api/categoria/buscar/${campoGrupo}`
        const respuesta = await fetch(url)
        if(respuesta.ok){
            const datos = await respuesta.json()
            setCategoria(datos)
        }
    }

    let obtenerGrupos = async()=>{
        let url = `${url_host}/api/categoria/grupos`
        const respuesta = await fetch(url)
        if(respuesta.ok){
            const datos = await respuesta.json()
            setGrupo(datos)
        }
    }

    //------------------- LIBRO -----------------//

    let obtenerLibros = async()=>{
        let url = `${url_host}/api/libro`
        const respuesta = await fetch(url)
        if(respuesta.ok){
            const datos = await respuesta.json()
            setLibro(datos)
        }
    }

    let recargarLibro = async ()=>{
        let url = `${url_host}/api/libro/grupo/${campoGrupo}`
        const respuesta = await fetch(url)
        if(respuesta.ok){
            const datos = await respuesta.json()
            setLibro(datos)
        }
    }

    let recargarLibro2 = async ()=>{
        let url = `${url_host}/api/libro/categoria/${campoCategoria}`
        const respuesta = await fetch(url)
        if(respuesta.ok){
            const datos = await respuesta.json()
            setLibro(datos)
        }
    }
    let recargarLibro3 = async ()=>{
        let url = `${url_host}/api/libro/lista/${campoGrupo}/${campoCategoria}`
        const respuesta = await fetch(url)
        if(respuesta.ok){
            const datos = await respuesta.json()
            setLibro(datos)
        }
    }


    useEffect(()=>{
        obtenerGrupos()
        obtenerCategorias()
        obtenerLibros()
    },[])

    useEffect(()=>{
        if(campoGrupo == "Todos"){
            obtenerCategorias()
            if(campoCategoria == ""){
                obtenerLibros();
            }
            else{
                recargarLibro2();
            }
        }
        else{
            cambioGrupo()
            if(campoCategoria == ""){
                recargarLibro();
            }
            else{
                recargarLibro3();
            }
        }

    }, [campoGrupo, campoCategoria])
    return(
        <div className="libreria">
            <div className="libreria-1">
                <div className="busqueda">
                    <div className="busqueda-1">
                        <div className="seleccion">
                            <p>Categoria: </p>
                            <select onChange={(e)=>{setCampoCategoria(e.target.options[e.target.options.selectedIndex].getAttribute("id"))}}>
                                <option id="C-0">Todos</option>
                                {
                                    categoria.map((cat)=>{
                                        return <option key={cat.id_categoria} id={cat.id_categoria}>{cat.nombre}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="seleccion">
                            <p>Grupo: </p>
                            <select onChange={(e)=>{setCampoGrupo(e.target.value)}}>
                                <option id="G-0">Todos</option>
                                    {
                                        grupo.map((grup)=>{
                                            return <option key={grup.id_grupo} id={grup.id_grupo}>{grup.letra}</option>
                                        })
                                    }
                            </select>
                        </div>
                    </div>
                    <div className="busqueda-2">
                        <input className="input-libro" type="text" placeholder="Buscar"></input>
                        <button className="btn-icon-search"></button>
                    </div>
                </div>
            </div>


            <div className="libreria-2">
                <div className="libros">
                    {
                        libro.map((item)=>{
                            return <Libro datos={item}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Library;