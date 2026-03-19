import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../context/ThemeContext';
import ContactContent from '../components/Content/ContactContent';

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: ${props => props.bgColor};
  min-height: 80vh;
`;

const FormBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const Description = styled.p`
  color: #666;
  text-align: center;
  margin-bottom: 40px;
  font-size: 16px;
  line-height: 1.6;
`;

function Contact() {
  const { theme } = useContext(ThemeContext);

  return (
    <Container bgColor={theme.background}>
      <FormBox>
        <Description>
          ¿Tienes alguna pregunta, sugerencia o problema? Nos encantaría escucharte.
          Completa el formulario a continuación y nos pondremos en contacto pronto.
        </Description>
        <ContactContent />
      </FormBox>
    </Container>
  );
}

export default Contact;
