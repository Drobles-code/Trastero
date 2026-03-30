import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: ${props => props.bgColor};
  border-radius: 10px;
  transition: background-color 0.3s ease;
`;

const FormBox = styled.div`
  background: var(--background-color);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  text-align: center;
  color: var(--text-color);
  margin-bottom: 30px;
  font-size: 28px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: var(--text-color);
  font-weight: 600;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  background-color: var(--background-color);
  color: var(--text-color);
  transition: all 0.3s;
  font-family: inherit;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    border-color: ${props => props.accentColor || '#667eea'};
    background-color: #fff;
    box-shadow: 0 0 0 3px ${props => props.accentColor ? props.accentColor + '20' : 'rgba(102, 126, 234, 0.1)'};
  }

  &:hover {
    border-color: ${props => props.accentColor || '#667eea'};
    background-color: #fff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background: ${props => props.accentColor || '#667eea'};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px ${props => props.accentColor ? props.accentColor + '40' : 'rgba(102, 126, 234, 0.4)'};
    opacity: 0.9;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

const LinkText = styled.p`
  text-align: center;
  margin-top: 20px;
  color: #666;
  font-size: 14px;

  a {
    color: ${props => props.accentColor || '#667eea'};
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s;

    &:hover {
      text-decoration: underline;
      opacity: 0.8;
    }
  }
`;

function SignIn({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Email o contraseña incorrectos');
        setLoading(false);
        return;
      }

      // Guardar token en localStorage
      localStorage.setItem('trastero_token', data.token);

      onLogin({
        id:     data.usuario.id,
        email:  data.usuario.email,
        name:   data.usuario.nombre,
        avatar: data.usuario.avatar_url,
      });

      navigate('/profile');
    } catch (err) {
      setError('No se pudo conectar al servidor. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container bgColor={theme.background}>
      <FormBox>
        <Title>Iniciar Sesión</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              accentColor={theme.accent}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              accentColor={theme.accent}
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" disabled={loading} accentColor={theme.accent}>
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </Button>
        </form>

        <LinkText accentColor={theme.accent}>
          ¿No tienes cuenta? <a href="/signup">Regístrate aquí</a>
        </LinkText>
      </FormBox>
    </Container>
  );
}

export default SignIn;
