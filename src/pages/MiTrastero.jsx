import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import '../components/Formularios/Cargarimg/Cargaimg.css';
import ModalSubir from '../components/Modal/ModalSubir';
import ModalEditar from '../components/Modal/ModalEditar';
import { formatExtra } from '../constants/categorias';

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
  width: calc(100% + 40px);
  margin-left: -20px;
  margin-right: -20px;
  padding: 24px 20px 60px;
  min-height: 80vh;
`;

const HeaderCard = styled.div`
  background: ${p => p.bg};
  border: 1px solid ${p => p.accent}55;
  border-radius: 12px;
  padding: 20px 24px;
  width: 100%;
  box-sizing: border-box;
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
  color: ${p => p.accent};
  font-size: 14px;
  font-weight: 500;
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
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background: ${p => p.bg};
  border: 2px solid rgb(247, 247, 251);
  &:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.35); }
  &:hover .card-actions { opacity: 1; }
`;

const FlatImg = styled.img`
  width: 100%;
  height: 185px;
  object-fit: cover;
  display: block;
`;

const FlatInfo = styled.div`
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-top: 2px solid rgb(247, 247, 251);
`;

const FlatPrice = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: ${p => p.accent};
  line-height: 1.1;
  margin-bottom: 1px;
`;

const FlatNombre = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${p => p.color};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FlatDesc = styled.div`
  font-size: 20px;
  color: ${p => p.color};
  opacity: 0.65;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
`;

const FlatExtras = styled.div`
  font-size: 20px;
  color: ${p => p.color};
  opacity: 0.75;
  margin-top: 2px;
`;

const FlatBadges = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-top: 3px;
`;

const FlatBadge = styled.span`
  font-size: 14px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 10px;
  background: ${p => p.accent}22;
  color: ${p => p.accent};
  border: 1px solid ${p => p.accent}44;
`;

const FlatRow = styled.div`
  font-size: 11px;
  color: ${p => p.accent || p.color};
  display: flex;
  align-items: baseline;
  gap: 2px;
  line-height: 1.4;
`;

/* ─── Tarjeta agrupada — texto 18px ─────────────────────────── */

const CardPrice  = styled(FlatPrice)`font-size: 18px;`;
const CardNombre = styled(FlatNombre)`font-size: 18px;`;
const CardDesc   = styled(FlatDesc)`font-size: 18px;`;
const CardExtras = styled(FlatExtras)`font-size: 18px;`;

/* ─── Tarjeta ─────────────────────────────────────────────── */

const CardWrapper = styled.div`
  position: relative;
  width: 249px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 10px;
  background: ${p => p.bg};
  border: 2px solid rgb(247, 247, 251);
  &:hover .card-actions { opacity: 1; }
  &:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.35); }
