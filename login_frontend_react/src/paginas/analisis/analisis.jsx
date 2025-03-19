import { useEffect, useState, useContext } from 'react';
import styles from './analisis.module.css'
import { useNavigate } from 'react-router-dom';

//CONTEXTO
import { Contexto } from '../../contexto/Contexto';

export function Analisis(){
    const navigate = useNavigate()
    const { token, person } = useContext(Contexto)

    const [analisis, setAnalisis] = useState('')
    const API_URL = import.meta.env.VITE_API_URL;

    //Comprobar si token y person no sean NULL
    useEffect(()=>{
        if(token && person){
            mostrarEstadisticas()
        }else{
            console.log('no hay token')
            navigate('/login')
        }
    },[])

    function mostrarEstadisticas(){
        fetch(`${API_URL}/analisis`,{
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setAnalisis(data)
        })
    }
            
    return(
        <>
        <p className={styles.title}>ESTADISTICAS - analisis</p>
        <div className={styles.caja_analisis}>
            <div>
                <h2> {analisis.total_clientes} </h2>
                <p>Total Clientes</p>
            </div>
            <div>
                <h2> {analisis.total_notas} </h2>
                <p>Total Notas</p>
            </div>
            <div>
                <h2> {analisis.total_admins} </h2>
                <p>Total Admins</p>
            </div>
            <div>
                <h2>/</h2>
                <p>Total Endpoints</p>
            </div>
        </div>
        </>
    )
}