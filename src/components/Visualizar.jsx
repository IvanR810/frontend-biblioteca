import { Document, Page, pdfjs} from "react-pdf"
import { useState } from "react"
import { useUsuario } from "./Autenticacion"
import { useNavigate } from "react-router-dom";
import "./css/visualizar.css"

function Visualizar(){
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.js',
        import.meta.url,
      ).toString();
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const usarLibro = useUsuario()
    const libro = usarLibro.getLibro()
    const navegacion = useNavigate()

    function onDocumentLoadSuccess(numPages) {
        setNumPages(numPages._pdfInfo["numPages"])
    }

    return(
        <div className="pdf_view">
            <div className="pdf_bar">
                <div className="pdf_boton_1">
                    <button  className=" btn btn_secundario" onClick={()=>{navegacion("/home/user")}}>Salir</button>
                </div>
                <div className="pdf_boton_2">
                    <button className="btn_guia btn btn_secundario" onClick={()=>{
                        if(pageNumber != 1){
                            setPageNumber(pageNumber - 1)
                        }
                    }}>Atras</button>
                    <div>
                        <span className="pagina_text">{pageNumber}</span>
                    </div>
                    <button className="btn_guia btn btn_secundario" onClick={()=>{
                        if(pageNumber != numPages){
                            setPageNumber(pageNumber + 1)
                        }
                    }}>Siguiente</button>
                </div>   
            </div>
            <div className="pdf_content">
                <Document className="pdf" file={libro.url_contenido} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber}/>
                </Document>
            </div>
        </div>
    )
}

export default Visualizar