`;

const CardActions = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.55);
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 10px;
  padding-bottom: 14px;
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

function DetailGrid({ ruta, imgs, onImgClick }) {
  const srcs = imgs.filter(Boolean).map(n => `${ruta}/${n}`);
  const n = srcs.length;
  const click = (i, e) => { e.stopPropagation(); onImgClick?.(i); };
  const imgStyle = (extra) => ({ ...IMG_BASE, cursor: onImgClick ? 'zoom-in' : 'default', ...extra });
  if (n === 0) return null;
  if (n === 1) return (
    <img src={srcs[0]} alt="" onClick={e => click(0, e)} style={imgStyle({ width: '100%', height: 320, borderRadius: 8 })} />
  );
  if (n === 2) return (
    <div style={GRID2}>
      <img src={srcs[0]} alt="" onClick={e => click(0, e)} style={imgStyle({ width: '100%', height: 240 })} />
      <img src={srcs[1]} alt="" onClick={e => click(1, e)} style={imgStyle({ width: '100%', height: 240 })} />
    </div>
  );
  if (n === 3) return (
    <div style={GRID2}>
      <img src={srcs[0]} alt="" onClick={e => click(0, e)} style={imgStyle({ width: '100%', height: 160 })} />
      <img src={srcs[1]} alt="" onClick={e => click(1, e)} style={imgStyle({ width: '100%', height: 160 })} />
      <img src={srcs[2]} alt="" onClick={e => click(2, e)} style={imgStyle({ gridColumn: '1/3', width: '100%', height: 160 })} />
    </div>
  );
  return (
    <div style={GRID2}>
      <img src={srcs[0]} alt="" onClick={e => click(0, e)} style={imgStyle({ width: '100%', height: 160 })} />
      <img src={srcs[1]} alt="" onClick={e => click(1, e)} style={imgStyle({ width: '100%', height: 160 })} />
      <img src={srcs[2]} alt="" onClick={e => click(2, e)} style={imgStyle({ width: '100%', height: 160 })} />
      <img src={srcs[3]} alt="" onClick={e => click(3, e)} style={imgStyle({ width: '100%', height: 160 })} />
    </div>
  );
}

const DetailActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const DetailPrice = styled.div`
  font-size: 26px;
  font-weight: 800;
  color: ${p => p.accent};
`;

const DetailMeta = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`;

const MetaTag = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 12px;
  background: ${p => p.accent ? p.accent + '22' : 'rgba(255,255,255,0.08)'};
  color: ${p => p.accent ? p.accent : 'rgba(255,255,255,0.7)'};
  border: 1px solid ${p => p.accent ? p.accent + '44' : 'rgba(255,255,255,0.15)'};
`;

const DetailDesc = styled.p`
  color: ${p => p.color}bb;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  white-space: pre-wrap;
`;

/* ─── Lightbox ───────────────────────────────────────────── */

const LightboxOverlay = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,0.92);
  display: flex; align-items: center; justify-content: center;
  z-index: 3000;
`;

const LightboxImg = styled.img`
  max-width: 90vw; max-height: 85vh;
  object-fit: contain; border-radius: 8px;
  user-select: none; display: block;
`;

const LightboxNav = styled.button`
  position: absolute; top: 50%; transform: translateY(-50%);
  ${p => p.prev ? 'left: 16px;' : 'right: 16px;'}
  background: rgba(255,255,255,0.12); border: none; color: #fff;
  font-size: 28px; width: 48px; height: 48px; border-radius: 50%;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: background 0.2s;
  &:hover { background: rgba(255,255,255,0.25); }
  &:disabled { opacity: 0.2; cursor: default; }
`;

const LightboxClose = styled.button`
  position: absolute; top: 16px; right: 16px;
  background: rgba(255,255,255,0.12); border: none; color: #fff;
  font-size: 20px; width: 40px; height: 40px; border-radius: 50%;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  &:hover { background: rgba(255,255,255,0.25); }
`;

const LightboxDots = styled.div`
  position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
  display: flex; gap: 8px;
`;

const LightboxDot = styled.div`
  width: 8px; height: 8px; border-radius: 50%;
  background: ${p => p.active ? '#fff' : 'rgba(255,255,255,0.35)'};
  transition: background 0.2s; cursor: pointer;
`;

/* ─── Grid de imágenes (independiente de Cargaimg) ────────── */

const IMG_BASE_CARD = { objectFit: 'cover', border: '2px solid rgb(247 247 251)' };
const GRID_STYLE_CARD = { display: 'grid', gridTemplateColumns: '1fr 1fr' };

