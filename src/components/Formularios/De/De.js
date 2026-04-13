import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../context/ThemeContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const getContrast = (hex) => {
  const h = (hex || '#000000').replace('#', '');
  const r = parseInt(h.substr(0,2),16), g = parseInt(h.substr(2,2),16), b = parseInt(h.substr(4,2),16);
  return (0.299*r + 0.587*g + 0.114*b)/255 > 0.5 ? '#000000' : '#ffffff';
};

/* ── Styled ─────────────────────────────────────────────────── */
const Page = styled.div`
  max-width: 860px;
  margin: 0 auto;
  padding: 32px 20px;
`;

const BackBtn = styled.button`
  background: none;
  border: 1px solid ${p => p.accent}44;
  color: ${p => p.accent};
  padding: 6px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 24px;
  &:hover { background: ${p => p.accent}22; }
`;

const Title = styled.h1`
  color: ${p => p.color};
  font-size: 28px;
  font-weight: 800;
  margin: 0 0 8px;
`;

const Meta = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 16px;
`;

const Badge = styled.span`
  background: ${p => p.accent}22;
  border: 1px solid ${p => p.accent}44;
  color: ${p => p.accent};
  border-radius: 20px;
  padding: 3px 12px;
  font-size: 13px;
`;

const Price = styled.div`
  color: ${p => p.accent};
  font-size: 26px;
  font-weight: 800;
  margin-bottom: 12px;
`;

const Desc = styled.p`
  color: ${p => p.color};
  opacity: 0.85;
  line-height: 1.6;
  margin: 0 0 20px;
