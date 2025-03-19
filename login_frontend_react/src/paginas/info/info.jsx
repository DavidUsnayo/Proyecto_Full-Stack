import styles from './info.module.css'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

//CONTEXTO
import { Contexto } from '../../contexto/Contexto'

export function Info(){
    const navigate = useNavigate()
    const { token, person } = useContext(Contexto)

    const [usuario, setUsuario] = useState('')
    const API_URL = import.meta.env.VITE_API_URL;
    
    //COMPROBAR SI EXISTE TOKEN EN EL | localStorage
    useEffect(()=>{
        if(token && person){
            mostrarInfo()
        }else{
            console.log('no hay token')
            navigate('/login')
        }
    },[])

    //MOSTRAR INFO
    function mostrarInfo(){
        fetch(`${API_URL}/info`,{
            method:'GET',
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }else{
                navigate('/login')
                throw new Error("Token inválido o expirado :(");
            }
        })
        .then((data) => {
            console.log(data)
            setUsuario(data.user)
        })
    }
    return(
        <div className={styles.caja_info}>
            <div className={styles.uno_info}> {usuario.id} </div>
            <div className={styles.dos_info}> {usuario.usuario} </div>
            <div className={styles.tres_info}>||</div>
            <div className={styles.cuatro_info}> {usuario.rol} </div>
        </div>
    )
}