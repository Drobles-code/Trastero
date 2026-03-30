import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const getContrastColor = (hexColor) => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminancia = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminancia > 0.5 ? '#000000' : '#ffffff';
};

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: ${props => props.bgColor};
  min-height: 80vh;
  transition: background-color 0.3s ease;
`;

const Title = styled.h1`
  color: ${props => getContrastColor(props.bgColor || '#ffffff')};
  font-size: 32px;
  margin-bottom: 30px;
  text-align: center;
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
`;

const SettingCard = styled.div`
  background: ${props => props.bgColor};
  padding: 25px;
  border-radius: 10px;
  border: 1px solid ${props => props.borderColor || '#333'};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
`;

const SettingTitle = styled.h2`
  color: ${props => getContrastColor(props.bgColor || '#ffffff')};
  font-size: 18px;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`;

const ColorOption = styled.button`
  width: 100%;
  padding: 15px;
  border: 3px solid ${props => props.selected ? '#fff' : '#333'};
  border-radius: 8px;
  background-color: ${props => props.color};
  cursor: pointer;
  transition: all 0.3s;
  position: relative;

  &:hover {
    border-color: #fff;
    transform: scale(1.05);
  }

  ${props => props.selected && `
    box-shadow: 0 0 20px ${props.color};
  `}
`;

const ColorLabel = styled.span`
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  display: block;
  margin-top: 5px;
`;

const ThemeOption = styled.button`
  width: 100%;
  padding: 15px;
  border: 2px solid ${props => props.selected ? '#fff' : '#444'};
  border-radius: 8px;
  background: ${props => props.background};
  color: ${props => props.color};
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
  margin-bottom: 10px;

  &:hover {
    border-color: #fff;
    transform: translateX(5px);
  }
`;

const PreviewBox = styled.div`
  background: ${props => props.bgColor};
  color: ${props => props.textColor};
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  margin-top: 15px;
  border: 1px solid ${props => props.borderColor};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
`;

const Button = styled.button`
  flex: 1;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  ${props => props.primary ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }
  ` : `
    background: #333;
    color: #fff;
    border: 2px solid #555;

    &:hover {
      background: #444;
      border-color: #777;
    }
  `}
`;

