import React, { Component } from 'react';
import '../Cargarimg/Cargaimg.css';
import { Link } from 'react-router-dom';

const IMG_BASE = {
  objectFit: 'cover',
  border: '2px solid rgb(247 247 251)',
};

const GRID_STYLE = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  width: '244px',
};

function AdaptiveGrid({ ruta, imgs, thumbs, width }) {
  // thumbs = array de filenames WebP para previsualización rápida (fallback a imgs)
  const gridStyle = width ? { ...GRID_STYLE, width } : GRID_STYLE;
  const display = (thumbs && thumbs.length ? thumbs : imgs);
  const srcs = display.filter(Boolean).map(name => `${ruta}/${name}`);
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
          style={{ ...IMG_BASE, gridColumn: '1/3', width: '100%', height: '84px', marginTop: '-4px', borderRadius: '0 0 8px 8px' }} />
      </div>
    );
  }

  // 4 imágenes — grid estándar 2×2
  return (
    <div style={gridStyle}>
      <img src={srcs[0]} alt="" loading="lazy" style={{ ...IMG_BASE, width: '100%', height: '84px' }} />
      <img src={srcs[1]} alt="" loading="lazy" style={{ ...IMG_BASE, width: '100%', height: '84px' }} />
      <img src={srcs[2]} alt="" loading="lazy" style={{ ...IMG_BASE, width: '100%', height: '84px', marginTop: '-4px', borderRadius: '0 0 0 8px' }} />
      <img src={srcs[3]} alt="" loading="lazy" style={{ ...IMG_BASE, width: '100%', height: '84px', marginTop: '-4px', borderRadius: '0 0 8px 0' }} />
    </div>
  );
}

class Cargaimg extends Component {
  render() {
    const { task } = this.props;
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
    const isOwner = currentUserId && task.usuario_id === currentUserId;
    const linkTo  = isOwner ? '/mi-trastero' : `/De/${task.trastero_nombre}`;

    return (
      <Link to={linkTo}>
        <div className="container" align="center" id={task.id}>
          <article className="location-listing">
            <div className="backgroundTitle">
              <p className="titulo-tras">
                <img
                  className="img-titulo-tras"
                  src={`${task.Ruta}/${task.Thumb1 || task.Imagen1}`}
                  alt={task.Nombre}
                  loading="lazy"
                />
                {task.Nombre}
              </p>
            </div>
            <AdaptiveGrid ruta={task.Ruta} imgs={imgs} thumbs={thumbs} />
          </article>
        </div>
      </Link>
    );
  }
}

export default Cargaimg;