function AdaptiveGrid({ ruta, imgs, width }) {
  const gridStyle = width ? { ...GRID_STYLE_CARD, width } : GRID_STYLE_CARD;
  const srcs = imgs.filter(Boolean).map(name => `${ruta}/${name}`);
  const n = srcs.length;
  if (n === 0) return null;
  if (n === 1) return (
    <div style={gridStyle}>
      <img src={srcs[0]} alt="" loading="lazy"
        style={{ ...IMG_BASE_CARD, gridColumn: '1/3', gridRow: '1/3', width: '100%', height: '168px', borderRadius: '0 0 8px 8px' }} />
    </div>
  );
  if (n === 2) return (
    <div style={gridStyle}>
      <img src={srcs[0]} alt="" loading="lazy" style={{ ...IMG_BASE_CARD, gridColumn: '1/2', gridRow: '1/3', width: '100%', height: '168px', borderRadius: '0 0 0 8px' }} />
      <img src={srcs[1]} alt="" loading="lazy" style={{ ...IMG_BASE_CARD, gridColumn: '2/3', gridRow: '1/3', width: '100%', height: '168px', borderRadius: '0 0 8px 0' }} />
    </div>
  );
  if (n === 3) return (
    <div style={gridStyle}>
      <img src={srcs[0]} alt="" loading="lazy" style={{ ...IMG_BASE_CARD, width: '100%', height: '84px' }} />
      <img src={srcs[1]} alt="" loading="lazy" style={{ ...IMG_BASE_CARD, width: '100%', height: '84px' }} />
      <img src={srcs[2]} alt="" loading="lazy"
        style={{ ...IMG_BASE_CARD, gridColumn: '1/3', width: '100%', height: '84px', marginTop: '-4px', borderRadius: '0 0 8px 8px' }} />
    </div>
  );
  return (
    <div style={gridStyle}>
      <img src={srcs[0]} alt="" loading="lazy" style={{ ...IMG_BASE_CARD, width: '100%', height: '84px' }} />
      <img src={srcs[1]} alt="" loading="lazy" style={{ ...IMG_BASE_CARD, width: '100%', height: '84px' }} />
      <img src={srcs[2]} alt="" loading="lazy" style={{ ...IMG_BASE_CARD, width: '100%', height: '84px', marginTop: '-4px', borderRadius: '0 0 0 8px' }} />
      <img src={srcs[3]} alt="" loading="lazy" style={{ ...IMG_BASE_CARD, width: '100%', height: '84px', marginTop: '-4px', borderRadius: '0 0 8px 0' }} />
    </div>
  );
}

/* ─── Tarjeta ─────────────────────────────────────────────── */

function TrasteroCard({ task, onDelete, onOpen, onEdit, theme }) {
  const acc = theme.accent;
  const bg  = theme.modalBg;
  const txt = getContrastColor(bg);
  const precio = task.Precio !== null && task.Precio !== undefined
    ? task.Precio.toLocaleString('es-ES', { minimumFractionDigits: 0 }) + ' €'
    : null;
  const extra = formatExtra(task.Extras);

  return (
    <CardWrapper bg={bg} accent={acc} onClick={() => onOpen(task)}>
      {/* ── Grid de imágenes con overlay hover ── */}
      <div style={{ position: 'relative' }}>
        <AdaptiveGrid ruta={task.Ruta} imgs={[task.Imagen1, task.Imagen2, task.Imagen3, task.Imagen4]} width="100%" />
        <CardActions className="card-actions">
          <ActionBtn accent={acc} onClick={e => { e.stopPropagation(); onEdit(task); }}>
            ✏️ Editar
          </ActionBtn>
          <ActionBtn danger onClick={e => { e.stopPropagation(); onDelete(task); }}>
            🗑️ Eliminar
          </ActionBtn>
        </CardActions>
      </div>

      {/* ── Datos del artículo ── */}
      <FlatInfo>
        {precio && <CardPrice accent={acc}>{precio}</CardPrice>}
        <CardNombre color={txt}>{task.Nombre}</CardNombre>
        {task.Descripcion && <CardDesc color={txt}>{task.Descripcion}</CardDesc>}
        {extra && <CardExtras color={txt}>{extra}</CardExtras>}
        {(task.AceptaCambio || task.Negociable) && (
          <FlatBadges>
            {task.AceptaCambio && <FlatBadge accent={acc}>Acepta cambio</FlatBadge>}
            {task.Negociable   && <FlatBadge accent={acc}>Negociable</FlatBadge>}
          </FlatBadges>
        )}
      </FlatInfo>
    </CardWrapper>
  );
}

