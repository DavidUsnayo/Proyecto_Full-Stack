import express from 'express'
import { verificarToken} from '../Midlewares/authMiddleware.js'
import { info } from '../Controllers/infoController.js'

const router = express.Router()

router.get('/', verificarToken, info)

export default router;