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

const getContrastColor = (hexColor) => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminancia = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminancia > 0.5 ? '#000000' : '#ffffff';
};

const FormBox = styled.div`
  background: ${props => props.bgColor};
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 450px;
  transition: background-color 0.3s ease;
`;

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
  padding: 12px;
  border: 2px solid ${props => {
    const contrastColor = getContrastColor(props.bgColor || '#ffffff');
    return contrastColor === '#ffffff' ? '#444' : '#ddd';
  }};
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.3s;
  font-family: inherit;
  background-color: ${props => {
    const contrastColor = getContrastColor(props.bgColor || '#ffffff');
    return contrastColor === '#ffffff' ? '#1a1a1a' : '#f8f9fa';
  }};
  color: ${props => getContrastColor(props.bgColor || '#ffffff') === '#ffffff' ? '#ffffff' : '#333'};

  &::placeholder {
    color: ${props => getContrastColor(props.bgColor || '#ffffff') === '#ffffff' ? '#999' : '#999'};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.accentColor || '#667eea'};
    box-shadow: 0 0 0 3px ${props => props.accentColor ? props.accentColor + '20' : 'rgba(102, 126, 234, 0.1)'};
  }

  &:hover {
    border-color: ${props => props.accentColor || '#667eea'};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: var(--accent-color, #667eea);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px var(--accent-color, rgba(102, 126, 234, 0.4));
  }

  &:active {
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
  color: ${props => getContrastColor(props.bgColor || '#ffffff')};

  a {
    color: var(--accent-color, #667eea);
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      text-decoration: underline;
      opacity: 0.8;
    }
  }
`;

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validación
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      // Simulación de registro - reemplaza con tu API real
      setTimeout(() => {
        setLoading(false);
        navigate('/signin');
      }, 1000);
    } catch (err) {
      setError('Error en el registro. Intenta de nuevo.');
      setLoading(false);
    }
  };

  return (
    <Container bgColor={theme.background}>
      <FormBox bgColor={theme.modalBg || theme.background}>
        <Title bgColor={theme.modalBg || theme.background}>Crear Cuenta</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name" bgColor={theme.modalBg || theme.background}>Nombre Completo</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              accentColor={theme.accent}
              bgColor={theme.modalBg || theme.background}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email" bgColor={theme.modalBg || theme.background}>Correo Electrónico</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              accentColor={theme.accent}
              bgColor={theme.modalBg || theme.background}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password" bgColor={theme.modalBg || theme.background}>Contraseña</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              accentColor={theme.accent}
              bgColor={theme.modalBg || theme.background}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword" bgColor={theme.modalBg || theme.background}>Confirmar Contraseña</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              accentColor={theme.accent}
              bgColor={theme.modalBg || theme.background}
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" disabled={loading} accentColor={theme.accent}>
            {loading ? 'Creando cuenta...' : 'Registrarse'}
          </Button>
        </form>

        <LinkText accentColor={theme.accent} bgColor={theme.modalBg || theme.background}>
          ¿Ya tienes cuenta? <a href="/signin">Inicia sesión aquí</a>
        </LinkText>
      </FormBox>
    </Container>
  );
}

export default SignUp;
