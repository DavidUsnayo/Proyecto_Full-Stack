import { useState, createContext, useEffect } from "react";

export const Contexto = createContext();

export function VaribalesContexto({ children }) {

    const [token, setToken] = useState(null);
    const [person, setPerson] = useState(null);
    const [cargando, setCargando] = useState(true);

    //logica para ver si hay datos en el locaStorage y si tienen la estructura correcta
    function almacenarInfoEnContexto() {
        const clave = localStorage.getItem("token");
        const usuarioString = localStorage.getItem("person");

        try{  //que es try | es, esto funciona? sino ejecutamos catch
            const usuario = JSON.parse(usuarioString)
            if(clave && (typeof(usuario) == 'object') && (Array.isArray(usuario.rol))){
                setToken(clave);
                setPerson(usuario);
            }else{
                setToken(null);
                setPerson(null);
            }
        }catch(err){
            console.log('%c person | NO es un OBJETO correcto en localStorage', 'background-color: gold; padding:5px')
        }
        setCargando(false);
    }

    useEffect(() => {
        almacenarInfoEnContexto();
        console.log("Cargando datos del localStorage en el CONTEXTO ...");
    }, [window.location.pathname]); // Alternativa a useLocation()

    //si el contexto envualve todo el app | entonces es el primer archivo que se ejecutar | contexto.jsx
    return (
        <Contexto.Provider value={{ person, setPerson, token, setToken, almacenarInfoEnContexto }}>
            {cargando == true ? null : children}
        </Contexto.Provider>
    );
}


