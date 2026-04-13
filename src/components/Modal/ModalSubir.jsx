import React, { useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';
import { CategoriasContext } from '../../context/CategoriasContext';
import { CAMPOS_EXTRA } from '../../constants/categorias';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const getContrast = (hex) => {
  const h = (hex || '#000000').replace('#', '');
  const r = parseInt(h.substr(0, 2), 16);
  const g = parseInt(h.substr(2, 2), 16);
  const b = parseInt(h.substr(4, 2), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5 ? '#000000' : '#ffffff';
};

const Overlay = styled.div`
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.75);
  display: flex; align-items: center; justify-content: center;
  z-index: 2000; padding: 20px;
`;
const Box = styled.div`
  background: ${p => p.bg};
  border: 1px solid ${p => p.accent}44;
  border-radius: 14px; padding: 32px 28px 28px;
  width: 100%; max-width: 680px; max-height: 90vh;
  overflow-y: auto; position: relative;
  display: flex; flex-direction: column; gap: 14px;
`;
const CloseBtn = styled.button`
  position: absolute; top: 12px; right: 12px;
  background: rgba(255,255,255,0.1); border: none; color: #fff;
  font-size: 18px; width: 32px; height: 32px; border-radius: 50%;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  &:hover { background: rgba(255,255,255,0.2); }
`;
const Title = styled.h2`
  color: ${p => p.color}; font-size: 20px; font-weight: 700;
  margin: 0; padding-right: 36px;
`;
const Label = styled.label`
  color: ${p => p.color}; font-size: 13px; font-weight: 600; opacity: 0.8;
`;
const Input = styled.input`
  background: ${p => p.bg}; color: ${p => p.color};
  border: 1px solid ${p => p.accent}55; border-radius: 8px;
  padding: 10px 14px; font-size: 14px; outline: none;
  width: 100%; box-sizing: border-box;
  &:focus { border-color: ${p => p.accent}; }
  &[type=number] { -moz-appearance: textfield; }
  &[type=number]::-webkit-outer-spin-button,
  &[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
`;
const Select = styled.select`
  background: ${p => p.bg}; color: ${p => p.color};
  border: 1px solid ${p => p.accent}55; border-radius: 8px;
  padding: 10px 14px; font-size: 14px; outline: none;
  width: 100%; box-sizing: border-box; cursor: pointer;
  &:focus { border-color: ${p => p.accent}; }
  option { background: ${p => p.bg}; color: ${p => p.color}; }
`;
const Textarea = styled.textarea`
  background: ${p => p.bg}; color: ${p => p.color};
  border: 1px solid ${p => p.accent}55; border-radius: 8px;
  padding: 10px 14px; font-size: 14px; outline: none;
  width: 100%; box-sizing: border-box; resize: vertical; min-height: 72px;
  font-family: inherit; line-height: 1.5;
  &:focus { border-color: ${p => p.accent}; }
`;
const Row2 = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
`;
const PriceWrap = styled.div`
  position: relative;
  span { position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    color: ${p => p.color}; opacity: 0.5; font-size: 14px; pointer-events: none; }
`;
const ToggleRow = styled.div`
  display: flex; gap: 10px; flex-wrap: wrap;
`;
const TogglePill = styled.label`
  display: flex; align-items: center; gap: 8px; cursor: pointer;
  background: ${p => p.checked ? p.accent : p.accent + '22'};
  border: 1px solid ${p => p.checked ? p.accent : p.accent + '44'};
  border-radius: 20px; padding: 6px 14px; transition: all 0.2s;
  color: ${p => p.checked ? '#fff' : p.accent};
  font-size: 13px; font-weight: 600; user-select: none;
  input { display: none; }
  &:hover { background: ${p => p.checked ? p.accent : p.accent + '33'}; border-color: ${p => p.accent}; }
`;
const Dot = styled.span`
  width: 8px; height: 8px; border-radius: 50%;
  background: ${p => p.checked ? '#fff' : p.accent};
  transition: background 0.2s;
`;
const ExtraGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
`;
const SlotsRow = styled.div`display: flex; gap: 10px; flex-wrap: wrap;`;
const Slot = styled.div`
  position: relative; width: 80px; height: 80px;
  border: 2px dashed ${p => p.filled ? p.accent : p.accent + '55'};
  border-radius: 8px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; overflow: hidden;
  background: ${p => p.filled ? 'transparent' : p.bg};
  flex-shrink: 0; transition: border-color 0.2s;
  &:hover { border-color: ${p => p.accent}; }
`;
const SlotImg = styled.img`width: 100%; height: 100%; object-fit: cover;`;
const PlusIcon = styled.span`font-size: 28px; color: ${p => p.color}; opacity: 0.4; line-height: 1;`;
const PrimaryBadge = styled.div`
  position: absolute; bottom: 3px; left: 3px;
  background: ${p => p.accent}; color: #fff; font-size: 9px; font-weight: 700;
  padding: 2px 5px; border-radius: 4px; pointer-events: none; letter-spacing: 0.3px;
`;
const RemoveBtn = styled.button`
  position: absolute; top: 2px; right: 2px;
  background: rgba(0,0,0,0.6); color: #fff; border: none; border-radius: 50%;
  width: 20px; height: 20px; font-size: 11px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  &:hover { background: #e74c3c; }
`;
const PreviewWrap = styled.div`display: flex; flex-direction: column; gap: 8px;`;
const PlaceholderPrev = styled.div`
  height: 100px; display: flex; align-items: center; justify-content: center;
  border: 2px dashed ${p => p.accent}44; border-radius: 8px;
  color: ${p => p.color}; font-size: 13px; opacity: 0.5;
`;
const IMG_BASE = { objectFit: 'cover', border: '2px solid rgb(247 247 251)' };
const GRID2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%', borderRadius: 8, overflow: 'hidden' };
function PreviewGrid({ slots }) {
  const imgs = slots.filter(Boolean).map(s => s.preview);
  const n = imgs.length;
  if (n === 0) return null;
  if (n === 1) return <img src={imgs[0]} alt="" style={{ ...IMG_BASE, width: '100%', height: 140, borderRadius: 8 }} />;
  if (n === 2) return <div style={GRID2}>{imgs.map((src,i) => <img key={i} src={src} alt="" style={{ ...IMG_BASE, width: '100%', height: 110 }} />)}</div>;
  if (n === 3) return <div style={GRID2}><img src={imgs[0]} alt="" style={{ ...IMG_BASE, width: '100%', height: 90 }} /><img src={imgs[1]} alt="" style={{ ...IMG_BASE, width: '100%', height: 90 }} /><img src={imgs[2]} alt="" style={{ ...IMG_BASE, gridColumn: '1/3', width: '100%', height: 90 }} /></div>;
  return <div style={GRID2}>{imgs.map((src,i) => <img key={i} src={src} alt="" style={{ ...IMG_BASE, width: '100%', height: 90 }} />)}</div>;
}
const ErrorMsg = styled.p`
  color: #e74c3c; font-size: 13px; margin: 0;
  padding: 10px 14px; background: #e74c3c22; border-radius: 6px;
`;
const PublishBtn = styled.button`
  background: ${p => p.accent}; color: #fff; border: none; border-radius: 8px;
  padding: 14px; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.2s;
  &:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;
const Divider = styled.hr`border: none; border-top: 1px solid ${p => p.accent}22; margin: 2px 0;`;

function ModalSubir({ isOpen, onClose, onPublicado, trasteroId }) {
  const { theme }    = useContext(ThemeContext);
  const categoriasDB = useContext(CategoriasContext);
  const bg  = theme.modalBg || '#1a1a1a';
  const acc = theme.accent;
  const txt = getContrast(bg);

  const [nombre,       setNombre]       = useState('');
  const [categoria,    setCategoria]    = useState('');
  const [subcategoria, setSubcategoria] = useState('');
  const [descripcion,  setDescripcion]  = useState('');
  const [precio,       setPrecio]       = useState('');
  const [negociable,   setNegociable]   = useState(false);
  const [aceptaCambio, setAceptaCambio] = useState(false);
  const [extras,       setExtras]       = useState({});
  const [slots,        setSlots]        = useState([null, null, null, null]);
  const [cargando,     setCargando]     = useState(false);
  const [error,        setError]        = useState('');

  const ref0 = useRef(); const ref1 = useRef();
  const ref2 = useRef(); const ref3 = useRef();
  const inputRefs = [ref0, ref1, ref2, ref3];

  if (!isOpen) return null;

  const catSubs  = ((categoriasDB.find(c => c.nombre === categoria) || {}).subs || []).map(s => s.nombre);
  const camposEx = CAMPOS_EXTRA[categoria] || [];

  const reset = () => {
    slots.forEach(s => s && URL.revokeObjectURL(s.preview));
    setSlots([null, null, null, null]);
    setNombre(''); setCategoria(''); setSubcategoria('');
    setDescripcion(''); setPrecio('');
    setNegociable(false); setAceptaCambio(false); setExtras({});
    setError('');
  };

  const handleClose = () => { reset(); onClose(); };

  const handleFileChange = (idx, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setSlots(prev => {
      const next = [...prev];
      if (next[idx]) URL.revokeObjectURL(next[idx].preview);
      next[idx] = { file, preview };
      return next;
    });
    e.target.value = '';
  };

  const handleRemove = (idx) => {
    setSlots(prev => {
      const next = [...prev];
      if (next[idx]) URL.revokeObjectURL(next[idx].preview);
      next[idx] = null;
      return next;
    });
  };

  const handleSubmit = async () => {
    const filled = slots.filter(Boolean);
    if (!nombre.trim())     { setError('Ponle un nombre al artículo'); return; }
    if (filled.length === 0){ setError('Añade al menos una imagen'); return; }

    setCargando(true); setError('');

    const formData = new FormData();
    formData.append('trastero_id',  trasteroId);
    formData.append('nombre',       nombre.trim());
    formData.append('categoria',    categoria);
    formData.append('subcategoria', subcategoria);
    formData.append('descripcion',  descripcion.trim());
    formData.append('precio',       precio);
    formData.append('negociable',   String(negociable));
    formData.append('acepta_cambio', String(aceptaCambio));
    // Campos extra
    Object.entries(extras).forEach(([k, v]) => { if (v !== '') formData.append(k, v); });
    filled.forEach(img => formData.append('imagenes', img.file));

    try {
      const res = await fetch(`${API_URL}/api/trasteros`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('trastero_token')}` },
        body: formData,
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Error al publicar'); }
      const nuevo = await res.json();
      reset(); onPublicado(nuevo); onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Overlay>
      <Box bg={bg} accent={acc} onClick={e => e.stopPropagation()}>
        <CloseBtn onClick={handleClose}>✕</CloseBtn>
        <Title color={txt}>Nuevo artículo</Title>

        {/* Categoría + Subcategoría en fila */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <Label color={txt}>Categoría</Label>
            <Select bg={bg} color={txt} accent={acc} value={categoria}
              onChange={e => { setCategoria(e.target.value); setSubcategoria(''); setExtras({}); }}>
              <option value="">Selecciona una categoría</option>
              {categoriasDB.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
            </Select>
          </div>
          {catSubs.length > 0 && (
            <div style={{ flex: 1 }}>
              <Label color={txt}>Subcategoría</Label>
              <Select bg={bg} color={txt} accent={acc} value={subcategoria}
                onChange={e => setSubcategoria(e.target.value)}>
                <option value="">Selecciona subcategoría</option>
                {catSubs.map(s => <option key={s} value={s}>{s}</option>)}
              </Select>
            </div>
          )}
        </div>

        {/* Campos extra dinámicos */}
        {camposEx.length > 0 && <>
          <Label color={txt}>Detalles de {categoria}</Label>
          <ExtraGrid>
            {camposEx.map(campo => (
              <div key={campo.key}>
                <Label color={txt} style={{ fontSize: 11 }}>{campo.label}{campo.unit ? ` (${campo.unit})` : ''}</Label>
                {campo.type === 'select' ? (
                  <Select bg={bg} color={txt} accent={acc}
                    value={extras[campo.key] || ''}
                    onChange={e => setExtras(prev => ({ ...prev, [campo.key]: e.target.value }))}
                    style={{ marginTop: 4 }}>
                    <option value="">—</option>
                    {campo.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </Select>
                ) : (
                  <Input bg={bg} color={txt} accent={acc} type="number"
                    placeholder={campo.placeholder}
                    value={extras[campo.key] || ''}
                    onChange={e => setExtras(prev => ({ ...prev, [campo.key]: e.target.value }))}
                    style={{ marginTop: 4 }} />
                )}
              </div>
            ))}
          </ExtraGrid>
        </>}

        <Divider accent={acc} />

        {/* Nombre */}
        <Label color={txt}>Título del anuncio</Label>
        <Input bg={bg} color={txt} accent={acc}
          value={nombre}
          onChange={e => { setNombre(e.target.value); setError(''); }}
          placeholder="Ej: Ford Ecosport 2.0 XLT 2007 Gasolina"
          maxLength={120} />

        {/* Descripción */}
        <Label color={txt}>Descripción</Label>
        <Textarea bg={bg} color={txt} accent={acc}
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          placeholder="Ford Ecosport 2.0 XLT 2007, Gasolina, 187.000 km, ITV en vigor hasta 2026, dos llaves, revisiones al día en concesionario oficial..." />

        {/* Precio + Toggles en misma fila (apilan en móvil) */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 120px', minWidth: 100 }}>
            <Label color={txt}>Precio</Label>
            <PriceWrap color={txt}>
              <Input bg={bg} color={txt} accent={acc} type="number"
                value={precio} onChange={e => setPrecio(e.target.value)}
                placeholder="0" min="0" step="1" style={{ paddingRight: 32 }} />
              <span>€</span>
            </PriceWrap>
          </div>
          <ToggleRow style={{ flex: '1 1 auto', justifyContent: 'flex-end', marginBottom: '2px' }}>
            <TogglePill checked={negociable} accent={acc} color={txt}
              onClick={() => setNegociable(v => !v)}>
              <Dot checked={negociable} accent={acc} color={txt} />
              Negociable
            </TogglePill>
            <TogglePill checked={aceptaCambio} accent={acc} color={txt}
              onClick={() => setAceptaCambio(v => !v)}>
              <Dot checked={aceptaCambio} accent={acc} color={txt} />
              Acepto cambio
            </TogglePill>
          </ToggleRow>
        </div>

        <Divider accent={acc} />

        {/* Imágenes */}
        <Label color={txt}>Imágenes (máx. 4)</Label>
        <SlotsRow>
          {[0,1,2,3].map(idx => (
            <Slot key={idx} filled={!!slots[idx]} accent={acc} bg={bg}
              onClick={() => inputRefs[idx].current.click()}
              title={slots[idx] ? 'Cambiar imagen' : 'Añadir imagen'}>
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
              <input ref={inputRefs[idx]} type="file" accept="image/*"
                style={{ display: 'none' }} onChange={e => handleFileChange(idx, e)} />
            </Slot>
          ))}
        </SlotsRow>

        <PreviewWrap>
          <Label color={txt}>Vista previa</Label>
          {slots.some(Boolean)
            ? <PreviewGrid slots={slots} />
            : <PlaceholderPrev accent={acc} color={txt}>Las imágenes aparecerán aquí</PlaceholderPrev>
          }
        </PreviewWrap>

        {error && <ErrorMsg>{error}</ErrorMsg>}

        <PublishBtn accent={acc} onClick={handleSubmit} disabled={cargando}>
          {cargando ? 'Publicando...' : '+ Publicar artículo'}
        </PublishBtn>
      </Box>
    </Overlay>
  );
}

export default ModalSubir;
