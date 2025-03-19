import express from 'express'
import { verificarToken, verificarRol } from '../Midlewares/authMiddleware.js'
import { ajustes, updateBorde, updateZoom, updateColorText } from '../Controllers/ajustesController.js'

const router = express.Router()

router.get('/', verificarToken, ajustes)
router.put('/updateBorde', verificarToken, verificarRol(['admin',]), updateBorde)
router.put('/updateZoom', verificarToken, verificarRol(['admin',]), updateZoom)
router.put('/updateColorTexto', verificarToken, verificarRol(['admin',]), updateColorText)

export default router