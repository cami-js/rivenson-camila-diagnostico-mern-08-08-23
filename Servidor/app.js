const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const conexion = require('./db/connection')

conexion()
const PORT = 4000
const app = express()

app.use(cors())
app.use(morgan('combined'))
app.use(express.json())
app.use(require('./src/routes/tareasRoutes'))
app.listen(PORT, () => 
    console.log(`listen on port ${PORT}`
))