import JWT from 'jsonwebtoken' 
import { db } from '../Config/conexion.js'
import bcrypt from 'bcrypt'  //bcryot para hashear contraseñas

export const registro = async(req,res)=>{
    const {usuario, contrasena, rol} = req.body
    try{
        // Hashea la contraseña
        const hashed = await bcrypt.hash(contrasena, 10); // 10 es el número de rondas de sal
        db.query('INSERT INTO usuarios(usuario,contrasena,rol) VALUES (?,?,?)',[usuario,hashed,JSON.stringify(rol)], (err,result) => {
            if(err){
                res.status(500).json({error:'Error en la consulta'})
            }else{
                const token = JWT.sign(
                    { id: result.insertId, usuario:usuario, rol:rol },
                    'dav2000',
                    { expiresIn: '1d' }
                );
                res.status(201).json({
                    message: 'Usuario registrado con éxito', 
                    id: result.insertId,
                    person :{ id: result.insertId, usuario: usuario, rol: rol },
                    token:token
                });
            }
        })
    }
    catch{
        res.status(500).json({ error: 'Error al hashear la contraseña' });
    }
}


export const login = (req, res) => {
    const { usuario, contrasena } = req.body;

    db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario], async (err, result) => {
        if (err) {
            console.error('Error en la consulta SQL:', err);
            return res.status(500).json({ error: 'Error al ejecutar SQL' });
        }

        if (result.length === 0) {
            console.log('NO existe el usuario');
            return res.status(404).json({ message: 'El usuario no existe' });
        }

        const us = result[0];
        const objetoPerson = { 
            id: us.id, 
            usuario: us.usuario, 
            rol: JSON.parse(us.rol)
        };

        try {
            // Comparar contraseña con hash almacenado en la base de datos
            const match = await bcrypt.compare(contrasena, us.contrasena);

            if (match) {
                const token = JWT.sign(objetoPerson, 'dav2000', { expiresIn: '1d' }); //TOKEN generado
                return res.json({ token: token, person: objetoPerson });
            } else {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }
        } catch (error) {
            console.error('Error al comparar contraseñas:', error);
            return res.status(500).json({ error: 'Error al verificar contraseña' });
        }
    });
}