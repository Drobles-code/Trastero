import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';

// Función para determinar si un color es claro u oscuro
const getContrastColor = (hexColor) => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminancia = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminancia > 0.5 ? '#000000' : '#ffffff';
};

const Title = styled.h1`
  text-align: center;
  color: ${props => getContrastColor(props.bgColor || '#ffffff')};
  margin-bottom: 30px;
  font-size: 28px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: ${props => getContrastColor(props.bgColor || '#ffffff')};
  font-weight: 600;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  border: 2px solid ${props => {
    const contrastColor = getContrastColor(props.bgColor || '#ffffff');
    return contrastColor === '#ffffff' ? '#444' : '#ddd';
  }};
  border-radius: 8px;
  font-size: 15px;
  background-color: ${props => {
    const contrastColor = getContrastColor(props.bgColor || '#ffffff');
    return contrastColor === '#ffffff' ? '#1a1a1a' : '#f8f9fa';
  }};
  color: ${props => getContrastColor(props.bgColor || '#ffffff') === '#ffffff' ? '#ffffff' : '#333'};
  transition: all 0.3s;

  &::placeholder {
    color: ${props => getContrastColor(props.bgColor || '#ffffff') === '#ffffff' ? '#999' : '#999'};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.accentColor || '#667eea'};
    background-color: ${props => {
      const contrastColor = getContrastColor(props.bgColor || '#ffffff');
      return contrastColor === '#ffffff' ? '#2a2a2a' : '#fff';
    }};
    box-shadow: 0 0 0 3px ${props => props.accentColor ? props.accentColor + '20' : 'rgba(102, 126, 234, 0.1)'};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background: var(--accent-color, #667eea);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px var(--accent-color, rgba(102, 126, 234, 0.4));
  }

  &:disabled {
    opacity: 0.6;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 10px;
`;

const LinkText = styled.p`
  text-align: center;
  margin-top: 20px;
  color: ${props => getContrastColor(props.bgColor || '#ffffff')};
  font-size: 14px;

  a {
    color: var(--accent-color, #667eea);
    font-weight: 600;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function SignUpContent({ onSignUp, onSwitchToSignIn }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validación
    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/auth/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error en el registro');
        return;
      }

      localStorage.setItem('trastero_token', data.token);
      onSignUp({
        id:     data.usuario.id,
        name:   data.usuario.nombre,
        email:  data.usuario.email,
        avatar: data.usuario.avatar_url,
      });
    } catch (err) {
      setError('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title bgColor={theme.modalBg}>Registrarse</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label bgColor={theme.modalBg}>Nombre Completo</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            accentColor={theme.accent}
            bgColor={theme.modalBg}
          />
        </FormGroup>

        <FormGroup>
          <Label bgColor={theme.modalBg}>Correo Electrónico</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            accentColor={theme.accent}
            bgColor={theme.modalBg}
          />
        </FormGroup>

        <FormGroup>
          <Label bgColor={theme.modalBg}>Contraseña</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            accentColor={theme.accent}
            bgColor={theme.modalBg}
          />
        </FormGroup>

        <FormGroup>
          <Label bgColor={theme.modalBg}>Confirmar Contraseña</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            accentColor={theme.accent}
            bgColor={theme.modalBg}
          />
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button type="submit" disabled={loading} accentColor={theme.accent}>
          {loading ? 'Cargando...' : 'Registrarse'}
        </Button>
      </form>

      <LinkText accentColor={theme.accent} bgColor={theme.modalBg}>
        ¿Ya tienes cuenta? <a onClick={onSwitchToSignIn}>Inicia sesión aquí</a>
      </LinkText>
    </>
  );
}

export default SignUpContent;
