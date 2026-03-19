import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../context/ThemeContext';
import AboutContent from '../components/Content/AboutContent';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: ${props => props.bgColor};
  min-height: 80vh;
`;

const Section = styled.section`
  margin-bottom: 40px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: #667eea;
  font-size: 24px;
  margin-bottom: 15px;
  border-bottom: 3px solid #667eea;
  padding-bottom: 10px;
`;

const Text = styled.p`
  color: #666;
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 15px;
`;

const List = styled.ul`
  color: #666;
  margin-left: 20px;
  font-size: 16px;
  line-height: 1.8;

  li {
    margin-bottom: 10px;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const FeatureCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;

  h3 {
    margin-bottom: 10px;
  }

  p {
    color: rgba(255, 255, 255, 0.9);
  }
`;

function About() {
  const { theme } = useContext(ThemeContext);

  return (
    <Container bgColor={theme.background}>
      <Section>
        <SectionTitle>¿Qué es Trastero?</SectionTitle>
        <Text>
          Trastero es una aplicación web moderna diseñada para ayudarte a organizar y gestionar
          tu inventario personal. Ya sea que tengas un trastero, garaje, bodega o simplemente
          quieras mantener un registro de tus pertenencias, Trastero te proporciona todas las
          herramientas que necesitas.
        </Text>
        <Text>
          Con una interfaz intuitiva y funcionalidades potentes, puedes cargar imágenes,
          crear categorías, buscar artículos rápidamente y mantener un control total de
          tus posesiones.
        </Text>
      </Section>

      <Section>
        <SectionTitle>Características Principales</SectionTitle>
        <FeatureGrid>
          <FeatureCard>
            <h3>📸 Galería de Imágenes</h3>
            <p>Sube y organiza imágenes de tus artículos con facilidad</p>
          </FeatureCard>
          <FeatureCard>
            <h3>🔍 Búsqueda Avanzada</h3>
            <p>Encuentra rápidamente lo que necesitas con nuestro buscador</p>
          </FeatureCard>
          <FeatureCard>
            <h3>🏷️ Categorización</h3>
            <p>Organiza tus artículos por categorías personalizadas</p>
          </FeatureCard>
          <FeatureCard>
            <h3>👤 Perfil de Usuario</h3>
            <p>Gestiona tu información personal y preferencias</p>
          </FeatureCard>
          <FeatureCard>
            <h3>📱 Responsive Design</h3>
            <p>Accede desde cualquier dispositivo, en cualquier momento</p>
          </FeatureCard>
          <FeatureCard>
            <h3>⚡ Rendimiento</h3>
            <p>Aplicación rápida y optimizada para la mejor experiencia</p>
          </FeatureCard>
        </FeatureGrid>
      </Section>

      <Section>
        <SectionTitle>Tecnología</SectionTitle>
        <Text>
          Trastero está construido con las últimas tecnologías web modernas:
        </Text>
        <List>
          <li><strong>React 18</strong> - Biblioteca UI de última generación</li>
          <li><strong>React Router v6</strong> - Enrutamiento moderno y eficiente</li>
          <li><strong>Styled Components</strong> - Estilos dinámicos y reutilizables</li>
          <li><strong>Hooks</strong> - Componentes funcionales con estado</li>
          <li><strong>Modern JavaScript (ES6+)</strong> - Código limpio y mantenible</li>
        </List>
      </Section>

      <Section>
        <SectionTitle>Nuestra Misión</SectionTitle>
        <Text>
          Creemos que mantener organizadas nuestras posesiones es importante. Trastero nace
          con la misión de simplificar este proceso, permitiéndote enfocarte en lo que realmente
          importa mientras nosotros cuidamos del registro y la organización de tus artículos.
        </Text>
      </Section>

      <Section>
        <SectionTitle>Resumen Rápido</SectionTitle>
        <AboutContent />
      </Section>
    </Container>
  );
}

export default About;