function Settings() {
  const navigate = useNavigate();
  const { theme, updateTheme, resetTheme } = useContext(ThemeContext);
  const [localTheme, setLocalTheme] = useState(theme);

  const themes = [
    {
      name: 'Dark (Default)',
      navbar: '#0d0d0d',
      background: '#000',
      text: '#fff',
      accent: '#667eea',
      modalBg: '#1a1a1a',
      cardTitle: '#1a1a2e',
    },
    {
      name: 'Dark Blue',
      navbar: '#0a1628',
      background: '#0f1419',
      text: '#e0e0e0',
      accent: '#00a8ff',
      modalBg: '#0f1419',
      cardTitle: '#0a1628',
    },
    {
      name: 'Dark Green',
      navbar: '#0d1b0f',
      background: '#000a02',
      text: '#ffffff',
      accent: '#00d084',
      modalBg: '#0d1b0f',
      cardTitle: '#0d1b0f',
    },
    {
      name: 'Dark Purple',
      navbar: '#1a0a2e',
      background: '#0f0015',
      text: '#f5f5f5',
      accent: '#c200ff',
      modalBg: '#1a0a2e',
      cardTitle: '#1a0a2e',
    },
    {
      name: 'Dark Red',
      navbar: '#1a0000',
      background: '#0a0000',
      text: '#ffffff',
      accent: '#ff4444',
      modalBg: '#1a0000',
      cardTitle: '#1a0000',
    },
    {
      name: 'Custom',
      navbar: localTheme.navbar,
      background: localTheme.background,
      text: localTheme.text,
      accent: localTheme.accent,
      modalBg: localTheme.modalBg,
      cardTitle: localTheme.cardTitle,
    },
  ];

  const handleThemeSelect = (selectedTheme) => {
    setLocalTheme(selectedTheme);
    updateTheme(selectedTheme);
  };

  const handleColorChange = (colorType, color) => {
    const newTheme = {
      ...localTheme,
      [colorType]: color
    };
    setLocalTheme(newTheme);
    updateTheme(newTheme);
  };

  const handleSave = () => {
    alert('✓ Tema guardado exitosamente!');
  };

  const handleResetTheme = () => {
    resetTheme();
    setLocalTheme({
      navbar: '#0d0d0d',
      background: '#000',
      text: '#fff',
      accent: '#667eea',
      modalBg: '#1a1a1a',
      cardTitle: '#1a1a2e',
    });
  };

  const colors = [
    { name: 'Negro', hex: '#000000' },
    { name: 'Gris Oscuro', hex: '#1a1a1a' },
    { name: 'Gris', hex: '#444444' },
    { name: 'Blanco', hex: '#ffffff' },
    { name: 'Azul', hex: '#00a8ff' },
    { name: 'Verde', hex: '#00d084' },
    { name: 'Púrpura', hex: '#c200ff' },
    { name: 'Rojo', hex: '#ff4444' },
    { name: 'Naranja', hex: '#ff8800' },
  ];

  return (
    <Container bgColor={localTheme.background}>
      <Title bgColor={localTheme.background}>⚙️ Configuración de Tema</Title>

      <SettingsGrid>
        {/* TEMAS PREDEFINIDOS */}
        <SettingCard bgColor={localTheme.modalBg} borderColor={localTheme.accent}>
          <SettingTitle bgColor={localTheme.modalBg}>Temas Predefinidos</SettingTitle>
          {themes.slice(0, 5).map((t, idx) => (
            <ThemeOption
              key={idx}
              background={t.navbar}
              color={t.text}
              selected={localTheme.navbar === t.navbar && localTheme.accent === t.accent}
              onClick={() => handleThemeSelect(t)}
            >
              {t.name}
            </ThemeOption>
          ))}
        </SettingCard>

        {/* COLOR DEL NAVBAR */}
        <SettingCard bgColor={localTheme.modalBg} borderColor={localTheme.accent}>
          <SettingTitle bgColor={localTheme.modalBg}>Color Barra Superior</SettingTitle>
          <ColorGrid>
            {colors.map((color) => (
              <ColorOption
                key={color.hex}
                color={color.hex}
                selected={localTheme.navbar === color.hex}
                onClick={() => handleColorChange('navbar', color.hex)}
              >
                <ColorLabel>{color.name}</ColorLabel>
              </ColorOption>
            ))}
          </ColorGrid>
        </SettingCard>

        {/* COLOR DEL FONDO */}
        <SettingCard bgColor={localTheme.modalBg} borderColor={localTheme.accent}>
          <SettingTitle bgColor={localTheme.modalBg}>Color Fondo Principal</SettingTitle>
          <ColorGrid>
            {colors.map((color) => (
              <ColorOption
                key={color.hex}
                color={color.hex}
                selected={localTheme.background === color.hex}
                onClick={() => handleColorChange('background', color.hex)}
              >
                <ColorLabel>{color.name}</ColorLabel>
              </ColorOption>
            ))}
          </ColorGrid>
        </SettingCard>

        {/* COLOR DE TEXTO */}
        <SettingCard bgColor={localTheme.modalBg} borderColor={localTheme.accent}>
          <SettingTitle bgColor={localTheme.modalBg}>Color Texto</SettingTitle>
          <ColorGrid>
            {colors.map((color) => (
              <ColorOption
                key={color.hex}
                color={color.hex}
                selected={localTheme.text === color.hex}
                onClick={() => handleColorChange('text', color.hex)}
              >
                <ColorLabel>{color.name}</ColorLabel>
              </ColorOption>
            ))}
          </ColorGrid>
        </SettingCard>

        {/* COLOR ACENTO */}
        <SettingCard bgColor={localTheme.modalBg} borderColor={localTheme.accent}>
          <SettingTitle bgColor={localTheme.modalBg}>Color Acentos y Botones</SettingTitle>
          <ColorGrid>
            {[
              { name: 'Púrpura', hex: '#667eea' },
              { name: 'Azul', hex: '#00a8ff' },
              { name: 'Verde', hex: '#00d084' },
              { name: 'Rojo', hex: '#ff4444' },
              { name: 'Naranja', hex: '#ff8800' },
              { name: 'Rosado', hex: '#ff6b9d' },
            ].map((color) => (
              <ColorOption
                key={color.hex}
                color={color.hex}
                selected={localTheme.accent === color.hex}
                onClick={() => handleColorChange('accent', color.hex)}
              >
                <ColorLabel>{color.name}</ColorLabel>
              </ColorOption>
            ))}
          </ColorGrid>
        </SettingCard>

        {/* COLOR FONDO MODAL */}
        <SettingCard bgColor={localTheme.modalBg} borderColor={localTheme.accent}>
          <SettingTitle bgColor={localTheme.modalBg}>Color Fondo Modal</SettingTitle>
          <ColorGrid>
            {[
              { name: 'Blanco', hex: '#ffffff' },
              { name: 'Gris Claro', hex: '#f5f5f5' },
              { name: 'Gris', hex: '#e8e8e8' },
              { name: 'Gris Oscuro', hex: '#1a1a1a' },
              { name: 'Negro', hex: '#0a0a0a' },
              { name: 'Azul Claro', hex: '#e3f2fd' },
            ].map((color) => (
              <ColorOption
                key={color.hex}
                color={color.hex}
                selected={localTheme.modalBg === color.hex}
                onClick={() => handleColorChange('modalBg', color.hex)}
              >
                <ColorLabel>{color.name}</ColorLabel>
              </ColorOption>
            ))}
          </ColorGrid>
        </SettingCard>

        {/* COLOR TÍTULO TARJETA */}
        <SettingCard bgColor={localTheme.modalBg} borderColor={localTheme.accent}>
          <SettingTitle bgColor={localTheme.modalBg}>Color Título de Tarjeta</SettingTitle>
          <ColorGrid>
            {[
              { name: 'Azul Noche', hex: '#1a1a2e' },
              { name: 'Azul Marino', hex: '#0a1628' },
              { name: 'Púrpura', hex: '#1a0a2e' },
              { name: 'Verde Oscuro', hex: '#0d1b0f' },
              { name: 'Rojo Oscuro', hex: '#1a0000' },
              { name: 'Marrón', hex: '#2a1a00' },
            ].map((color) => (
              <ColorOption
                key={color.hex}
                color={color.hex}
                selected={localTheme.cardTitle === color.hex}
                onClick={() => handleColorChange('cardTitle', color.hex)}
              >
                <ColorLabel>{color.name}</ColorLabel>
              </ColorOption>
            ))}
          </ColorGrid>
        </SettingCard>

        {/* VISTA PREVIA */}
        <SettingCard bgColor={localTheme.modalBg} borderColor={localTheme.accent}>
          <SettingTitle bgColor={localTheme.modalBg}>Vista Previa</SettingTitle>
          <PreviewBox
            bgColor={localTheme.navbar}
            textColor={localTheme.text}
            borderColor={localTheme.accent}
          >
            <strong>Barra de Navegación</strong>
          </PreviewBox>
          <PreviewBox
            bgColor={localTheme.background}
            textColor={localTheme.text}
            borderColor={localTheme.accent}
            style={{ marginTop: '10px' }}
          >
            Contenido Principal
          </PreviewBox>
          <PreviewBox
            bgColor={localTheme.cardTitle || '#1a1a2e'}
            textColor={localTheme.accent}
            borderColor={localTheme.accent}
            style={{ marginTop: '10px' }}
          >
            Título de Tarjeta
          </PreviewBox>
          <PreviewBox
            bgColor={localTheme.accent}
            textColor={'#fff'}
            borderColor={localTheme.accent}
            style={{ marginTop: '10px' }}
          >
            Botón Acento
          </PreviewBox>
        </SettingCard>
      </SettingsGrid>

      <ButtonGroup>
        <Button onClick={handleResetTheme}>Restaurar Predeterminados</Button>
        <Button primary onClick={handleSave}>Guardar Configuración</Button>
      </ButtonGroup>
    </Container>
  );
}

export default Settings;
