import { useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ajustes.module.css'

//CONTEXTO
import { Contexto } from '../../contexto/Contexto';

//libreria [toastify] para alerts
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Ajustes(){
    const [borde, setBorde] = useState('#f7f7f7')
    const [zoom, setZoom] = useState('1')
    const [colorTexto, setColorTexto] = useState('#ffdd00')

    const { token, person } = useContext(Contexto)
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    

    //COMPROBAR SI EXISTE TOKEN EN EL | localStorage
    useEffect(()=>{
        if(token && person){
            mostrarAjustes()
        }else{
            console.log('no hay token')
            navigate('/login')
        }
    },[])

    //MOSTRAR AJUSTES
    function mostrarAjustes(){
        fetch(`${API_URL}/ajustes`,{
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setBorde(data.borde)
            setZoom(data.zoomCard)
            setColorTexto(data.colorTexto)
        })
    }

    //CAMBIAR COLOR DE TEXTO
    function cambiarColorTexto(e){
        fetch(`${API_URL}/ajustes/updateColorTexto`, {
            method: "PUT",
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                colorTexto:colorTexto
            })
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            toast.success('Color de Texto Cambiado', {position:'bottom-right', autoClose:1000})
        })
    }

    //CAMBIAR COLOR DE BORDER | FONDO
    function cambiarBorderFondo(){
        fetch(`${API_URL}/ajustes/updateBorde`,{
            method: "PUT",
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                borde:borde
            })
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            toast.success('Color de Fondo Cambiado', {position:'bottom-right', autoClose:1000})
        })
    }

    //CAMBIAR TAMAÑO | ZOOM
    function cambiarZoom(valor){
        fetch(`${API_URL}/ajustes/updateZoom`,{
            method: "PUT",
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                zoomCard:valor
            })
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            toast.success('Zoom Cambiado', {position:'bottom-right', autoClose:1000})
        })
    }

    return(
        <div className={styles.caja_ajustes}>
            <ToastContainer /> {/* componente de toast | libreria de Notificaciones  */}
            <div className={styles.borde}>
                <input type="color" onChange={(e)=>setColorTexto(e.target.value)} value={colorTexto} />
                <h4> {colorTexto} </h4>
                <button onClick={()=> cambiarColorTexto()}>Cambiar Color de Texto</button>
            </div>
            <div className={styles.borde}>
                <input type="color" onChange={(e)=>setBorde(e.target.value)} value={borde} />
                <h4> {borde} </h4>
                <button onClick={()=> cambiarBorderFondo()}>Cambiar Border | Fondo</button>
            </div>
            <div className={styles.borde}>
                <div className={styles.zoom_ui}>
                    <p onClick={()=>cambiarZoom('0.6')}>A</p>
                    <p onClick={()=>cambiarZoom('1')}>A</p>
                    <p onClick={()=>cambiarZoom('1.4')}>A</p>
                </div>
                <p>Zoom Texto</p>
            </div>
        </div>
    )
}


//modificar : antes de entrar y hacer la peticion | verificar si hay un token en el localStorage