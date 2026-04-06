import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import '../components/Formularios/Cargarimg/Cargaimg.css';
import ModalSubir from '../components/Modal/ModalSubir';
import ModalEditar from '../components/Modal/ModalEditar';

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
  &:hover { opacity: 0.85; transform: translateY(-1px); }
`;

const ToggleBtn = styled.button`
  background: transparent;
  color: ${p => p.accent};
  border: 1px solid ${p => p.accent}88;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  &:hover {
    background: ${p => p.accent}22;
    border-color: ${p => p.accent};
  }
`;

/* ─── Grid ───────────────────────────────────────────────── */

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 249px);
  justify-content: center;
  gap: 10px;
`;

const FlatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 249px);
  justify-content: center;
  gap: 10px;
`;

const FlatCard = styled.div`
  position: relative;
  width: 249px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  &:hover .card-actions { opacity: 1; }
`;

const FlatImg = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
`;

const FlatLabel = styled.div`
  background: rgba(0,0,0,0.55);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/* ─── Tarjeta ─────────────────────────────────────────────── */

const CardWrapper = styled.div`
  position: relative;
  width: 249px;
  cursor: pointer;
  &:hover .card-actions { opacity: 1; }
`;

const CardActions = styled.div`
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
  &:hover { opacity: 0.85; }
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

const EmptyIcon = styled.div` font-size: 64px; `;

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

/* ─── Overlay genérico ───────────────────────────────────── */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

/* ─── Modal confirmación eliminar ────────────────────────── */

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

/* ─── Modal detalle ──────────────────────────────────────── */

const DetailBox = styled.div`
  background: ${p => p.bg};
  border: 1px solid #444;
  border-radius: 14px;
  padding: 32px;
  max-width: 700px;
  width: 95%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DetailClose = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255,255,255,0.1);
  border: none;
  color: #fff;
  font-size: 20px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover { background: rgba(255,255,255,0.2); }
`;

const DetailTitle = styled.h2`
  color: ${p => p.color};
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  padding-right: 40px;
`;

const IMG_BASE = { objectFit: 'cover', border: '2px solid rgb(247 247 251)' };
const GRID2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', borderRadius: 8, overflow: 'hidden' };

function DetailGrid({ ruta, imgs }) {
  const srcs = imgs.filter(Boolean).map(n => `${ruta}/${n}`);
  const n = srcs.length;
  if (n === 0) return null;
  if (n === 1) return (
    <img src={srcs[0]} alt="" style={{ ...IMG_BASE, width: '100%', height: 320, borderRadius: 8 }} />
  );
  if (n === 2) return (
    <div style={GRID2}>
      <img src={srcs[0]} alt="" style={{ ...IMG_BASE, width: '100%', height: 240 }} />
      <img src={srcs[1]} alt="" style={{ ...IMG_BASE, width: '100%', height: 240 }} />
    </div>
  );
  if (n === 3) return (
    <div style={GRID2}>
      <img src={srcs[0]} alt="" style={{ ...IMG_BASE, width: '100%', height: 160 }} />
      <img src={srcs[1]} alt="" style={{ ...IMG_BASE, width: '100%', height: 160 }} />
      <img src={srcs[2]} alt="" style={{ ...IMG_BASE, gridColumn: '1/3', width: '100%', height: 160 }} />
    </div>
  );
  return (
    <div style={GRID2}>
      <img src={srcs[0]} alt="" style={{ ...IMG_BASE, width: '100%', height: 160 }} />
      <img src={srcs[1]} alt="" style={{ ...IMG_BASE, width: '100%', height: 160 }} />
      <img src={srcs[2]} alt="" style={{ ...IMG_BASE, width: '100%', height: 160 }} />
      <img src={srcs[3]} alt="" style={{ ...IMG_BASE, width: '100%', height: 160 }} />
    </div>
  );
}

const DetailActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

/* ─── Tarjeta ─────────────────────────────────────────────── */

