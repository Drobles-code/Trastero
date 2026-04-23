import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AdaptiveGrid from '../../ImageGrid/AdaptiveGrid';

/* ── Styled Components (reemplaza Cargaimg.css) ── */

const CardLink = styled(Link)`
  text-decoration: none;
`;

const CardArticle = styled.article`
  position: relative;
  width: 249px;
  height: 239px;
  display: inline-block;
  cursor: pointer;
  &:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.35); border-radius: 8px; }
`;

const TitleBar = styled.div`
  background-color: var(--card-title-color);
  border-radius: 8px 8px 0 0;
  border: 2px solid rgb(247 247 251);
  width: 244px;
  height: 54px;
  display: flex;
  align-items: center;
  color: var(--accent-color);
  font-size: 15px;
  font-weight: bold;
`;

const TitleAvatar = styled.img`
  border-radius: 5px 0 0 0;
  vertical-align: middle;
  margin: 5px;
  width: 60%;
  height: auto;
  max-width: 60px;
  max-height: 39px;
  flex-shrink: 0;
`;

const TitleText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 6px;
`;

/* ── Componente ── */

function Cargaimg({ task }) {
  const imgs   = [task.Imagen1, task.Imagen2, task.Imagen3, task.Imagen4];
  const thumbs = [
    task.Thumb1 || task.Imagen1,
    task.Thumb2 || task.Imagen2,
    task.Thumb3 || task.Imagen3,
    task.Thumb4 || task.Imagen4,
  ];

  let currentUserId = null;
  try {
    const stored = localStorage.getItem('user');
    if (stored) currentUserId = JSON.parse(stored).id;
  } catch {}

  const isOwner = currentUserId && Number(task.usuario_id) === Number(currentUserId);
  const linkTo  = isOwner ? '/mi-trastero' : `/De/${task.trastero_nombre}`;

  return (
    <CardLink to={linkTo}>
      <CardArticle>
        <TitleBar>
          <TitleAvatar
            src={`${task.Ruta}/${task.Thumb1 || task.Imagen1}`}
            alt={task.trastero_nombre || task.Nombre}
            loading="lazy"
          />
          <TitleText>{task.trastero_nombre || task.Nombre}</TitleText>
        </TitleBar>
        <AdaptiveGrid ruta={task.Ruta} imgs={imgs} thumbs={thumbs} />
      </CardArticle>
    </CardLink>
  );
}

export default Cargaimg;