`;

const GRID2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', borderRadius: 10, overflow: 'hidden', marginBottom: 24 };
const IMG_BASE = { objectFit: 'cover', border: '2px solid rgb(247 247 251)', cursor: 'zoom-in' };

function ImageGrid({ ruta, imgs, onImgClick }) {
  const srcs = imgs.filter(Boolean).map(n => `${ruta}/${n}`);
  const n = srcs.length;
  if (n === 0) return null;
  if (n === 1) return (
    <img src={srcs[0]} alt="" onClick={() => onImgClick(0)}
      style={{ ...IMG_BASE, width: '100%', height: 380, borderRadius: 10, marginBottom: 24, display: 'block' }} />
  );
  if (n === 2) return (
    <div style={GRID2}>
      <img src={srcs[0]} alt="" onClick={() => onImgClick(0)} style={{ ...IMG_BASE, width: '100%', height: 300 }} />
      <img src={srcs[1]} alt="" onClick={() => onImgClick(1)} style={{ ...IMG_BASE, width: '100%', height: 300 }} />
    </div>
  );
  if (n === 3) return (
    <div style={GRID2}>
      <img src={srcs[0]} alt="" onClick={() => onImgClick(0)} style={{ ...IMG_BASE, width: '100%', height: 200 }} />
      <img src={srcs[1]} alt="" onClick={() => onImgClick(1)} style={{ ...IMG_BASE, width: '100%', height: 200 }} />
      <img src={srcs[2]} alt="" onClick={() => onImgClick(2)} style={{ ...IMG_BASE, gridColumn: '1/3', width: '100%', height: 200 }} />
    </div>
  );
  return (
    <div style={GRID2}>
      <img src={srcs[0]} alt="" onClick={() => onImgClick(0)} style={{ ...IMG_BASE, width: '100%', height: 200 }} />
      <img src={srcs[1]} alt="" onClick={() => onImgClick(1)} style={{ ...IMG_BASE, width: '100%', height: 200 }} />
      <img src={srcs[2]} alt="" onClick={() => onImgClick(2)} style={{ ...IMG_BASE, width: '100%', height: 200 }} />
      <img src={srcs[3]} alt="" onClick={() => onImgClick(3)} style={{ ...IMG_BASE, width: '100%', height: 200 }} />
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
  max-width: 92vw; max-height: 88vh; object-fit: contain; border-radius: 6px;
  cursor: default;
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

/* ── Main ────────────────────────────────────────────────────── */
export default function De() {
  const { nombre }      = useParams();
  const navigate        = useNavigate();
  const { theme }       = useContext(ThemeContext);
  const [art, setArt]   = useState(null);
  const [error, setErr] = useState(null);
  const [lb, setLb]     = useState(null); // { imgs, idx }

  const acc = theme.accent    || '#667eea';
  const bg  = theme.background|| '#000';
  const txt = getContrast(bg);

  useEffect(() => {
    fetch(`${API_URL}/api/trasteros/${encodeURIComponent(nombre)}`)
      .then(r => r.ok ? r.json() : Promise.reject('No encontrado'))
      .then(setArt)
      .catch(() => setErr('Artículo no encontrado'));
  }, [nombre]);

  const openLb = (i) => {
    if (!art) return;
    const imgs = [art.Imagen1, art.Imagen2, art.Imagen3, art.Imagen4]
      .filter(Boolean).map(n => `${art.Ruta}/${n}`);
    setLb({ imgs, idx: i });
  };

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

  if (error) return (
    <Page>
      <BackBtn accent={acc} onClick={() => navigate(-1)}>← Volver</BackBtn>
      <Title color={txt}>{error}</Title>
    </Page>
  );

  if (!art) return (
    <Page><Title color={txt}>Cargando...</Title></Page>
  );

  const precio = art.Precio !== null && art.Precio !== undefined
    ? art.Precio.toLocaleString('es-ES', { minimumFractionDigits: 0 }) + ' €'
    : null;

  const extras = art.Extras || {};
  const extraTexts = [
    extras.km           && `${Number(extras.km).toLocaleString('es-ES')} km`,
    extras.anio         && `${extras.anio}`,
    extras.combustible  && extras.combustible,
    extras.cv           && `${extras.cv} CV`,
    extras.metros       && `${extras.metros} m²`,
    extras.habitaciones && `${extras.habitaciones} hab.`,
    extras.banos        && `${extras.banos} baños`,
  ].filter(Boolean);

  return (
    <Page>
      <BackBtn accent={acc} onClick={() => navigate(-1)}>← Volver</BackBtn>

      {art.trastero_nombre && (
        <div style={{ color: acc, fontSize: 13, fontWeight: 600, marginBottom: 8, opacity: 0.8 }}>
          🏠 {art.trastero_nombre}
        </div>
      )}

      <Title color={txt}>{art.Nombre}</Title>

      <Meta>
        {art.Categoria   && <Badge accent={acc}>{art.Categoria}</Badge>}
        {art.Subcategoria && <Badge accent={acc}>{art.Subcategoria}</Badge>}
        {extraTexts.map((t, i) => <Badge key={i} accent={acc}>{t}</Badge>)}
        {art.Negociable   && <Badge accent={acc}>Negociable</Badge>}
        {art.AceptaCambio && <Badge accent={acc}>Acepto cambio</Badge>}
      </Meta>

      {precio && <Price accent={acc}>{precio}</Price>}
      {art.Descripcion && <Desc color={txt}>{art.Descripcion}</Desc>}

      <ImageGrid
        ruta={art.Ruta}
        imgs={[art.Imagen1, art.Imagen2, art.Imagen3, art.Imagen4]}
        onImgClick={openLb}
      />

      {lb && (
        <LbOverlay onClick={() => setLb(null)}>
          <LbClose onClick={() => setLb(null)}>✕</LbClose>
          <LbNav prev disabled={lb.idx === 0}
            onClick={e => { e.stopPropagation(); setLb(p => ({ ...p, idx: p.idx - 1 })); }}>‹</LbNav>
          <LbImg src={lb.imgs[lb.idx]} alt="" onClick={e => e.stopPropagation()} />
          <LbNav disabled={lb.idx === lb.imgs.length - 1}
            onClick={e => { e.stopPropagation(); setLb(p => ({ ...p, idx: p.idx + 1 })); }}>›</LbNav>
        </LbOverlay>
      )}
    </Page>
  );
}
