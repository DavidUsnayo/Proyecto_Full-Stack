import styles from './navegacion.module.css'
import { Link, useLocation, useNavigate } from "react-router-dom"

//CONTEXTO
import { useContext, useEffect, useState } from 'react'
import { Contexto } from '../../contexto/Contexto'

export function Navegacion(){
    //el componente contexto.jsx se encarga de pasar del localStorage a varibales [token - person] 
    const [pe, setPe] = useState({rol:[]})

    const { person, setPerson, setToken } = useContext(Contexto)

    useEffect(()=>{
        if(person){
            setPe(person)
        }
    },[])
    
    const location = useLocation()
    const navigate = useNavigate()

    function activar(ruta){
        return location.pathname === '/dashboard'+ruta ? styles.push : '';  //esto es el cambio de color de fondo del link 
    }
    function cerrarSesion(){
        localStorage.clear()
        setPerson(null)
        setToken(null)
        navigate('/login')
    }
    
    const rutas = [
        { to: 'notas', texto: '◼ Notas', roles: [] }, // Acceso para todos
        { to: 'info', texto: '◼ Informacion', roles: [] }, // Acceso para todos
        { to: 'analisis', texto: '◼ Analisis', roles: ['analista', 'admin'] },
        { to: 'ajustes', texto: '◼ Ajustes', roles: ['admin'] }
    ];

    return(
        <div className={styles.caja_navegacion}>
            <div className={styles.contenedor_links}>
                <h3>INTERFACE</h3>
                {rutas.map((link, index) => (
                    (link.roles.length === 0 || pe.rol.some(arrayRol => link.roles.includes(arrayRol))) && (
                    <Link key={index} to={link.to} className={activar(`/${link.to}`)}>
                        {link.texto}
                    </Link>
                    )
                ))}
            </div>
            <button className={styles.cerrar_sesion} onClick={()=>cerrarSesion()}>Cerrar Sesion</button>
        </div>
    )
}