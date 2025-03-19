import mysql from 'mysql2'

// Configura la conexión a la base de datos MySQL
// process.env.variable  | se usa par modificar las variables de entorno desde railway o otra app
export const db = mysql.createPool({
    host: process.env.MYSQLHOST || 'localhost',
    user: process.env.MYSQLUSER || 'root', 
    password: process.env.MYSQLPASSWORD || '',  
    database: process.env.MYSQLDATABASE || 'mydb',
    port: process.env.MYSQLPORT || 3308,
});

db.getConnection((err) => {
    if(err){
        console.log('No se pudo Conectar',err)
    }else{
        console.log('Conectado Correctamente')
    }
})

/*
{
    "usuario":"ADMIN",
    "contrasena":"admin",
}
*/