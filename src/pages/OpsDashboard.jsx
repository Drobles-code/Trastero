import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function OpsDashboard() {
  const [stats, setStats]         = useState(null);
  const [usuarios, setUsuarios]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const navigate = useNavigate();

  const token    = localStorage.getItem('ops_token');
  const operator = JSON.parse(localStorage.getItem('ops_operator') || '{}');

  useEffect(() => {
    if (!token) { navigate('/ops/login'); return; }

    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch(`${API_URL}/api/ops/stats`,    { headers }).then(r => r.json()),
      fetch(`${API_URL}/api/ops/usuarios`, { headers }).then(r => r.json()),
    ])
      .then(([s, u]) => { setStats(s); setUsuarios(u); })
      .catch(() => navigate('/ops/login'))
      .finally(() => setLoading(false));
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('ops_token');
    localStorage.removeItem('ops_operator');
    navigate('/ops/login');
  };

  if (loading) return <div style={styles.loading}>Cargando...</div>;

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <span style={styles.title}>Panel de sistema</span>
        <div style={styles.headerRight}>
          <span style={styles.opName}>{operator.nombre}</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>Salir</button>
        </div>
      </div>

      <div style={styles.body}>
        {/* Stats */}
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <div style={styles.statNum}>{stats?.usuarios ?? '-'}</div>
            <div style={styles.statLabel}>Usuarios</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNum}>{stats?.trasteros ?? '-'}</div>
            <div style={styles.statLabel}>Trasteros</div>
          </div>
        </div>

        {/* Tabla usuarios */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Usuarios registrados</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Nombre</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Registro</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(u => (
                <tr key={u.id}>
                  <td style={styles.td}>{u.id}</td>
                  <td style={styles.td}>{u.nombre}</td>
                  <td style={styles.td}>{u.email}</td>
                  <td style={styles.td}>{new Date(u.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper:     { minHeight: '100vh', background: '#0a0a0a', color: '#ccc' },
  loading:     { minHeight: '100vh', background: '#0a0a0a', color: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  header:      { background: '#111', borderBottom: '1px solid #222', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  title:       { color: '#555', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase' },
  headerRight: { display: 'flex', alignItems: 'center', gap: '16px' },
  opName:      { color: '#666', fontSize: '13px' },
  logoutBtn:   { background: 'transparent', border: '1px solid #333', borderRadius: '4px', color: '#666', padding: '4px 12px', cursor: 'pointer', fontSize: '12px' },
  body:        { padding: '24px' },
  statsRow:    { display: 'flex', gap: '16px', marginBottom: '32px' },
  statCard:    { background: '#141414', border: '1px solid #222', borderRadius: '6px', padding: '20px 32px', textAlign: 'center' },
  statNum:     { fontSize: '32px', color: '#888', fontWeight: 'bold' },
  statLabel:   { fontSize: '12px', color: '#444', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' },
  section:     { background: '#111', border: '1px solid #1e1e1e', borderRadius: '6px', padding: '20px' },
  sectionTitle:{ color: '#555', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' },
  table:       { width: '100%', borderCollapse: 'collapse' },
  th:          { color: '#444', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #1e1e1e' },
  td:          { color: '#666', fontSize: '13px', padding: '10px 12px', borderBottom: '1px solid #161616' },
};
