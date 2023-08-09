import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Principal from "./components/Principal.jsx"
import Home from "./components/Home.jsx"
import { GestionUsuario } from "./components/Autenticacion.jsx"
import Error404 from "./Error.jsx"
import Visualizar from "./components/Visualizar.jsx"

function Vacio(){
    return (
        <>
            <a href="/login">Iniciar sesión</a>
        </>
    )
}

function App(){
    const GestionRutas = createBrowserRouter([
        {
            path:"/",
            element: <Vacio/>
        },
        {
             path:"/login",
             element:<Principal />
        },
        {
            path:"/home/*",
            element:<Home />
        },
        {
            path:"/view_pdf",
            element:<Visualizar/>
        },
        {
            path:"*",
            element:<Error404 />
        }
    ])

    return (
        <GestionUsuario>
            <RouterProvider router={GestionRutas}/>
        </GestionUsuario>
    )
}

export default App