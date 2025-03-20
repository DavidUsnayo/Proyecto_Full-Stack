import { useEffect, useState } from 'react'
import styles from './notas.module.css'
import { useNavigate } from 'react-router-dom';

//CONTEXTO
import { useContext } from 'react';
import { Contexto } from '../../contexto/Contexto';

export function Notas(){

    const { token, person } = useContext(Contexto)

    const [ajustesUI,setAjustesUI] = useState('')
    const [textoNota, setTextoNota] = useState('')
    const [notas, setNotas] = useState([]);

    const [isLoading, setIsLoading] = useState(true); // Nuevo estado de carga

    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    
    useEffect(() => {
        if (token && person) {
            mostrarNotas()
            ajustesColores()
        } else {
            console.log('no hay token y person | son %cNULL','background-color:lightblue; padding:0px 10px',)
            navigate('/login')
        }
    }, [])


    //MOSTRAR NOTAS
    function mostrarNotas(){
        fetch(`${API_URL}/notas`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }else{
                navigate('/login')
                localStorage.removeItem('token')
                setToken(null)
                throw new Error("Token inválido o expirado :(");
            }
        })
        .then(data => {
            setNotas(data);
            console.log(data)
        })
        .catch((err)=> console.log(err))
        .finally(() => setIsLoading(false)); // Termina la carga en cualquier caso
    }

    //AGREGAR NOTAS
    function agregarNota(){
        if(textoNota == ''){
            console.log('llenar')
        }else{
            fetch(`${API_URL}/notas/crearNota`, {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    titulo:textoNota
                })
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                mostrarNotas()
            })
            setTextoNota('')
        }
    }

    //ELIMINAR NOTA
    function eliminarNota(id){
        fetch(`${API_URL}/notas/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            mostrarNotas()
        })
    }

    function ajustesColores(){
        fetch(`${API_URL}/ajustes`,{
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(res => res.json())
        .then(data => {
            console.log('cargar de notas - [color, fondo, zoom]: ',data)
            setAjustesUI(data)
        })
    }

    if (isLoading) {  //si isLoading es tru muesta esto | cargando
        return <h2>Cargando...</h2>; // Muestra un mensaje mientras espera la verificación
    }
    
    return(
        <>
            <div className={styles.caja_notas}>
                <div className={styles.buscador}>
                    <input type="text" value={textoNota} placeholder='escribe' onChange={(e)=>setTextoNota(e.target.value)} />
                    <button onClick={()=>agregarNota()}>Agregar</button>
                </div>
                <div className={styles.lista}>
                    {
                    notas.length == 0 ? <p style={{margin:'20px auto',}}>No Hay Notas</p> : 
                    notas.map((item,index)=>{
                        return(
                            <div style={{background:ajustesUI.borde, zoom:ajustesUI.zoomCard, border:`1px solid ${ajustesUI.borde}`}} className={styles.nota} key={index} >
                                <p style={{color:ajustesUI.colorTexto}} > {item.titulo} </p>
                                <h4 onClick={()=> eliminarNota(item.id)}>x</h4>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </>
    )
}