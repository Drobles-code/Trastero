import React, { useState, useEffect } from 'react';
import imagenjson from '../../inicial.json';
import '../Principal/Principal.css';
import Buscador from '../Buscador/Buscador';
import Cargaimg from '../Cargarimg/Cargaimg';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Principal() {
  const [allTasks, setAllTasks]       = useState([]);
  const [tasks, setTasks]             = useState([]);
  const [cargando, setCargando]       = useState(true);

  // Carga inicial desde API (o fallback a JSON si la API no responde)
  useEffect(() => {
    fetch(`${API_URL}/api/trasteros`)
      .then(res => {
        if (!res.ok) throw new Error('API no disponible');
        return res.json();
      })
      .then(data => {
        setAllTasks(data);
        setTasks(data);
      })
      .catch(() => {
        // Fallback: datos locales del JSON mientras no hay servidor
        setAllTasks(imagenjson);
        setTasks(imagenjson);
      })
      .finally(() => setCargando(false));
  }, []);

  // Filtrado local en tiempo real (onChange del buscador)
  const filtradoLocal = (termino) => {
    if (termino === '') {
      setTasks(allTasks);
    } else {
      setTasks(allTasks.filter(task =>
        task.Nombre.toLowerCase().includes(termino.toLowerCase())
      ));
    }
  };

  // Búsqueda en BD al pulsar Go
  const buscarEnBD = async (termino) => {
    if (termino === '') {
      setTasks(allTasks);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/trasteros?q=${encodeURIComponent(termino)}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setTasks(data);
    } catch {
      // Si la API falla, usa filtrado local
      filtradoLocal(termino);
    }
  };

  return (
    <div>
      <div className='head'>
        <Buscador filtradoLocal={filtradoLocal} buscarEnBD={buscarEnBD} />
      </div>
      <div className='body'>
        <div className='principal'>
          {cargando
            ? <p style={{ color: 'var(--text-color)', padding: '20px' }}>Cargando...</p>
            : tasks.map(task => <Cargaimg key={task.id || task.Nombre} task={task} />)
          }
        </div>
      </div>
    </div>
  );
}

export default Principal;
