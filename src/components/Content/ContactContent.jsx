import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';
import { getContrastColor } from '../../utils/colorUtils';

const Title = styled.h2`
  text-align: center;
  color: ${props => getContrastColor(props.bgColor || '#ffffff')};
  margin-bottom: 20px;
  font-size: 24px;
`;

const Description = styled.p`
  text-align: center;
  color: ${props => getContrastColor(props.bgColor || '#ffffff')};
  margin-bottom: 25px;
  font-size: 14px;
  line-height: 1.5;
  opacity: 0.9;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: ${props => getContrastColor(props.bgColor || '#ffffff')};
  font-weight: 600;
  font-size: 13px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid ${props => {
    const contrastColor = getContrastColor(props.bgColor || '#ffffff');
    return contrastColor === '#ffffff' ? '#444' : '#ddd';
  }};
  border-radius: 6px;
  font-size: 14px;
  background-color: ${props => {
    const contrastColor = getContrastColor(props.bgColor || '#ffffff');
    return contrastColor === '#ffffff' ? '#1a1a1a' : '#f8f9fa';
  }};
  color: ${props => getContrastColor(props.bgColor || '#ffffff') === '#ffffff' ? '#ffffff' : '#333'};
  transition: all 0.3s;
  font-family: inherit;

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

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid ${props => {
    const contrastColor = getContrastColor(props.bgColor || '#ffffff');
    return contrastColor === '#ffffff' ? '#444' : '#ddd';
  }};
  border-radius: 6px;
  font-size: 14px;
  background-color: ${props => {
    const contrastColor = getContrastColor(props.bgColor || '#ffffff');
    return contrastColor === '#ffffff' ? '#1a1a1a' : '#f8f9fa';
  }};
  color: ${props => getContrastColor(props.bgColor || '#ffffff') === '#ffffff' ? '#ffffff' : '#333'};
  transition: all 0.3s;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;

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
  padding: 12px;
  background: ${props => props.accentColor || '#667eea'};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px ${props => props.accentColor ? props.accentColor + '40' : 'rgba(102, 126, 234, 0.4)'};
  }

  &:disabled {
    opacity: 0.6;
  }
`;

const SuccessMessage = styled.div`
  background: #d4edda;
  color: #155724;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
  border: 1px solid #c3e6cb;
  text-align: center;
  font-size: 14px;
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
  border: 1px solid #f5c6cb;
  text-align: center;
  font-size: 14px;
`;

function ContactContent({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }

    try {
      // Simulación de envío - reemplaza con tu API real
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });

        // Cerrar modal o limpiar después de 3 segundos
        setTimeout(() => {
          setSubmitted(false);
          if (onClose) onClose();
        }, 3000);
      }, 1000);
    } catch (err) {
      setError('Error al enviar el mensaje. Intenta de nuevo.');
      setLoading(false);
    }
  };

  return (
    <>
      <Title bgColor={theme.modalBg}>Contáctanos</Title>
      <Description bgColor={theme.modalBg}>
        ¿Tienes alguna pregunta? Nos encantaría escucharte.
      </Description>

      {submitted && (
        <SuccessMessage>
          ✓ ¡Gracias por tu mensaje! Nos pondremos en contacto pronto.
        </SuccessMessage>
      )}
      {error && <ErrorMessage>⚠ {error}</ErrorMessage>}

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label bgColor={theme.modalBg} htmlFor="name">Nombre Completo</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            accentColor={theme.accent}
            bgColor={theme.modalBg}
          />
        </FormGroup>

        <FormGroup>
          <Label bgColor={theme.modalBg} htmlFor="email">Correo Electrónico</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            accentColor={theme.accent}
            bgColor={theme.modalBg}
          />
        </FormGroup>

        <FormGroup>
          <Label bgColor={theme.modalBg} htmlFor="subject">Asunto</Label>
          <Input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Asunto"
            accentColor={theme.accent}
            bgColor={theme.modalBg}
          />
        </FormGroup>

        <FormGroup>
          <Label bgColor={theme.modalBg} htmlFor="message">Mensaje</Label>
          <TextArea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Cuéntanos tu pregunta..."
            accentColor={theme.accent}
            bgColor={theme.modalBg}
          />
        </FormGroup>

        <Button type="submit" disabled={loading} accentColor={theme.accent}>
          {loading ? 'Enviando...' : 'Enviar Mensaje'}
        </Button>
      </form>
    </>
  );
}

export default ContactContent;
