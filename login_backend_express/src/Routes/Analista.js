import express from 'express'
import { verificarToken, verificarRol } from '../Midlewares/authMiddleware.js'
import { analista } from '../Controllers/analistaController.js'

const router = express.Router()

router.get('/', verificarToken, verificarRol(['analista','admin']),analista)

export default router