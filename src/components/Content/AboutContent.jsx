import React, { useContext } from 'react';
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

const Title = styled.h2`
  text-align: center;
  color: ${props => getContrastColor(props.bgColor || '#ffffff')};
  margin-bottom: 20px;
  font-size: 24px;
`;

const SectionTitle = styled.h3`
  color: ${props => props.accentColor || '#667eea'};
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 10px;
  border-bottom: 2px solid ${props => props.accentColor || '#667eea'};
  padding-bottom: 8px;
`;

const Text = styled.p`
  color: ${props => getContrastColor(props.bgColor || '#ffffff')};
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 12px;
`;

const List = styled.ul`
  color: ${props => getContrastColor(props.bgColor || '#ffffff')};
  margin-left: 20px;
  font-size: 14px;
  line-height: 1.6;

  li {
    margin-bottom: 8px;
  }

  strong {
    color: ${props => props.accentColor || '#667eea'};
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 15px 0;
`;

const FeatureItem = styled.div`
  background: ${props => props.accentColor ? props.accentColor + '15' : 'rgba(102, 126, 234, 0.15)'};
  padding: 12px;
  border-radius: 6px;
  border-left: 3px solid ${props => props.accentColor || '#667eea'};

  p {
    color: ${props => getContrastColor(props.bgColor || '#ffffff')};
    font-size: 13px;
    margin: 0;
    line-height: 1.4;
  }

  @media (max-width: 600px) {
    grid-column: 1 / -1;
  }
`;

function AboutContent() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Title bgColor={theme.modalBg}>Acerca de Trastero</Title>

      <SectionTitle bgColor={theme.modalBg} accentColor={theme.accent}>
        ¿Qué es Trastero?
      </SectionTitle>
      <Text bgColor={theme.modalBg}>
        Trastero es una aplicación web moderna para organizar y gestionar tu inventario personal.
        Ideal para trastos, garajes, bodegas y más.
      </Text>

      <SectionTitle bgColor={theme.modalBg} accentColor={theme.accent}>
        Características
      </SectionTitle>
      <FeatureGrid>
        <FeatureItem bgColor={theme.modalBg} accentColor={theme.accent}>
          <p>📸 <strong>Galería de Imágenes</strong></p>
        </FeatureItem>
        <FeatureItem bgColor={theme.modalBg} accentColor={theme.accent}>
          <p>🔍 <strong>Búsqueda Avanzada</strong></p>
        </FeatureItem>
        <FeatureItem bgColor={theme.modalBg} accentColor={theme.accent}>
          <p>🏷️ <strong>Categorización</strong></p>
        </FeatureItem>
        <FeatureItem bgColor={theme.modalBg} accentColor={theme.accent}>
          <p>👤 <strong>Perfil de Usuario</strong></p>
        </FeatureItem>
      </FeatureGrid>

      <SectionTitle bgColor={theme.modalBg} accentColor={theme.accent}>
        Tecnología
      </SectionTitle>
      <List bgColor={theme.modalBg} accentColor={theme.accent}>
        <li><strong>React 18</strong> - Última generación</li>
        <li><strong>React Router v6</strong> - Enrutamiento moderno</li>
        <li><strong>Styled Components</strong> - Estilos dinámicos</li>
        <li><strong>Modern JavaScript</strong> - Código limpio</li>
      </List>

      <SectionTitle bgColor={theme.modalBg} accentColor={theme.accent}>
        Nuestra Misión
      </SectionTitle>
      <Text bgColor={theme.modalBg}>
        Simplificar la organización de tus posesiones permitiéndote enfocarte en lo que realmente importa.
      </Text>
    </>
  );
}

export default AboutContent;
