import React, { createContext, useState, useEffect } from 'react';
import { CATEGORIAS } from '../constants/categorias';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Fallback con los datos del archivo JS (mismo formato que la API)
const FALLBACK = CATEGORIAS.map((c, i) => ({
  id:     i + 1,
  nombre: c.label,
  subs:   c.subs.map((s, j) => ({ id: j + 1, nombre: s })),
}));

export const CategoriasContext = createContext(FALLBACK);

export function CategoriasProvider({ children }) {
  const [categorias, setCategorias] = useState(FALLBACK);

  useEffect(() => {
    fetch(`${API_URL}/api/categorias`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data && data.length > 0) setCategorias(data); })
      .catch(() => {}); // si falla, FALLBACK ya está en el estado
  }, []);

  return (
    <CategoriasContext.Provider value={categorias}>
      {children}
    </CategoriasContext.Provider>
  );
}
