import React from 'react';

/**
 * AdaptiveGrid — muestra 1-4 imágenes en disposición 2×2 para tarjetas.
 *
 * Props:
 *   ruta    {string}   — base URL de las imágenes
 *   imgs    {string[]} — nombres de archivo (hasta 4)
 *   thumbs  {string[]} — versiones WebP de previsualización rápida (opcional)
 *   srcs    {string[]} — URLs directas (alternativa a ruta+imgs, p.ej. data URLs de preview)
 *   width   {string}   — ancho del grid (por defecto '244px')
 */

const IMG_BASE = { objectFit: 'cover', border: '2px solid rgb(247 247 251)' };
const GRID_BASE = { display: 'grid', gridTemplateColumns: '1fr 1fr' };

export default function AdaptiveGrid({ ruta, imgs, thumbs, srcs: srcsProp, width = '244px' }) {
  const gridStyle = { ...GRID_BASE, width };
  let srcs;
  if (srcsProp) {
    srcs = srcsProp.filter(Boolean);
  } else {
    const display = thumbs && thumbs.length ? thumbs : imgs;
    srcs          = display.filter(Boolean).map(name => `${ruta}/${name}`);
  }
  const n         = srcs.length;

  if (n === 0) return null;

  if (n === 1) return (
    <div style={gridStyle}>
      <img src={srcs[0]} alt="" loading="lazy"
        style={{ ...IMG_BASE, gridColumn: '1/3', gridRow: '1/3', width: '100%', height: '168px', borderRadius: '0 0 8px 8px' }} />
    </div>
  );

  if (n === 2) return (
    <div style={gridStyle}>
      <img src={srcs[0]} alt="" loading="lazy" style={{ ...IMG_BASE, gridColumn: '1/2', gridRow: '1/3', width: '100%', height: '168px', borderRadius: '0 0 0 8px' }} />
      <img src={srcs[1]} alt="" loading="lazy" style={{ ...IMG_BASE, gridColumn: '2/3', gridRow: '1/3', width: '100%', height: '168px', borderRadius: '0 0 8px 0' }} />
    </div>
  );

  if (n === 3) return (
    <div style={gridStyle}>
      <img src={srcs[0]} alt="" loading="lazy" style={{ ...IMG_BASE, width: '100%', height: '84px' }} />
      <img src={srcs[1]} alt="" loading="lazy" style={{ ...IMG_BASE, width: '100%', height: '84px' }} />
      <img src={srcs[2]} alt="" loading="lazy"
        style={{ ...IMG_BASE, gridColumn: '1/3', width: '100%', height: '84px', marginTop: '-4px', borderRadius: '0 0 8px 8px' }} />
    </div>
  );

  return (
    <div style={gridStyle}>
      <img src={srcs[0]} alt="" loading="lazy" style={{ ...IMG_BASE, width: '100%', height: '84px' }} />
      <img src={srcs[1]} alt="" loading="lazy" style={{ ...IMG_BASE, width: '100%', height: '84px' }} />
      <img src={srcs[2]} alt="" loading="lazy" style={{ ...IMG_BASE, width: '100%', height: '84px', marginTop: '-4px', borderRadius: '0 0 0 8px' }} />
      <img src={srcs[3]} alt="" loading="lazy" style={{ ...IMG_BASE, width: '100%', height: '84px', marginTop: '-4px', borderRadius: '0 0 8px 0' }} />
    </div>
  );
}
