import React from 'react';

/**
 * PreviewGrid — previsualización de imágenes en modales de subida/edición.
 *
 * Props:
 *   slots {Array<{preview: string}|null>} — array de slots; los null se filtran
 *
 * Alturas: 1→140px  2→110px  3-4→90px
 */

const IMG_BASE = { objectFit: 'cover', border: '2px solid rgb(247 247 251)' };
const GRID2    = { display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%', borderRadius: 8, overflow: 'hidden' };

export default function PreviewGrid({ slots }) {
  const imgs = slots.filter(Boolean).map(s => s.preview);
  const n    = imgs.length;

  if (n === 0) return null;

  if (n === 1) return (
    <img src={imgs[0]} alt="" style={{ ...IMG_BASE, width: '100%', height: 140, borderRadius: 8 }} />
  );

  if (n === 2) return (
    <div style={GRID2}>
      {imgs.map((src, i) => <img key={i} src={src} alt="" style={{ ...IMG_BASE, width: '100%', height: 110 }} />)}
    </div>
  );

  if (n === 3) return (
    <div style={GRID2}>
      <img src={imgs[0]} alt="" style={{ ...IMG_BASE, width: '100%', height: 90 }} />
      <img src={imgs[1]} alt="" style={{ ...IMG_BASE, width: '100%', height: 90 }} />
      <img src={imgs[2]} alt="" style={{ ...IMG_BASE, gridColumn: '1/3', width: '100%', height: 90 }} />
    </div>
  );

  return (
    <div style={GRID2}>
      {imgs.map((src, i) => <img key={i} src={src} alt="" style={{ ...IMG_BASE, width: '100%', height: 90 }} />)}
    </div>
  );
}
