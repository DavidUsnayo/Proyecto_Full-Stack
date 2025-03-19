import { db } from "../Config/conexion.js"

export const notas = (req,res)=>{   ///para mostrar  seria mejo rco el token |  esta en gemini
    const id = req.user.id
    db.query('SELECT * FROM notas WHERE id_usuario = ? ORDER BY fecha DESC ',[id], (err, result)=>{
        if(err){
            res.status(500).json({message:'error en la consulta'})
        }else{
            res.status(200).json(result)
        }
    })
}
//en swagger quitar el id_usuario y fecha solo tiene que haber TITULO
export const CrearNota = (req,res)=>{
    const { titulo} = req.body;
    const fecha = new Date()
    const fechaAjustado = new Date(fecha.getTime() - 4 * 60 * 60 * 1000); //fecha y hora ajustado a bolivia
    db.query('INSERT INTO notas(titulo,id_usuario,fecha) VALUES(?,?,?)',[titulo, req.user.id, fechaAjustado],(err,result)=>{
        if(err){
            res.status(500).json({message:'error en la consulta'})
        }else{
            res.status(200).json({message:'notas insertado Correctamente', id: result.insertId, fecha: fechaAjustado.getHours()})
        }
    })
}

export const EliminarNota = (req,res) => {
    const id_nota = req.params.id
    db.query('DELETE FROM notas WHERE id=?',[id_nota],(err,result)=>{
        if(err){
            res.status(500).json({message:'error en la consulta'})
        }else{
            res.status(200).json({message:`Nota con ID: ${id_nota} - Eliminado Correctamente`})
        }
    })
}