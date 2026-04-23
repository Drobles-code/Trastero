import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utils/api';

export default function OpsLogin() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/ops/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Credenciales incorrectas');
        return;
      }

      localStorage.setItem('ops_token',    data.token);
      localStorage.setItem('ops_operator', JSON.stringify(data.operator));
      navigate('/ops/dashboard');
    } catch {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Acceso al sistema</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <p style={styles.error}>{error}</p>}
          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Verificando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: '#0a0a0a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    background: '#141414',
    border: '1px solid #2a2a2a',
    borderRadius: '8px',
    padding: '40px',
    width: '320px',
  },
  title: {
    color: '#888',
    fontSize: '14px',
    textAlign: 'center',
    marginBottom: '24px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  input: {
    background: '#1e1e1e',
    border: '1px solid #333',
    borderRadius: '4px',
    padding: '10px 12px',
    color: '#ccc',
    fontSize: '14px',
    outline: 'none',
  },
  btn: {
    background: '#222',
    border: '1px solid #444',
    borderRadius: '4px',
    color: '#aaa',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: '8px',
  },
  error: {
    color: '#e74c3c',
    fontSize: '13px',
    margin: 0,
  },
};
