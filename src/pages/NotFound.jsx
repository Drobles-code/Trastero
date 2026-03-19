import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  background-color: ${props => props.bgColor};
  transition: background-color 0.3s ease;
`;

const Content = styled.div`
  text-align: center;
  background: white;
  padding: 60px 40px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  max-width: 500px;
`;

const Code = styled.h1`
  font-size: 72px;
  color: ${props => props.accentColor};
  margin: 0;
  font-weight: 700;
`;

const Message = styled.p`
  color: #333;
  font-size: 24px;
  margin: 20px 0;
`;

const Description = styled.p`
  color: #666;
  font-size: 16px;
  margin: 20px 0 30px;
`;

const Button = styled.button`
  padding: 12px 30px;
  background: ${props => props.accentColor};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px ${props => props.accentColor}66;
  }
`;

function NotFound() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  return (
    <Container bgColor={theme.background}>
      <Content>
        <Code accentColor={theme.accent}>404</Code>
        <Message>Página No Encontrada</Message>
        <Description>
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </Description>
        <Button accentColor={theme.accent} onClick={() => navigate('/')}>
          Volver al Inicio
        </Button>
      </Content>
    </Container>
  );
}

export default NotFound;
