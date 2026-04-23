import React from 'react';

/**
 * DetailGrid — muestra 1-4 imágenes en grid de detalle (modal / página de detalle).
 *
 * Props:
 *   ruta       {string}    — base URL de las imágenes
 *   imgs       {string[]}  — nombres de archivo (hasta 4)
 *   onImgClick {function}  — callback(index) al hacer clic (opcional; activa cursor zoom-in)
 *   size       {'large'|'medium'} — tamaño de las imágenes (por defecto 'large')
 *     large:  1→320px  2→240px  3-4→160px   (MiTrastero)
 *     medium: 1→300px  2→220px  3-4→160px   (De)
 */

const IMG_BASE = { objectFit: 'cover', border: '2px solid rgb(247 247 251)' };
const GRID2    = { display: 'grid', gridTemplateColumns: '1fr 1fr', borderRadius: 8, overflow: 'hidden' };

const HEIGHTS = {
  large:  { h1: 320, h2: 240, h3: 160 },
  medium: { h1: 300, h2: 220, h3: 160 },
};

export default function DetailGrid({ ruta, imgs, onImgClick, size = 'large' }) {
  const srcs = imgs.filter(Boolean).map(n => `${ruta}/${n}`);
  const n    = srcs.length;
  const { h1, h2, h3 } = HEIGHTS[size] || HEIGHTS.large;

  const click = (i, e) => { if (e) e.stopPropagation(); onImgClick?.(i); };
  const img   = (extra) => ({ ...IMG_BASE, cursor: onImgClick ? 'zoom-in' : 'default', ...extra });

  if (n === 0) return null;

  if (n === 1) return (
    <img src={srcs[0]} alt="" onClick={e => click(0, e)}
      style={img({ width: '100%', height: h1, borderRadius: 8, display: 'block', marginBottom: 0 })} />
  );

  if (n === 2) return (
    <div style={GRID2}>
      <img src={srcs[0]} alt="" onClick={e => click(0, e)} style={img({ width: '100%', height: h2 })} />
      <img src={srcs[1]} alt="" onClick={e => click(1, e)} style={img({ width: '100%', height: h2 })} />
    </div>
  );

  if (n === 3) return (
    <div style={GRID2}>
      <img src={srcs[0]} alt="" onClick={e => click(0, e)} style={img({ width: '100%', height: h3 })} />
      <img src={srcs[1]} alt="" onClick={e => click(1, e)} style={img({ width: '100%', height: h3 })} />
      <img src={srcs[2]} alt="" onClick={e => click(2, e)} style={img({ gridColumn: '1/3', width: '100%', height: h3 })} />
    </div>
  );

  return (
    <div style={GRID2}>
      <img src={srcs[0]} alt="" onClick={e => click(0, e)} style={img({ width: '100%', height: h3 })} />
      <img src={srcs[1]} alt="" onClick={e => click(1, e)} style={img({ width: '100%', height: h3 })} />
      <img src={srcs[2]} alt="" onClick={e => click(2, e)} style={img({ width: '100%', height: h3 })} />
      <img src={srcs[3]} alt="" onClick={e => click(3, e)} style={img({ width: '100%', height: h3 })} />
    </div>
  );
}
