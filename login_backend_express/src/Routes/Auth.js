import express from 'express'

import { registro } from '../Controllers/authController.js'
import { login } from '../Controllers/authController.js'

const router = express.Router(); // Crea un enrutador

router.post('/registro',registro)
router.post('/login',login);


export default router; // Exporta el enrutador