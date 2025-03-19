import {Router} from 'express'
import { verificarToken } from '../Midlewares/authMiddleware.js'
import { notas } from '../Controllers/notasController.js'
import { CrearNota } from '../Controllers/notasController.js'
import { EliminarNota } from '../Controllers/notasController.js'

//aqui ya no se usa  |  express() sino express.Router()
//tambien se puede exportar la propiedad {Router}
//al importar un componente siempre se debe terminar con  | .js  |
const router = Router()   

router.get('/',verificarToken, notas)
router.post('/crearNota',verificarToken, CrearNota)
router.delete('/:id',verificarToken, EliminarNota)

export default router