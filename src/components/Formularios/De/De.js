import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../context/ThemeContext';
import { formatExtra } from '../../../constants/categorias';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const getContrast = (hex) => {
  const h = (hex || '#000000').replace('#', '');
  const r = parseInt(h.substr(0,2),16), g = parseInt(h.substr(2,2),16), b = parseInt(h.substr(4,2),16);
  return (0.299*r + 0.587*g + 0.114*b)/255 > 0.5 ? '#000000' : '#ffffff';
};

/* ── Layout ──────────────────────────────────────────────────── */

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

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const HeaderMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const TrasteroName = styled.h1`
  color: ${p => getContrast(p.bg)};
  font-size: 20px;
  font-weight: 700;
  margin: 0;
`;

const TrasteroSub = styled.p`
  color: ${p => getContrast(p.bg)}88;
  font-size: 13px;
  margin: 0;
`;

const BackBtn = styled.button`
  background: none;
  border: 1px solid ${p => p.accent}44;
  color: ${p => p.accent};
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
  &:hover { background: ${p => p.accent}22; }
`;

const CountBadge = styled.div`
  color: ${p => p.accent};
  font-size: 14px;
  font-weight: 500;
`;

/* ── Grid ────────────────────────────────────────────────────── */

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 249px);
  justify-content: center;
  gap: 10px;
`;

/* ── Tarjeta pública ─────────────────────────────────────────── */

const CardWrapper = styled.div`
  position: relative;
  width: 249px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 10px;
  background: ${p => p.bg};
  border: 2px solid rgb(247, 247, 251);
  &:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.35); }
`;

const IMG_BASE = { objectFit: 'cover', border: '2px solid rgb(247 247 251)' };
const GRID_STYLE = { display: 'grid', gridTemplateColumns: '1fr 1fr', width: '244px' };

function AdaptiveGrid({ ruta, imgs, thumbs }) {
  const display = (thumbs && thumbs.length ? thumbs : imgs);
  const srcs = display.filter(Boolean).map(n => `${ruta}/${n}`);
  const n = srcs.length;
  if (n === 0) return null;
  if (n === 1) return (
    <div style={GRID_STYLE}>
      <img src={srcs[0]} alt="" loading="lazy"
        style={{ ...IMG_BASE, gridColumn: '1/3', gridRow: '1/3', width: '100%', height: '168px', borderRadius: '0 0 8px 8px' }} />
    </div>
  );
  if (n === 2) return (
    <div style={GRID_STYLE}>
      <img src={srcs[0]} alt="" loading="lazy" style={{ ...IMG_BASE, gridColumn: '1/2', gridRow: '1/3', width: '100%', height: '168px', borderRadius: '0 0 0 8px' }} />
      <img src={srcs[1]} alt="" loading="lazy" style={{ ...IMG_BASE, gridColumn: '2/3', gridRow: '1/3', width: '100%', height: '168px', borderRadius: '0 0 8px 0' }} />
    </div>
  );
  if (n === 3) return (
    <div style={GRID_STYLE}>
      <img src={srcs[0]} alt="" loading="lazy" style={{ ...IMG_BASE, width: '100%', height: '84px' }} />
      <img src={srcs[1]} alt="" loading="lazy" style={{ ...IMG_BASE, width: '100%', height: '84px' }} />
      <img src={srcs[2]} alt="" loading="lazy" style={{ ...IMG_BASE, gridColumn: '1/3', width: '100%', height: '84px', marginTop: '-4px', borderRadius: '0 0 8px 8px' }} />
    </div>
  );
  return (
    <div style={GRID_STYLE}>
      <img src={srcs[0]} alt="" loading="lazy" style={{ ...IMG_BASE, width: '100%', height: '84px' }} />
      <img src={srcs[1]} alt="" loading="lazy" style={{ ...IMG_BASE, width: '100%', height: '84px' }} />
      <img src={srcs[2]} alt="" loading="lazy" style={{ ...IMG_BASE, width: '100%', height: '84px', marginTop: '-4px', borderRadius: '0 0 0 8px' }} />
      <img src={srcs[3]} alt="" loading="lazy" style={{ ...IMG_BASE, width: '100%', height: '84px', marginTop: '-4px', borderRadius: '0 0 8px 0' }} />
    </div>
  );
}

const CardInfo = styled.div`
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-top: 2px solid rgb(247, 247, 251);
`;

const CardPrice = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: ${p => p.accent};
  line-height: 1.1;
`;

