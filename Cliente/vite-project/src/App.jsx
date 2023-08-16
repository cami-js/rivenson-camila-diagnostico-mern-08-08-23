import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [taskList, setTaskList] = useState([]);
  const [nombre, setNombre] = useState('');
  const [estado, setEstado] = useState('pendiente');


  const obtenerTareas = async () => {
    try {
      const response = await fetch('http://localhost:4000/ver');
      const data = await response.json();
      if (data.error) return;
      setTaskList(data);
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  };

  const agregarTarea = async (event) => {
    event.preventDefault();
    try {
      if (!nombre) return

      await fetch('http://localhost:4000/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          estado: estado
        }),
      });

      obtenerTareas();
      setEstado('pendiente')
      setNombre('');
    } catch (error) {
      console.error(error);
    }
  };
  

  const marcarComoCompletada = async (taskId, nuevoEstado) => {
    console.log(taskId);
    console.log(nuevoEstado)
    try {
  
      await fetch(`http://localhost:4000/actualizar/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estado: nuevoEstado,
        }),
      }).then((res) => {
        console.log(res)
        obtenerTareas();
      })
  console.log(nuevoEstado)
        
    } catch (error) {
      console.error(error);
    }
  };
  

  const eliminarTarea = async (taskId) => {
    try {
      await fetch(`http://localhost:4000/eliminar/${taskId}`, {
        method: 'DELETE',
      });
      obtenerTareas();
    } catch (error) {
      console.error(error);
    }
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };


  useEffect(() => {
    obtenerTareas();
  }, []);

  return (
    <div className='task-container'>
      <h1>Administrar tareas</h1>
      <div className='input-container'>
   
      <form onSubmit={agregarTarea}>
      <input
          type='text'
          value={nombre}
          name='titulo'
          onChange={handleNombreChange}
          placeholder='Nueva tarea...'
        />
        <button id='agregarTarea' type="submit">Agregar tarea</button>

      </form>

      </div>
      <h2>Tareas:</h2>
      <ul className='task-list'>
        {taskList.map((task) => (
          <li key={task._id}>
            <p>{task.nombre}</p>
            <p className={`${task.estado === 'pendiente' ? 'pendiente' :'completada' }`}>{task.estado}</p>
            <button id='cambiarEstado' onClick={() => marcarComoCompletada(task._id, task.estado === 'pendiente' ? 'completo' : 'pendiente')} >Cambiar estado</button>
            <button id='eliminar' onClick={() => eliminarTarea(task._id)}>Eliminar</button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
