import React, { useState } from 'react';
import imagenjson from '../../inicial.json';
import '../Principal/Principal.css';
import Buscador from '../Buscador/Buscador';
import Cargaimg from '../Cargarimg/Cargaimg';

function Principal() {
  const [tasks, setTasks] = useState(imagenjson);

  const filtradoLocal = (termino) => {
    if (termino === '') {
      setTasks(imagenjson);
    } else {
      setTasks(imagenjson.filter(task =>
        task.Nombre.toLowerCase().includes(termino.toLowerCase())
      ));
    }
  };

  const buscarEnBD = (termino) => {
    // Cuando la API esté activa:
    // const res = await axios.get(`/api/trasteros?q=${termino}`);
    // setTasks(res.data);
    filtradoLocal(termino); // fallback: usa filtrado local por ahora
  };

  return (
    <div>
      <div className='head'>
        <Buscador filtradoLocal={filtradoLocal} buscarEnBD={buscarEnBD} />
      </div>
      <div className='body'>
        <div className='principal'>
          {tasks.map(task => <Cargaimg task={task} />)}
        </div>
      </div>
    </div>
  );
}

export default Principal;