const CardNombre = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${p => p.color};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardDesc = styled.div`
  font-size: 13px;
  color: ${p => p.color};
  opacity: 0.65;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
`;

const CardBadges = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-top: 3px;
`;

const CardBadge = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 10px;
  background: ${p => p.accent}22;
  color: ${p => p.accent};
  border: 1px solid ${p => p.accent}44;
`;

function TrasteroCard({ task, theme, onOpen }) {
  const bg  = theme.modalBg || '#1a1a1a';
  const acc = theme.accent  || '#667eea';
  const txt = getContrast(bg);
  const thumbs = [task.Thumb1||task.Imagen1, task.Thumb2||task.Imagen2, task.Thumb3||task.Imagen3, task.Thumb4||task.Imagen4];
  const imgs   = [task.Imagen1, task.Imagen2, task.Imagen3, task.Imagen4];
  const precio = task.Precio !== null && task.Precio !== undefined
    ? task.Precio.toLocaleString('es-ES', { minimumFractionDigits: 0 }) + ' €'
    : null;
  const extra = formatExtra(task.Extras);

  return (
    <CardWrapper bg={bg} onClick={() => onOpen(task)}>
      <div style={{
        background: theme.cardTitle || '#1a1a2e',
        color: getContrast(theme.cardTitle || '#1a1a2e'),
        padding: '8px 12px',
        fontSize: 20,
        fontWeight: 700,
        textAlign: 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        {task.Nombre}
      </div>
      <div style={{ position: 'relative' }}>
        <AdaptiveGrid ruta={task.Ruta} imgs={imgs} thumbs={thumbs} />
      </div>
      <CardInfo>
        {precio && <CardPrice accent={acc}>{precio}</CardPrice>}
        {task.Descripcion && <CardDesc color={txt}>{task.Descripcion}</CardDesc>}
        {extra && <div style={{ fontSize: 12, color: txt, opacity: 0.75 }}>{extra}</div>}
        {(task.AceptaCambio || task.Negociable) && (
          <CardBadges>
            {task.AceptaCambio && <CardBadge accent={acc}>Acepta cambio</CardBadge>}
            {task.Negociable   && <CardBadge accent={acc}>Negociable</CardBadge>}
          </CardBadges>
        )}
      </CardInfo>
    </CardWrapper>
  );
}

/* ── Modal detalle ───────────────────────────────────────────── */

const Overlay = styled.div`
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.6);
  z-index: 2000;
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
`;

const DetailBox = styled.div`
  background: ${p => p.bg};
  border-radius: 14px;
  padding: 28px;
  max-width: 560px;
  width: 100%;
  max-height: 88vh;
  overflow-y: auto;
  position: relative;
`;

const DetailClose = styled.button`
  position: absolute; top: 14px; right: 14px;
  background: transparent; border: none;
  font-size: 20px; cursor: pointer;
  color: ${p => getContrast(p.bg)}88;
  &:hover { color: ${p => getContrast(p.bg)}; }
`;

const DetailTitle = styled.h2`
  color: ${p => p.color};
  font-size: 22px; font-weight: 800;
  margin: 0 0 8px;
`;

const DetailPrice = styled.div`
  color: ${p => p.accent};
  font-size: 26px; font-weight: 800;
  margin-bottom: 10px;
`;

const DetailMeta = styled.div`
  display: flex; gap: 6px; flex-wrap: wrap;
  margin-bottom: 12px;
`;

const MetaTag = styled.span`
  background: ${p => (p.accent || '#888')}22;
  border: 1px solid ${p => (p.accent || '#888')}44;
  color: ${p => p.accent || '#888'};
  border-radius: 20px;
  padding: 3px 10px;
  font-size: 12px; font-weight: 600;
`;

const DetailDesc = styled.p`
  color: ${p => p.color};
  opacity: 0.85;
  line-height: 1.6;
  margin: 0 0 16px;
  font-size: 14px;
`;

/* ── Detail image grid ───────────────────────────────────────── */
const DG2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', borderRadius: 10, overflow: 'hidden', marginBottom: 0 };
const DI  = { objectFit: 'cover', border: '2px solid rgb(247 247 251)', cursor: 'zoom-in' };

function DetailGrid({ ruta, imgs, onImgClick }) {
  const srcs = imgs.filter(Boolean).map(n => `${ruta}/${n}`);
  const n = srcs.length;
  if (n === 0) return null;
  if (n === 1) return (
    <img src={srcs[0]} alt="" onClick={() => onImgClick(0)}
      style={{ ...DI, width: '100%', height: 300, borderRadius: 10, display: 'block', marginBottom: 0 }} />
  );
  if (n === 2) return (
    <div style={DG2}>
      <img src={srcs[0]} alt="" onClick={() => onImgClick(0)} style={{ ...DI, width: '100%', height: 220 }} />
      <img src={srcs[1]} alt="" onClick={() => onImgClick(1)} style={{ ...DI, width: '100%', height: 220 }} />
    </div>
  );
  if (n === 3) return (
    <div style={DG2}>
      <img src={srcs[0]} alt="" onClick={() => onImgClick(0)} style={{ ...DI, width: '100%', height: 160 }} />
      <img src={srcs[1]} alt="" onClick={() => onImgClick(1)} style={{ ...DI, width: '100%', height: 160 }} />
      <img src={srcs[2]} alt="" onClick={() => onImgClick(2)} style={{ ...DI, gridColumn: '1/3', width: '100%', height: 160 }} />
    </div>
  );
  return (
    <div style={DG2}>
      <img src={srcs[0]} alt="" onClick={() => onImgClick(0)} style={{ ...DI, width: '100%', height: 160 }} />
      <img src={srcs[1]} alt="" onClick={() => onImgClick(1)} style={{ ...DI, width: '100%', height: 160 }} />
      <img src={srcs[2]} alt="" onClick={() => onImgClick(2)} style={{ ...DI, width: '100%', height: 160 }} />
      <img src={srcs[3]} alt="" onClick={() => onImgClick(3)} style={{ ...DI, width: '100%', height: 160 }} />
    </div>
  );
}

/* ── Lightbox ────────────────────────────────────────────────── */

const LbOverlay = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,0.92);
  display: flex; align-items: center; justify-content: center;
  z-index: 3000; cursor: zoom-out;
`;
const LbImg = styled.img`
  max-width: 92vw; max-height: 88vh; object-fit: contain; border-radius: 6px; cursor: default;
`;
const LbNav = styled.button`
  position: absolute; top: 50%; transform: translateY(-50%);
  ${p => p.prev ? 'left: 20px;' : 'right: 20px;'}
  background: rgba(255,255,255,0.15); border: none; color: #fff;
  font-size: 32px; width: 48px; height: 48px; border-radius: 50%;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  opacity: ${p => p.disabled ? 0.2 : 1};
  pointer-events: ${p => p.disabled ? 'none' : 'auto'};
`;
const LbClose = styled.button`
  position: absolute; top: 16px; right: 16px;
  background: rgba(255,255,255,0.15); border: none; color: #fff;
  font-size: 18px; width: 36px; height: 36px; border-radius: 50%; cursor: pointer;
`;
const LbDots = styled.div`
  position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
  display: flex; gap: 8px;
`;
const LbDot = styled.button`
  width: 8px; height: 8px; border-radius: 50%; border: none; cursor: pointer;
  background: ${p => p.active ? '#fff' : 'rgba(255,255,255,0.35)'};
  padding: 0; transition: background 0.2s;
`;

/* ── Toggle + Vista plana ────────────────────────────────────── */

const ToggleBtn = styled.button`
  background: transparent;
  color: ${p => p.accent};
  border: 1px solid ${p => p.accent}88;
  border-radius: 8px;
  padding: 7px 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  &:hover { background: ${p => p.accent}22; }
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
  background: ${p => p.bg};
  border: 2px solid rgb(247, 247, 251);
  cursor: pointer;
  &:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.35); }
