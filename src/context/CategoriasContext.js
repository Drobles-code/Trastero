import React, { createContext, useState, useEffect } from 'react';
import { CATEGORIAS } from '../constants/categorias';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Fallback con los datos del archivo JS mientras carga la API
// Formato: { id, nombre, subs: [{ id, nombre }] }
const FALLBACK = CATEGORIAS.map((c, i) => ({
  id:     i + 1,
  nombre: c.label,
  subs:   c.subs.map((s, j) => ({ id: j + 1, nombre: s })),
}));

export const CategoriasContext = createContext(FALLBACK);

// Normaliza la respuesta de la API (usa 'label') al formato interno (usa 'nombre')
function normalizar(data) {
  return data.map(c => ({
    id:     c.id,
    nombre: c.label,
    orden:  c.orden,
    subs:   (c.subs || []).map(s => ({ id: s.id, nombre: s.label, orden: s.orden })),
  }));
}

export function CategoriasProvider({ children }) {
  const [categorias, setCategorias] = useState(FALLBACK);

  useEffect(() => {
    fetch(`${API_URL}/api/categorias`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data && data.length > 0) setCategorias(normalizar(data)); })
      .catch(() => {}); // si falla, el FALLBACK ya está en el estado
  }, []);

  return (
    <CategoriasContext.Provider value={categorias}>
      {children}
    </CategoriasContext.Provider>
  );
}
