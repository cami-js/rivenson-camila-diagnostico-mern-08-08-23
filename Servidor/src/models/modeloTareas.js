const {Schema,model} = require('mongoose')

const tareasSchema = new Schema({
    nombre: { 
        type: 'string',
        required: true
    },
    estado: {
        type: String,
        default: 'pendiente',
        required: true
    }
})

module.exports = model('tareas',tareasSchema)
