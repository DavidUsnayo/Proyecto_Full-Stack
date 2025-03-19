import express from 'express'
import swaggerUi  from 'swagger-ui-express'
import YAML from 'yamljs'
import cors from 'cors'
//se necesita instalar swagger-parser

//RUTAS
import Notas from './Routes/Notas.js'
import Registro from './Routes/Auth.js'
import Info from './Routes/Info.js'
import Ajustes from './Routes/Ajustes.js'
import Analisis from './Routes/Analista.js'

const app = express()
app.use(express.json())
const PORT = 3000

//CORS para que cualquiera se pueda conectar
app.use(cors())

// Configuración de Swagger
const ruta = YAML.load('./src/Config/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(ruta));

app.use('/auth',Registro)
app.use('/notas',Notas)
app.use('/info', Info)
app.use('/ajustes',Ajustes)
app.use('/analisis', Analisis)


app.listen(PORT, ()=>console.log("Servidor Coriendo"))