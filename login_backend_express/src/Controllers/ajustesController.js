import { db } from "../Config/conexion.js"  //siempre debe de llevar  |  .js   |

export const ajustes = (req,res) => {
    db.query('SELECT * FROM ajustes',(err,result)=>{
        if(err){
            return res.status(500).json({message:'Error en SQL'})
        }
        res.json(result[0])
    })
}

export const updateBorde = (req,res) => {
    const {borde} = req.body
    db.query('UPDATE ajustes SET borde = ?',[borde],(err,result)=>{
        if(err){
            return res.status(500).json({message:'Error en SQL'})
        }
        res.status(200).json({message:'Borde Actualizado Correctamente'})
    })
}

export const updateZoom = (req, res) => {
    const { zoomCard } = req.body;

    if (zoomCard !== undefined) {   //de esta forma nos aseguramos que nos haya mandado el valor zoomCard
        db.query('UPDATE ajustes SET zoomCard = ?', [zoomCard], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error en SQL' });
            }
            res.status(200).json({ message: 'ZOOM CARD Actualizado Correctamente' });
        });
    } else {
        res.status(400).json({ message: 'El valor zoomCard es requerido' });
    }
}

export const updateColorText = (req,res) => {
    const {colorTexto} = req.body
    db.query('UPDATE ajustes SET colorTexto = ?',[colorTexto],(err,result)=>{
        if(err){
            return res.status(500).json({message:'Error en SQL'})
        }
        res.status(200).json({message:'Color Texto Actualizado Correctamente'})
    })
}


//ajustes:
//borde - zoomCard - colorTexto -  