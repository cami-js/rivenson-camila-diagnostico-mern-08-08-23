const Tareas = require('../models/modeloTareas')

const ctrlTareas = []


ctrlTareas.verTareas = async (req, res)=>{
    try {
        const task = await Tareas.find();
        res.status(200).json(task);

    } catch(error){
        res.status(500).json({error: error.message});
    }
}

ctrlTareas.crearTareas = async (req, res) => {
    try {
      const { nombre, estado } = req.body;
  
      console.log('Nombre:', nombre);
      console.log('Estado:', estado);
      
      if (!nombre || !estado) {
        return res.json({
          msg: "Falta información requerida",
        });
      }
  
      console.log('Antes de crear la tarea');
      
      const nuevaTarea = new Tareas({ nombre, estado });
      const tareasNuevas = await nuevaTarea.save();
      
      console.log('Después de crear la tarea');
      
      return res.json({
        msg: "Tarea creada con éxito",
        tareasNuevas,
      });
    } catch (error) {
      console.error(error);
      return res.json({
        error: error.message,
      });
    }
  };
  

ctrlTareas.eliminarTareas = async (req, res) => {
    const id = req.params.id;

    try {
        await Tareas.findByIdAndDelete(id)
        return res.json('Tarea eliminada correctamente');
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            msg: 'Error al eliminar la tarea'
        });
    }
};

ctrlTareas.actualizarTarea = async (req, res) => {
    const id = req.params.id
    const { estado } = req.body

    if(!id || !estado) {
        return res.status(400).json({
            msg: 'Proporcione datos para actualizar la tarea'
        })
    }

    try {
        const tareaActualizada = await Tareas.findByIdAndUpdate(id, {estado})

        if (!tareaActualizada) {
            return res.status(404).json({
                msg: 'Tarea no encontrada'
            })
        }

        return res.json({
            msg: 'Tarea actualizada correctamente',
            tarea: tareaActualizada
        })
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            msg: 'Error al actualizar la tarea'
        })
    }
}


module.exports = ctrlTareas