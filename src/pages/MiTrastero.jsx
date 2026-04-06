import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const getContrastColor = (hexColor) => {
  const hex = (hexColor || '#000000').replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminancia = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminancia > 0.5 ? '#000000' : '#ffffff';
};

/* ─── Layout ─────────────────────────────────────────────── */

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 20px 60px;
  min-height: 80vh;
`;

const HeaderCard = styled.div`
  background: ${p => p.bg};
  border: 1px solid ${p => p.accent}55;
  border-radius: 12px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Avatar = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 2px solid ${p => p.accent};
  object-fit: cover;
`;

const UserMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const UserName = styled.h1`
  color: ${p => getContrastColor(p.bg)};
  font-size: 20px;
  font-weight: 700;
  margin: 0;
`;

const UserSub = styled.p`
  color: ${p => getContrastColor(p.bg)}88;
  font-size: 13px;
  margin: 0;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CountBadge = styled.div`
  color: ${p => getContrastColor(p.bg)}88;
  font-size: 14px;
`;

const AddBtn = styled.button`
  background: ${p => p.accent};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }
`;

/* ─── Grid ───────────────────────────────────────────────── */

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 249px);
  justify-content: center;
  gap: 10px;
`;

/* ─── Tarjeta ─────────────────────────────────────────────── */

const CardWrapper = styled.div`
  position: relative;
  width: 249px;

  &:hover .card-actions {
    opacity: 1;
  }
`;

const CardActions = styled.div`
  className: card-actions;
  position: absolute;
  top: 58px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.55);
  border-radius: 0 0 8px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 10;
`;

const ActionBtn = styled.button`
  background: ${p => p.danger ? '#e74c3c' : p.accent};
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.85;
  }
`;

/* ─── Estado vacío ───────────────────────────────────────── */

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  gap: 14px;
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
`;

const EmptyTitle = styled.h2`
  color: ${p => getContrastColor(p.bg)};
  font-size: 20px;
  margin: 0;
`;

const EmptySub = styled.p`
  color: ${p => getContrastColor(p.bg)}77;
  font-size: 15px;
  margin: 0;
`;

/* ─── Pantalla protegida ─────────────────────────────────── */

const ProtectedScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 16px;
  text-align: center;
`;

/* ─── Modal de confirmación ──────────────────────────────── */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ConfirmBox = styled.div`
  background: ${p => p.bg};
  border: 1px solid #444;
  border-radius: 12px;
  padding: 28px 32px;
  max-width: 360px;
  width: 90%;
  text-align: center;
