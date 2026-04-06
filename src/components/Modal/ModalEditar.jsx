import React, { useState, useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const getContrast = (hex) => {
  const h = (hex || '#000000').replace('#', '');
  const r = parseInt(h.substr(0, 2), 16);
  const g = parseInt(h.substr(2, 2), 16);
  const b = parseInt(h.substr(4, 2), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5 ? '#000000' : '#ffffff';
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
`;

const Box = styled.div`
  background: ${p => p.bg};
  border: 1px solid ${p => p.accent}44;
  border-radius: 14px;
  padding: 32px 28px 28px;
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255,255,255,0.1);
  border: none;
  color: #fff;
  font-size: 18px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover { background: rgba(255,255,255,0.2); }
`;

const Title = styled.h2`
  color: ${p => p.color};
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  padding-right: 36px;
`;

const Label = styled.label`
  color: ${p => p.color};
  font-size: 13px;
  font-weight: 600;
  opacity: 0.8;
`;

const Input = styled.input`
  background: ${p => p.bg};
  color: ${p => p.color};
  border: 1px solid ${p => p.accent}55;
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 15px;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  &:focus { border-color: ${p => p.accent}; }
`;

const SlotsRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Slot = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border: 2px dashed ${p => p.filled ? p.accent : p.accent + '55'};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  background: ${p => p.filled ? 'transparent' : p.bg};
  flex-shrink: 0;
  transition: border-color 0.2s;
  &:hover { border-color: ${p => p.accent}; }
`;

const SlotImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlusIcon = styled.span`
  font-size: 28px;
  color: ${p => p.color};
  opacity: 0.4;
  line-height: 1;
`;

const PrimaryBadge = styled.div`
  position: absolute;
  bottom: 3px;
  left: 3px;
  background: ${p => p.accent};
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  padding: 2px 5px;
  border-radius: 4px;
  pointer-events: none;
  letter-spacing: 0.3px;
`;

const RemoveBtn = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  background: rgba(0,0,0,0.6);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 11px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover { background: #e74c3c; }
`;

const PreviewWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PlaceholderPrev = styled.div`
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed ${p => p.accent}44;
  border-radius: 8px;
  color: ${p => p.color};
  font-size: 13px;
  opacity: 0.5;
`;

const IMG_BASE = { objectFit: 'cover', border: '2px solid rgb(247 247 251)' };
const GRID2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%', borderRadius: 8, overflow: 'hidden' };

function PreviewGrid({ slots }) {
  const imgs = slots.filter(Boolean).map(s => s.preview);
  const n = imgs.length;
  if (n === 0) return null;
  if (n === 1) return (
    <img src={imgs[0]} alt="preview" style={{ ...IMG_BASE, width: '100%', height: 160, borderRadius: 8 }} />
  );
  if (n === 2) return (
    <div style={GRID2}>
      <img src={imgs[0]} alt="preview" style={{ ...IMG_BASE, width: '100%', height: 120 }} />
      <img src={imgs[1]} alt="preview" style={{ ...IMG_BASE, width: '100%', height: 120 }} />
    </div>
  );
  if (n === 3) return (
    <div style={GRID2}>
      <img src={imgs[0]} alt="preview" style={{ ...IMG_BASE, width: '100%', height: 100 }} />
      <img src={imgs[1]} alt="preview" style={{ ...IMG_BASE, width: '100%', height: 100 }} />
      <img src={imgs[2]} alt="preview" style={{ ...IMG_BASE, gridColumn: '1/3', width: '100%', height: 100 }} />
    </div>
  );
  return (
    <div style={GRID2}>
      <img src={imgs[0]} alt="preview" style={{ ...IMG_BASE, width: '100%', height: 100 }} />
      <img src={imgs[1]} alt="preview" style={{ ...IMG_BASE, width: '100%', height: 100 }} />
      <img src={imgs[2]} alt="preview" style={{ ...IMG_BASE, width: '100%', height: 100 }} />
      <img src={imgs[3]} alt="preview" style={{ ...IMG_BASE, width: '100%', height: 100 }} />
    </div>
  );
}

const ErrorMsg = styled.p`
  color: #e74c3c;
  font-size: 13px;
  margin: 0;
  padding: 10px 14px;
  background: #e74c3c22;
  border-radius: 6px;
`;

const SaveBtn = styled.button`
  background: ${p => p.accent};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 14px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  &:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

function ModalEditar({ isOpen, onClose, onGuardado, trastero }) {
  const { theme } = useContext(ThemeContext);
  const bg  = theme.modalBg || '#1a1a1a';
  const acc = theme.accent;
  const txt = getContrast(bg);

  const [nombre,   setNombre]   = useState('');
  const [slots,    setSlots]    = useState([null, null, null, null]);
  const [cargando, setCargando] = useState(false);
  const [error,    setError]    = useState('');

  const ref0 = useRef(); const ref1 = useRef();
  const ref2 = useRef(); const ref3 = useRef();
  const inputRefs = [ref0, ref1, ref2, ref3];

  // Pre-rellenar cuando se abre con un trastero
  useEffect(() => {
    if (!isOpen || !trastero) return;
    setNombre(trastero.Nombre || '');
    setError('');
    const imgs = [trastero.Imagen1, trastero.Imagen2, trastero.Imagen3, trastero.Imagen4];
    setSlots(imgs.map(img => img
      ? { file: null, preview: `${trastero.Ruta}/${img}`, existente: true }
      : null
    ));
  }, [isOpen, trastero]);

  if (!isOpen || !trastero) return null;

  const reset = () => {
    // Solo revocar URLs de objetos nuevos (no URLs de servidor)
    slots.forEach(s => { if (s && !s.existente) URL.revokeObjectURL(s.preview); });
    setSlots([null, null, null, null]);
    setNombre('');
    setError('');
  };

  const handleClose = () => { reset(); onClose(); };

  const handleFileChange = (idx, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setSlots(prev => {
      const next = [...prev];
      if (next[idx] && !next[idx].existente) URL.revokeObjectURL(next[idx].preview);
      next[idx] = { file, preview, existente: false };
      return next;
    });
    e.target.value = '';
  };

  const handleRemove = (idx) => {
    setSlots(prev => {
      const next = [...prev];
      if (next[idx] && !next[idx].existente) URL.revokeObjectURL(next[idx].preview);
      next[idx] = null;
      return next;
    });
  };

  const handleSubmit = async () => {
    const filled = slots.filter(Boolean);
    if (!nombre.trim()) { setError('Ponle un nombre al artículo'); return; }
    if (filled.length === 0) { setError('Debe haber al menos una imagen'); return; }

    setCargando(true);
    setError('');

    const tieneNuevas = filled.some(s => !s.existente);

    try {
      let res;
      if (tieneNuevas) {
        const formData = new FormData();
        formData.append('nombre', nombre.trim());
        filled.forEach(s => { if (!s.existente) formData.append('imagenes', s.file); });
        res = await fetch(`${API_URL}/api/trasteros/${trastero.id}`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${localStorage.getItem('trastero_token')}` },
          body: formData,
        });
      } else {
        res = await fetch(`${API_URL}/api/trasteros/${trastero.id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('trastero_token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre: nombre.trim() }),
        });
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error al guardar');
      }
      const actualizado = await res.json();
      reset();
      onGuardado(actualizado);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Overlay onClick={handleClose}>
      <Box bg={bg} accent={acc} onClick={e => e.stopPropagation()}>
        <CloseBtn onClick={handleClose}>✕</CloseBtn>
        <Title color={txt}>Editar artículo</Title>

        <Label color={txt}>Nombre del artículo</Label>
        <Input
          bg={bg} color={txt} accent={acc}
          value={nombre}
          onChange={e => { setNombre(e.target.value); setError(''); }}
          placeholder="Ej: Bicicleta de montaña, Mueble vintage..."
          maxLength={80}
        />

        <Label color={txt}>Imágenes (máx. 4)</Label>
        <SlotsRow>
          {[0,1,2,3].map(idx => (
            <Slot
              key={idx}
              filled={!!slots[idx]}
              accent={acc}
              bg={bg}
              onClick={() => inputRefs[idx].current.click()}
              title={slots[idx] ? 'Cambiar imagen' : 'Añadir imagen'}
            >
              {slots[idx] ? (
                <>
                  <SlotImg src={slots[idx].preview} alt={`img ${idx+1}`} />
                  {idx === 0 && <PrimaryBadge accent={acc}>PRINCIPAL</PrimaryBadge>}
                  <RemoveBtn onClick={e => { e.stopPropagation(); handleRemove(idx); }}>✕</RemoveBtn>
                </>
              ) : (
                <>
                  <PlusIcon color={txt}>+</PlusIcon>
                  {idx === 0 && <PrimaryBadge accent={acc} style={{ opacity: 0.4 }}>PRINCIPAL</PrimaryBadge>}
                </>
              )}
              <input
                ref={inputRefs[idx]}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={e => handleFileChange(idx, e)}
              />
            </Slot>
          ))}
        </SlotsRow>

        <PreviewWrap>
          <Label color={txt}>Vista previa</Label>
          {slots.some(Boolean) ? (
            <PreviewGrid slots={slots} />
          ) : (
            <PlaceholderPrev accent={acc} color={txt}>
              Las imágenes aparecerán aquí
            </PlaceholderPrev>
          )}
        </PreviewWrap>

        {error && <ErrorMsg>{error}</ErrorMsg>}

        <SaveBtn accent={acc} onClick={handleSubmit} disabled={cargando}>
          {cargando ? 'Guardando...' : 'Guardar cambios'}
        </SaveBtn>
      </Box>
    </Overlay>
  );
}

export default ModalEditar;