/* ─── Componente principal ───────────────────────────────── */

function MiTrastero({ user }) {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const bg  = theme.modalBg;
  const acc = theme.accent;

  const [trasteros,    setTrasteros]    = useState([]);
  const [trasteroId,   setTrasteroId]   = useState(null); // id del contenedor activo
  const [cargando,     setCargando]     = useState(true);
  const [confirmar,    setConfirmar]    = useState(null);
  const [detalle,      setDetalle]      = useState(null);
  const [showSubir,    setShowSubir]    = useState(false);
  const [vistaPlana,      setVistaPlana]      = useState(false);
  const [editar,          setEditar]          = useState(null);
  const [confirmarImagen, setConfirmarImagen] = useState(null); // { task, posicion }
  const [lightbox, setLightbox] = useState(null); // { imgs: [], idx: 0 }

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox(p => p.idx < p.imgs.length - 1 ? { ...p, idx: p.idx + 1 } : p);
      if (e.key === 'ArrowLeft')  setLightbox(p => p.idx > 0 ? { ...p, idx: p.idx - 1 } : p);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox]);

  useEffect(() => {
    if (!user) return;
    setCargando(true);
    // Cargar el contenedor (trastero) del usuario para obtener su id
    fetch(`${API_URL}/api/trasteros/contenedor?usuario_id=${user.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('trastero_token')}` },
    })
      .then(r => r.ok ? r.json() : [])
      .then(data => { if (data.length > 0) setTrasteroId(data[0].id); })
      .catch(() => {});
    // Cargar artículos del usuario
    fetch(`${API_URL}/api/trasteros?usuario_id=${user.id}`)
      .then(r => r.ok ? r.json() : [])
      .then(data => setTrasteros(data))
      .catch(() => setTrasteros([]))
      .finally(() => setCargando(false));
  }, [user]);

  if (!user) {
    return (
      <PageWrapper bg={theme.background || '#000000'}>
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
    <PageWrapper bg={theme.background || '#000000'}>

      {/* ── Modal subir artículo ── */}
      <ModalSubir
        isOpen={showSubir}
        onClose={() => setShowSubir(false)}
        onPublicado={nuevo => setTrasteros(prev => [...prev, nuevo])}
        trasteroId={trasteroId}
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

            {/* Precio */}
            {detalle.Precio !== null && detalle.Precio !== undefined && (
              <DetailPrice accent={acc}>
                {detalle.Precio.toLocaleString('es-ES', { minimumFractionDigits: 0 })} €
              </DetailPrice>
            )}

            {/* Meta badges */}
            {(detalle.Categoria || detalle.Subcategoria || detalle.Negociable || detalle.AceptaCambio || formatExtra(detalle.Extras)) && (
              <DetailMeta>
                {detalle.Subcategoria && <MetaTag accent={acc}>{detalle.Subcategoria}</MetaTag>}
                {!detalle.Subcategoria && detalle.Categoria && <MetaTag accent={acc}>{detalle.Categoria}</MetaTag>}
                {formatExtra(detalle.Extras) && <MetaTag>{formatExtra(detalle.Extras)}</MetaTag>}
                {detalle.Negociable   && <MetaTag accent={acc}>Negociable</MetaTag>}
                {detalle.AceptaCambio && <MetaTag accent={acc}>Acepta cambio</MetaTag>}
              </DetailMeta>
            )}

            {/* Descripción */}
            {detalle.Descripcion && (
              <DetailDesc color={getContrastColor(bg)}>{detalle.Descripcion}</DetailDesc>
            )}

            {/* Grid de imágenes */}
            <DetailGrid
              ruta={detalle.Ruta}
              imgs={[detalle.Imagen1, detalle.Imagen2, detalle.Imagen3, detalle.Imagen4]}
              onImgClick={i => {
                const allImgs = [detalle.Imagen1, detalle.Imagen2, detalle.Imagen3, detalle.Imagen4]
                  .filter(Boolean).map(n => `${detalle.Ruta}/${n}`);
                setLightbox({ imgs: allImgs, idx: i });
              }}
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

      {/* ── Lightbox ── */}
      {lightbox && (
        <LightboxOverlay onClick={() => setLightbox(null)}>
          <LightboxClose onClick={() => setLightbox(null)}>✕</LightboxClose>
          <LightboxNav prev disabled={lightbox.idx === 0}
            onClick={e => { e.stopPropagation(); setLightbox(p => ({ ...p, idx: p.idx - 1 })); }}>
            ‹
          </LightboxNav>
          <LightboxImg
            src={lightbox.imgs[lightbox.idx]}
            alt=""
            onClick={e => e.stopPropagation()}
          />
          <LightboxNav disabled={lightbox.idx === lightbox.imgs.length - 1}
            onClick={e => { e.stopPropagation(); setLightbox(p => ({ ...p, idx: p.idx + 1 })); }}>
            ›
          </LightboxNav>
          {lightbox.imgs.length > 1 && (
            <LightboxDots onClick={e => e.stopPropagation()}>
              {lightbox.imgs.map((_, i) => (
                <LightboxDot key={i} active={i === lightbox.idx}
                  onClick={() => setLightbox(p => ({ ...p, idx: i }))} />
              ))}
            </LightboxDots>
          )}
        </LightboxOverlay>
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
            <CountBadge bg={bg} accent={acc}>
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
              .map((img, i) => {
                const bg2 = theme.modalBg || '#1a1a1a';
                const txt = getContrastColor(bg2);
                const precio = task.Precio !== null && task.Precio !== undefined
                  ? task.Precio.toLocaleString('es-ES', { minimumFractionDigits: 0 }) + ' €'
                  : null;
                const extra = formatExtra(task.Extras);
                const allImgs = [task.Imagen1, task.Imagen2, task.Imagen3, task.Imagen4]
                  .filter(Boolean).map(n => `${task.Ruta}/${n}`);
                return (
                  <FlatCard key={`${task.id}-${i}`} bg={bg2} accent={acc}
                    onClick={() => setLightbox({ imgs: allImgs, idx: i })}>
                    <div style={{ position: 'relative' }}>
                      <FlatImg src={`${task.Ruta}/${img}`} alt={task.Nombre} loading="lazy" />
                      <CardActions className="card-actions">
                        <ActionBtn accent={acc} onClick={e => { e.stopPropagation(); setEditar(task); }}>
                          ✏️ Editar
                        </ActionBtn>
                        <ActionBtn danger onClick={e => { e.stopPropagation(); setConfirmarImagen({ task, posicion: i + 1 }); }}>
                          🗑️ Eliminar
                        </ActionBtn>
                      </CardActions>
                    </div>
                    <FlatInfo>
                      {precio && <FlatPrice accent={acc}>{precio}</FlatPrice>}
                      <FlatNombre color={txt}>{task.Nombre}</FlatNombre>
                      {task.Descripcion && <FlatDesc color={txt}>{task.Descripcion}</FlatDesc>}
                      {extra && <FlatExtras color={txt}>{extra}</FlatExtras>}
                      {(task.AceptaCambio || task.Negociable) && (
                        <FlatBadges>
                          {task.AceptaCambio && <FlatBadge accent={acc}>Acepta cambio</FlatBadge>}
                          {task.Negociable   && <FlatBadge accent={acc}>Negociable</FlatBadge>}
                        </FlatBadges>
                      )}
                    </FlatInfo>
                  </FlatCard>
                );
              })
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
