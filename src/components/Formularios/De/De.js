import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { ThemeContext } from '../../../context/ThemeContext';
import Buscador from '../Buscador/Buscador';
import CargaImgUser from '../CargaImgUser/CargaImgUser';
import useFetch from '../useFetch/useFetch';
import '../De/De.css';

const Container = styled.div`
  background-color: ${props => props.bgColor};
  min-height: calc(100vh - 70px);
  transition: background-color 0.3s ease;
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const HeadUser = styled.div`
  background-color: ${props => props.bgColor};
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
`;

const BodyUser = styled.div`
  background-color: ${props => props.bgColor};
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(245px, 1fr));
  gap: 20px;
  align-content: start;

  @media (max-width: 768px) {
    padding: 15px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;

const LoadingMessage = styled.div`
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

const De = () => {
  const { nombre: nombreParam } = useParams();
  const { theme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState(nombreParam || '');

  const url = `https://pixabay.com/api/?key=1732750-d45b5378879d1e877cd1d35a6&q=${searchTerm}&per_page=30`;

  const res = useFetch(url, {});

  const handleSearch = (termino) => {
    setSearchTerm(termino);
  };

  return (
    <Container bgColor={theme.background}>
      <HeadUser bgColor={theme.background}>
        <Buscador datosBusqueda={handleSearch} />
      </HeadUser>
      <BodyUser bgColor={theme.background}>
        {!res.response ? (
          <LoadingMessage bgColor={theme.background} textColor={theme.text}>
            Cargando...
          </LoadingMessage>
        ) : res.response.hits && res.response.hits.length > 0 ? (
          res.response.hits.map(task => <CargaImgUser key={task.id} task={task} />)
        ) : (
          <LoadingMessage bgColor={theme.background} textColor={theme.text}>
            No se encontraron resultados
          </LoadingMessage>
        )}
      </BodyUser>
    </Container>
  );
};

export default De;
