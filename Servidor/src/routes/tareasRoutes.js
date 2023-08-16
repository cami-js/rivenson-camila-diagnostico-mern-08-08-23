const router = require('express').Router()
const {verTareas, crearTareas, eliminarTareas, actualizarTarea} = require('../controllers/tareasController')

//Lo que está entre comillas es el nombre de la ruta y el parámetro que recibe, y después de la coma va el controlador que le corresponde
router.get('/ver',verTareas)
router.post('/crear',crearTareas)
router.delete('/eliminar/:id',eliminarTareas)
router.put('/actualizar/:id', actualizarTarea)



module.exports = router