function TrasteroCard({ task, onDelete, onOpen, onEdit, theme }) {
  const imgs = [task.Imagen1, task.Imagen2, task.Imagen3, task.Imagen4].filter(Boolean);
  return (
    <CardWrapper onClick={() => onOpen(task)}>
      <article className="location-listing">
        <div className="backgroundTitle">
          <p className="titulo-tras">
            <img className="img-titulo-tras" src={`${task.Ruta}/${task.Imagen1}`} alt={task.Nombre} loading="lazy" />
            {task.Nombre}
          </p>
        </div>
        <div className="grid">
          {imgs[0] && <img className="item img-gif-top-left"     src={`${task.Ruta}/${imgs[0]}`} alt="" loading="lazy" />}
          {imgs[1] && <img className="item img-gif-top-right"    src={`${task.Ruta}/${imgs[1]}`} alt="" loading="lazy" />}
          {imgs[2] && <img className="item img-gif-left-bottom"  src={`${task.Ruta}/${imgs[2]}`} alt="" loading="lazy" />}
          {imgs[3] && <img className="item img-gif-right-bottom" src={`${task.Ruta}/${imgs[3]}`} alt="" loading="lazy" />}
        </div>
      </article>

      <CardActions className="card-actions">
        <ActionBtn accent={theme.accent} onClick={e => { e.stopPropagation(); onEdit(task); }}>
          ✏️ Editar
        </ActionBtn>
        <ActionBtn danger onClick={e => { e.stopPropagation(); onDelete(task); }}>
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
  const bg  = theme.modalBg;
  const acc = theme.accent;

  const [trasteros,  setTrasteros]  = useState([]);
  const [cargando,   setCargando]   = useState(true);
  const [confirmar,  setConfirmar]  = useState(null);
  const [detalle,    setDetalle]    = useState(null);
  const [showSubir,  setShowSubir]  = useState(false);
  const [vistaPlana,      setVistaPlana]      = useState(false);
  const [editar,          setEditar]          = useState(null);
  const [confirmarImagen, setConfirmarImagen] = useState(null); // { task, posicion }

  useEffect(() => {
    if (!user) return;
    setCargando(true);
    fetch(`${API_URL}/api/trasteros?usuario_id=${user.id}`)
      .then(r => r.ok ? r.json() : [])
      .then(data => setTrasteros(data))
      .catch(() => setTrasteros([]))
      .finally(() => setCargando(false));
  }, [user]);

  if (!user) {
    return (
      <PageWrapper>
        <ProtectedScreen>
          <div style={{ fontSize: 56 }}>🔒</div>
          <h2 style={{ color: getContrastColor(theme.background), margin: 0 }}>Acceso restringido</h2>
          <p style={{ color: getContrastColor(theme.background) + '88', margin: 0 }}>
            Inicia sesión para ver tu trastero
          </p>
          <AddBtn accent={acc} onClick={() => navigate('/')}>Ir al inicio</AddBtn>
        </ProtectedScreen>
      </PageWrapper>
    );
  }

  const handleEliminar = async (trastero) => {
    setConfirmar(null);
    setDetalle(null);
    try {
      await fetch(`${API_URL}/api/trasteros/${trastero.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('trastero_token')}` },
      });
    } catch {}
    setTrasteros(prev => prev.filter(t => t.id !== trastero.id));
  };

  const handleEliminarImagen = async ({ task, posicion }) => {
    setConfirmarImagen(null);
    try {
      const res = await fetch(`${API_URL}/api/trasteros/${task.id}/imagenes/${posicion}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('trastero_token')}` },
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.deleted) {
        setTrasteros(prev => prev.filter(t => t.id !== task.id));
      } else {
        setTrasteros(prev => prev.map(t => t.id === data.id ? data : t));
      }
    } catch {}
  };

  return (
    <PageWrapper>

      {/* ── Modal subir artículo ── */}
      <ModalSubir
        isOpen={showSubir}
        onClose={() => setShowSubir(false)}
        onPublicado={nuevo => setTrasteros(prev => [...prev, nuevo])}
      />

      {/* ── Modal editar artículo ── */}
      <ModalEditar
        isOpen={!!editar}
        trastero={editar}
        onClose={() => setEditar(null)}
        onGuardado={actualizado => {
          setTrasteros(prev => prev.map(t => t.id === actualizado.id ? actualizado : t));
          setEditar(null);
        }}
      />

      {/* ── Modal detalle ── */}
      {detalle && (
        <Overlay onClick={() => setDetalle(null)}>
          <DetailBox bg={bg} onClick={e => e.stopPropagation()}>
            <DetailClose onClick={() => setDetalle(null)}>✕</DetailClose>
            <DetailTitle color={getContrastColor(bg)}>{detalle.Nombre}</DetailTitle>
            <DetailGrid
              ruta={detalle.Ruta}
              imgs={[detalle.Imagen1, detalle.Imagen2, detalle.Imagen3, detalle.Imagen4]}
            />
            <DetailActions>
              <ActionBtn accent={acc} onClick={() => { setDetalle(null); setEditar(detalle); }}>✏️ Editar</ActionBtn>
              <ActionBtn danger onClick={() => { setDetalle(null); setConfirmar(detalle); }}>
                🗑️ Eliminar
              </ActionBtn>
            </DetailActions>
          </DetailBox>
        </Overlay>
      )}

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
              <ActionBtn danger onClick={() => handleEliminar(confirmar)}>Sí, eliminar</ActionBtn>
              <ActionBtn accent={acc} onClick={() => setConfirmar(null)}>Cancelar</ActionBtn>
            </ConfirmActions>
          </ConfirmBox>
        </Overlay>
      )}

      {/* ── Confirmar eliminar imagen suelta ── */}
      {confirmarImagen && (
        <Overlay onClick={() => setConfirmarImagen(null)}>
          <ConfirmBox bg={bg} onClick={e => e.stopPropagation()}>
            <ConfirmTitle bg={bg}>
              ¿Eliminar esta imagen de "{confirmarImagen.task.Nombre}"?<br />
              <span style={{ fontWeight: 400, fontSize: 14, opacity: 0.7 }}>
                {[confirmarImagen.task.Imagen1, confirmarImagen.task.Imagen2,
                  confirmarImagen.task.Imagen3, confirmarImagen.task.Imagen4].filter(Boolean).length === 1
                  ? 'Es la única imagen — se eliminará el artículo completo.'
                  : 'Solo se borrará esta imagen.'}
              </span>
            </ConfirmTitle>
            <ConfirmActions>
              <ActionBtn danger onClick={() => handleEliminarImagen(confirmarImagen)}>Sí, eliminar</ActionBtn>
              <ActionBtn accent={acc} onClick={() => setConfirmarImagen(null)}>Cancelar</ActionBtn>
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
          {trasteros.length > 0 && (
            <ToggleBtn
              accent={acc}
              title={vistaPlana ? 'Ver en grupo' : 'Ver todas las imágenes'}
              onClick={() => setVistaPlana(v => !v)}
            >
              {vistaPlana ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <rect x="1" y="1" width="6" height="6" rx="1"/>
                    <rect x="9" y="1" width="6" height="6" rx="1"/>
                    <rect x="1" y="9" width="6" height="6" rx="1"/>
                    <rect x="9" y="9" width="6" height="6" rx="1"/>
                  </svg>
                  Grupo
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <rect x="1" y="2" width="14" height="2" rx="1"/>
                    <rect x="1" y="7" width="14" height="2" rx="1"/>
                    <rect x="1" y="12" width="14" height="2" rx="1"/>
                  </svg>
                  Todas
                </>
              )}
            </ToggleBtn>
          )}
          <AddBtn accent={acc} onClick={() => setShowSubir(true)}>+ Añadir</AddBtn>
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
          <EmptySub bg={theme.background}>Publica tu primer trastero y empieza a vender</EmptySub>
          <AddBtn accent={acc} onClick={() => setShowSubir(true)}>+ Publicar mi primer trastero</AddBtn>
        </EmptyState>
      ) : vistaPlana ? (
        <FlatGrid>
          {trasteros.flatMap(task =>
            [task.Imagen1, task.Imagen2, task.Imagen3, task.Imagen4]
              .filter(Boolean)
              .map((img, i) => (
                <FlatCard key={`${task.id}-${i}`} onClick={() => setDetalle(task)}>
                  <FlatImg src={`${task.Ruta}/${img}`} alt={task.Nombre} loading="lazy" />
                  <FlatLabel>{task.Nombre}</FlatLabel>
                  <CardActions className="card-actions">
                    <ActionBtn accent={acc} onClick={e => { e.stopPropagation(); setEditar(task); }}>
                      ✏️ Editar
                    </ActionBtn>
                    <ActionBtn danger onClick={e => { e.stopPropagation(); setConfirmarImagen({ task, posicion: i + 1 }); }}>
                      🗑️ Eliminar
                    </ActionBtn>
                  </CardActions>
                </FlatCard>
              ))
          )}
        </FlatGrid>
      ) : (
        <Grid>
          {trasteros.map(task => (
            <TrasteroCard
              key={task.id || task.Nombre}
              task={task}
              theme={theme}
              onDelete={t => setConfirmar(t)}
              onOpen={t => setDetalle(t)}
              onEdit={t => setEditar(t)}
            />
          ))}
        </Grid>
      )}

    </PageWrapper>
  );
}

export default MiTrastero;
