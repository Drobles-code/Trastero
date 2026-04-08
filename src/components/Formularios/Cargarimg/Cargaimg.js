import React, { Component } from 'react';
import '../Cargarimg/Cargaimg.css';
import { Link } from 'react-router-dom';

const IMG_BASE = {
  objectFit: 'cover',
};

const GRID_STYLE = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  width: '244px',
};

export function AdaptiveGrid({ ruta, imgs, width }) {
  // imgs = array de filenames, filtradas las vacías
  const gridStyle = width ? { ...GRID_STYLE, width } : GRID_STYLE;
  const srcs = imgs.filter(Boolean).map(name => `${ruta}/${name}`);
  const n = srcs.length;

  if (n === 0) return null;

  if (n === 1) {
    return (
      <div style={gridStyle}>
        <img src={srcs[0]} alt="" loading="lazy"
          style={{ ...IMG_BASE, gridColumn: '1/3', gridRow: '1/3', width: '100%', height: '168px', borderRadius: '0 0 8px 8px' }} />
      </div>
    );
  }

  if (n === 2) {
    return (
      <div style={gridStyle}>
        <img src={srcs[0]} alt="" loading="lazy" style={{ ...IMG_BASE, gridColumn: '1/2', gridRow: '1/3', width: '100%', height: '168px', borderRadius: '0 0 0 8px' }} />
        <img src={srcs[1]} alt="" loading="lazy" style={{ ...IMG_BASE, gridColumn: '2/3', gridRow: '1/3', width: '100%', height: '168px', borderRadius: '0 0 8px 0' }} />
      </div>
    );
  }

  if (n === 3) {
    return (
      <div style={gridStyle}>
        <img src={srcs[0]} alt="" loading="lazy" style={{ ...IMG_BASE, width: '100%', height: '84px' }} />
        <img src={srcs[1]} alt="" loading="lazy" style={{ ...IMG_BASE, width: '100%', height: '84px' }} />
        <img src={srcs[2]} alt="" loading="lazy"
          style={{ ...IMG_BASE, gridColumn: '1/3', width: '100%', height: '84px', borderRadius: '0 0 8px 8px' }} />
      </div>
    );
  }

  // 4 imágenes — grid estándar 2×2
  return (
    <div style={gridStyle}>
      <img src={srcs[0]} alt="" loading="lazy" style={{ ...IMG_BASE, width: '100%', height: '84px' }} />
      <img src={srcs[1]} alt="" loading="lazy" style={{ ...IMG_BASE, width: '100%', height: '84px' }} />
      <img src={srcs[2]} alt="" loading="lazy" style={{ ...IMG_BASE, width: '100%', height: '84px', borderRadius: '0 0 0 8px' }} />
      <img src={srcs[3]} alt="" loading="lazy" style={{ ...IMG_BASE, width: '100%', height: '84px', borderRadius: '0 0 8px 0' }} />
    </div>
  );
}
