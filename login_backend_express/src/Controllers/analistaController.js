import { db } from "../Config/conexion.js"

export const analista = (req, res) => {
    db.query('SELECT (SELECT COUNT(*) FROM usuarios) AS total_usuarios, (SELECT COUNT(*) FROM notas) AS total_notas', (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Fallo en SQL' });
        }
        db.query(`SELECT COUNT(*) AS total_admins FROM usuarios WHERE JSON_CONTAINS(rol, '["admin"]')`, (err, resultAdmins) => {

            if (err) {
                return res.status(500).json({ message: 'Falla en SQL' });
            }
            res.status(200).json({
                total_clientes: result[0].total_usuarios,
                total_notas: result[0].total_notas,
                total_admins: resultAdmins[0].total_admins
            });
        });
    });
};