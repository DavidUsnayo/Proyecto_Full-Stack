import JWT from 'jsonwebtoken'

export const verificarToken = (req, res, next) => {
    const token = req.headers['authorization']; // Leer el token del header
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. No hay token' });
    }
    try {
        const decoded = JWT.verify(token.replace('Bearer ', ''), 'dav2000'); // Quita 'Bearer ' si está presente
        req.user = decoded; // Guardar info del usuario en req.user
        next(); // Pasar al siguiente middleware o ruta
    } catch (error) {
        return res.status(403).json({ error: 'Token no válido' });
    }
};


export const verificarRol = (roles) => (req, res, next) => {
    if (!req.user.rol.some(rol => roles.includes(rol))) {
        return res.status(403).json({ error: 'Acceso denegado, no tienes el ROL correcto' });
    }
    next();
};