`;

const ConfirmTitle = styled.p`
  color: ${p => getContrastColor(p.bg)};
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 20px;
`;

const ConfirmActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

/* ─── Tarjeta reutilizando estilos de Cargaimg ───────────── */

function TrasteroCard({ task, onDelete, theme }) {
  return (
    <CardWrapper>
      <Link to={`/De/${task.Nombre}`} style={{ textDecoration: 'none' }}>
        <article className="location-listing">
          <div className="backgroundTitle">
            <p className="titulo-tras">
              <img
                className="img-titulo-tras"
                src={`${task.Ruta}/${task.Imagen1}`}
                alt={task.Nombre}
                loading="lazy"
              />
              {task.Nombre}
            </p>
          </div>
          <div className="grid">
            <img className="item img-gif-top-left"    src={`${task.Ruta}/${task.Imagen1}`} alt={task.Nombre} loading="lazy" />
            <img className="item img-gif-top-right"   src={`${task.Ruta}/${task.Imagen2}`} alt={task.Nombre} loading="lazy" />
            <img className="item img-gif-left-bottom" src={`${task.Ruta}/${task.Imagen3}`} alt={task.Nombre} loading="lazy" />
            <img className="item img-gif-right-bottom" src={`${task.Ruta}/${task.Imagen4}`} alt={task.Nombre} loading="lazy" />
          </div>
        </article>
      </Link>

      <CardActions className="card-actions">
        <ActionBtn accent={theme.accent} onClick={(e) => { e.preventDefault(); }}>
          ✏️ Editar
        </ActionBtn>
        <ActionBtn danger onClick={(e) => { e.preventDefault(); onDelete(task); }}>
          🗑️ Eliminar
        </ActionBtn>
      </CardActions>
    </CardWrapper>
  );
}

/* ─── Componente principal ───────────────────────────────── */

function MiTrastero({ user }) {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const bg = theme.modalBg;
  const acc = theme.accent;

  const [trasteros, setTrasteros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [confirmar, setConfirmar] = useState(null); // trastero a eliminar

  useEffect(() => {
    if (!user) return;
    setCargando(true);
    fetch(`${API_URL}/api/trasteros?usuario_id=${user.id}`)
      .then(r => r.ok ? r.json() : [])
      .then(data => setTrasteros(data))
      .catch(() => setTrasteros([]))
      .finally(() => setCargando(false));
  }, [user]);

  /* ── Sin sesión ── */
  if (!user) {
    return (
      <PageWrapper>
        <ProtectedScreen>
          <div style={{ fontSize: 56 }}>🔒</div>
          <h2 style={{ color: getContrastColor(theme.background), margin: 0 }}>
            Acceso restringido
          </h2>
          <p style={{ color: getContrastColor(theme.background) + '88', margin: 0 }}>
            Inicia sesión para ver tu trastero
          </p>
          <AddBtn accent={acc} onClick={() => navigate('/')}>
            Ir al inicio
          </AddBtn>
        </ProtectedScreen>
      </PageWrapper>
    );
  }

  const handleEliminar = async (trastero) => {
    setConfirmar(null);
    try {
      await fetch(`${API_URL}/api/trasteros/${trastero.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('trastero_token')}` },
      });
    } catch {}
    setTrasteros(prev => prev.filter(t => t.id !== trastero.id));
  };

  return (
    <PageWrapper>

      {/* ── Confirmar eliminación ── */}
      {confirmar && (
        <Overlay onClick={() => setConfirmar(null)}>
          <ConfirmBox bg={bg} onClick={e => e.stopPropagation()}>
            <ConfirmTitle bg={bg}>
              ¿Eliminar "{confirmar.Nombre}"?<br />
              <span style={{ fontWeight: 400, fontSize: 14, opacity: 0.7 }}>
                Esta acción no se puede deshacer.
              </span>
            </ConfirmTitle>
            <ConfirmActions>
              <ActionBtn danger onClick={() => handleEliminar(confirmar)}>
                Sí, eliminar
              </ActionBtn>
              <ActionBtn accent={acc} onClick={() => setConfirmar(null)}>
                Cancelar
              </ActionBtn>
            </ConfirmActions>
          </ConfirmBox>
        </Overlay>
      )}

      {/* ── Header ── */}
      <HeaderCard bg={bg} accent={acc}>
        <UserInfo>
          <Avatar src={user.avatar} alt={user.name} accent={acc} />
          <UserMeta>
            <UserName bg={bg}>Mi Trastero</UserName>
            <UserSub bg={bg}>{user.name}</UserSub>
          </UserMeta>
        </UserInfo>
        <HeaderRight>
          {!cargando && (
            <CountBadge bg={bg}>
              📦 {trasteros.length} {trasteros.length === 1 ? 'artículo' : 'artículos'}
            </CountBadge>
          )}
          <AddBtn accent={acc} onClick={() => navigate('/subir')}>
            + Añadir
          </AddBtn>
        </HeaderRight>
      </HeaderCard>

      {/* ── Contenido ── */}
      {cargando ? (
        <EmptyState>
          <EmptyIcon>⏳</EmptyIcon>
          <EmptyTitle bg={theme.background}>Cargando...</EmptyTitle>
        </EmptyState>
      ) : trasteros.length === 0 ? (
        <EmptyState>
          <EmptyIcon>📦</EmptyIcon>
          <EmptyTitle bg={theme.background}>Aún no tienes artículos</EmptyTitle>
          <EmptySub bg={theme.background}>
            Publica tu primer trastero y empieza a vender
          </EmptySub>
          <AddBtn accent={acc} onClick={() => navigate('/subir')}>
            + Publicar mi primer trastero
          </AddBtn>
        </EmptyState>
      ) : (
        <Grid>
          {trasteros.map(task => (
            <TrasteroCard
              key={task.id || task.Nombre}
              task={task}
              theme={theme}
              onDelete={(t) => setConfirmar(t)}
            />
          ))}
        </Grid>
      )}

    </PageWrapper>
  );
}

export default MiTrastero;
