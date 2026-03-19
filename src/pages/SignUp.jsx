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
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 450px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 600;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.3s;
  font-family: inherit;

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
  background: ${props => props.accentColor || '#667eea'};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px ${props => props.accentColor ? props.accentColor + '66' : 'rgba(102, 126, 234, 0.4)'};
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
  color: #666;

  a {
    color: ${props => props.accentColor || '#667eea'};
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
      <FormBox>
        <Title>Crear Cuenta</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Nombre Completo</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              accentColor={theme.accent}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              accentColor={theme.accent}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              accentColor={theme.accent}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              accentColor={theme.accent}
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" disabled={loading} accentColor={theme.accent}>
            {loading ? 'Creando cuenta...' : 'Registrarse'}
          </Button>
        </form>

        <LinkText accentColor={theme.accent}>
          ¿Ya tienes cuenta? <a href="/signin">Inicia sesión aquí</a>
        </LinkText>
      </FormBox>
    </Container>
  );
}

export default SignUp;