`;

const FlatImg = styled.img`
  width: 100%;
  height: 185px;
  object-fit: cover;
  display: block;
`;

/* ── Estado vacío ────────────────────────────────────────────── */

const EmptyState = styled.div`
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; min-height: 40vh; gap: 14px; text-align: center;
`;

/* ── Componente principal ────────────────────────────────────── */

export default function De() {
  const { nombre }      = useParams();
  const navigate        = useNavigate();
  const { theme }       = useContext(ThemeContext);

  const [arts,       setArts]      = useState([]);
  const [cargando,   setCarg]      = useState(true);
  const [error,      setError]     = useState(null);
  const [detalle,    setDetalle]   = useState(null);
  const [lb,         setLb]        = useState(null); // { imgs, idx }
  const [vistaPlana, setVistaPlana] = useState(false);

  const acc = theme.accent    || '#667eea';
  const bg  = theme.modalBg   || '#1a1a1a';
  const pageBg = theme.background || '#000';
  const txt = getContrast(pageBg);

  useEffect(() => {
    setCarg(true);
    fetch(`${API_URL}/api/trasteros/publico/${encodeURIComponent(nombre)}`)
      .then(r => r.ok ? r.json() : Promise.reject('Error'))
      .then(data => { setArts(data); setCarg(false); })
      .catch(() => { setError('No se pudo cargar el trastero'); setCarg(false); });
  }, [nombre]);

  // Lightbox keyboard
  useEffect(() => {
    if (!lb) return;
    const handler = (e) => {
      if (e.key === 'Escape') setLb(null);
      if (e.key === 'ArrowRight') setLb(p => p.idx < p.imgs.length - 1 ? { ...p, idx: p.idx + 1 } : p);
      if (e.key === 'ArrowLeft')  setLb(p => p.idx > 0 ? { ...p, idx: p.idx - 1 } : p);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lb]);

  const openLb = (task, i) => {
    const imgs = [task.Imagen1, task.Imagen2, task.Imagen3, task.Imagen4]
      .filter(Boolean).map(n => `${task.Ruta}/${n}`);
    setLb({ imgs, idx: i });
  };

  return (
    <PageWrapper>

      {/* ── Lightbox ── */}
      {lb && (
        <LbOverlay onClick={() => setLb(null)}>
          <LbClose onClick={() => setLb(null)}>✕</LbClose>
          <LbNav prev disabled={lb.idx === 0}
            onClick={e => { e.stopPropagation(); setLb(p => ({ ...p, idx: p.idx - 1 })); }}>‹</LbNav>
          <LbImg src={lb.imgs[lb.idx]} alt="" onClick={e => e.stopPropagation()} />
          <LbNav disabled={lb.idx === lb.imgs.length - 1}
            onClick={e => { e.stopPropagation(); setLb(p => ({ ...p, idx: p.idx + 1 })); }}>›</LbNav>
          {lb.imgs.length > 1 && (
            <LbDots onClick={e => e.stopPropagation()}>
              {lb.imgs.map((_, i) => (
                <LbDot key={i} active={i === lb.idx} onClick={() => setLb(p => ({ ...p, idx: i }))} />
              ))}
            </LbDots>
          )}
        </LbOverlay>
      )}

      {/* ── Modal detalle ── */}
      {detalle && (
        <Overlay onClick={() => setDetalle(null)}>
          <DetailBox bg={bg} onClick={e => e.stopPropagation()}>
            <DetailClose bg={bg} onClick={() => setDetalle(null)}>✕</DetailClose>
            <DetailTitle color={getContrast(bg)}>{detalle.Nombre}</DetailTitle>

            {detalle.Precio !== null && detalle.Precio !== undefined && (
              <DetailPrice accent={acc}>
                {detalle.Precio.toLocaleString('es-ES', { minimumFractionDigits: 0 })} €
              </DetailPrice>
            )}

            {(detalle.Categoria || detalle.Subcategoria || detalle.Negociable || detalle.AceptaCambio || formatExtra(detalle.Extras)) && (
              <DetailMeta>
                {detalle.Subcategoria && <MetaTag accent={acc}>{detalle.Subcategoria}</MetaTag>}
                {!detalle.Subcategoria && detalle.Categoria && <MetaTag accent={acc}>{detalle.Categoria}</MetaTag>}
                {formatExtra(detalle.Extras) && <MetaTag accent={acc}>{formatExtra(detalle.Extras)}</MetaTag>}
                {detalle.Negociable   && <MetaTag accent={acc}>Negociable</MetaTag>}
                {detalle.AceptaCambio && <MetaTag accent={acc}>Acepta cambio</MetaTag>}
              </DetailMeta>
            )}

            {detalle.Descripcion && (
              <DetailDesc color={getContrast(bg)}>{detalle.Descripcion}</DetailDesc>
            )}

            <DetailGrid
              ruta={detalle.Ruta}
              imgs={[detalle.Imagen1, detalle.Imagen2, detalle.Imagen3, detalle.Imagen4]}
              onImgClick={i => openLb(detalle, i)}
            />
          </DetailBox>
        </Overlay>
      )}

      {/* ── Header ── */}
      <HeaderCard bg={bg} accent={acc}>
        <HeaderLeft>
          <HeaderMeta>
            <TrasteroName bg={bg}>🏠 {nombre}</TrasteroName>
            {!cargando && (
              <TrasteroSub bg={bg}>
                {arts.length} {arts.length === 1 ? 'artículo' : 'artículos'}
              </TrasteroSub>
            )}
          </HeaderMeta>
        </HeaderLeft>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {arts.length > 0 && (
            <ToggleBtn accent={acc} onClick={() => setVistaPlana(v => !v)}
              title={vistaPlana ? 'Ver en grupo' : 'Ver todas las imágenes'}>
              {vistaPlana ? (
                <><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="1" y="1" width="6" height="6" rx="1"/>
                  <rect x="9" y="1" width="6" height="6" rx="1"/>
                  <rect x="1" y="9" width="6" height="6" rx="1"/>
                  <rect x="9" y="9" width="6" height="6" rx="1"/>
                </svg>Grupo</>
              ) : (
                <><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="1" y="2" width="14" height="2" rx="1"/>
                  <rect x="1" y="7" width="14" height="2" rx="1"/>
                  <rect x="1" y="12" width="14" height="2" rx="1"/>
                </svg>Todas</>
              )}
            </ToggleBtn>
          )}
          <BackBtn accent={acc} onClick={() => navigate(-1)}>← Volver</BackBtn>
        </div>
      </HeaderCard>

      {/* ── Contenido ── */}
      {cargando ? (
        <EmptyState>
          <div style={{ fontSize: 48 }}>⏳</div>
          <p style={{ color: txt, margin: 0 }}>Cargando...</p>
        </EmptyState>
      ) : error ? (
        <EmptyState>
          <div style={{ fontSize: 48 }}>❌</div>
          <p style={{ color: txt, margin: 0 }}>{error}</p>
        </EmptyState>
      ) : arts.length === 0 ? (
        <EmptyState>
          <div style={{ fontSize: 64 }}>📦</div>
          <p style={{ color: txt, fontSize: 18, fontWeight: 700, margin: 0 }}>Este trastero está vacío</p>
          <p style={{ color: txt + '88', margin: 0 }}>Aún no hay artículos publicados</p>
        </EmptyState>
      ) : vistaPlana ? (
        <FlatGrid>
          {arts.flatMap(task =>
            [task.Imagen1, task.Imagen2, task.Imagen3, task.Imagen4]
              .filter(Boolean)
              .map((img, i) => {
                const allImgs = [task.Imagen1, task.Imagen2, task.Imagen3, task.Imagen4]
                  .filter(Boolean).map(n => `${task.Ruta}/${n}`);
                return (
                  <FlatCard key={`${task.id}-${i}`} bg={bg}
                    onClick={() => setLb({ imgs: allImgs, idx: i })}>
                    <FlatImg src={`${task.Ruta}/${img}`} alt={task.Nombre} loading="lazy" />
                    <CardInfo>
                      <CardNombre color={getContrast(bg)}>{task.Nombre}</CardNombre>
                      {task.Precio !== null && task.Precio !== undefined && (
                        <CardPrice accent={acc}>
                          {task.Precio.toLocaleString('es-ES', { minimumFractionDigits: 0 })} €
                        </CardPrice>
                      )}
                    </CardInfo>
                  </FlatCard>
                );
              })
          )}
        </FlatGrid>
      ) : (
        <Grid>
          {arts.map(task => (
            <TrasteroCard
              key={task.id}
              task={task}
              theme={theme}
              onOpen={t => setDetalle(t)}
            />
          ))}
        </Grid>
      )}

    </PageWrapper>
  );
}
