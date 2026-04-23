import React, { useState, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { API_URL } from '../utils/api';
import { getContrastColor as getContrast } from '../utils/colorUtils';
import AdaptiveGrid from '../components/ImageGrid/AdaptiveGrid';

/* ── Layout ── */
const PageWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 24px 20px 60px;
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  color: ${p => p.color};
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  margin-bottom: 20px;
  opacity: 0.7;
  &:hover { opacity: 1; }
`;

const FormCard = styled.div`
  background: ${p => p.bg};
  border: 1px solid ${p => p.accent}44;
  border-radius: 12px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Title = styled.h2`
  color: ${p => p.color};
  font-size: 20px;
  font-weight: 700;
  margin: 0;
`;

const Label = styled.label`
  color: ${p => p.color};
  font-size: 13px;
  font-weight: 600;
  opacity: 0.8;
  margin-bottom: -10px;
`;

const Input = styled.input`
  background: ${p => p.bg};
  color: ${p => p.color};
  border: 1px solid ${p => p.accent}55;
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 15px;
  outline: none;
  &:focus { border-color: ${p => p.accent}; }
`;

/* ── Slots de imagen ── */
const SlotsRow = styled.div`
  display: flex;
  gap: 10px;
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
  line-height: 1;
  &:hover { background: #e74c3c; }
`;

/* ── Vista previa ── */
const PreviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PreviewCard = styled.div`
  width: 249px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${p => p.accent}44;
`;

const PlaceholderPrev = styled.div`
  width: 249px;
  height: 168px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed ${p => p.accent}44;
  border-radius: 8px;
  color: ${p => p.color};
  font-size: 13px;
  opacity: 0.5;
  text-align: center;
  padding: 10px;
`;

/* ── Error y botón ── */
const ErrorMsg = styled.p`
  color: #e74c3c;
  font-size: 13px;
  margin: 0;
  padding: 10px 14px;
  background: #e74c3c22;
  border-radius: 6px;
`;

const PublishBtn = styled.button`
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

/* ── AdaptiveGrid — importado de ImageGrid/AdaptiveGrid ── */

/* ── Componente principal ── */
function SubirTrastero({ user }) {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const bg  = theme.modalBg  || theme.background;
  const acc = theme.accent;
  const txt = getContrast(bg);

  const [nombre,   setNombre]   = useState('');
  const [slots,    setSlots]    = useState([null, null, null, null]);
  const [cargando, setCargando] = useState(false);
  const [error,    setError]    = useState('');

  const ref0 = useRef(); const ref1 = useRef();
  const ref2 = useRef(); const ref3 = useRef();
  const inputRefs = [ref0, ref1, ref2, ref3];

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  if (!user) return null;

  const handleSlotClick = (idx) => {
    inputRefs[idx].current.click();
  };

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
    const imagenesFilled = slots.filter(Boolean);
    if (!nombre.trim())          { setError('Ponle un nombre al artículo'); return; }
    if (imagenesFilled.length === 0) { setError('Añade al menos una imagen'); return; }

    setCargando(true);
    setError('');

    const formData = new FormData();
    formData.append('nombre', nombre.trim());
    imagenesFilled.forEach(img => formData.append('imagenes', img.file));

    try {
      const res = await fetch(`${API_URL}/api/trasteros`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('trastero_token')}` },
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error al publicar');
      }
      navigate('/mi-trastero');
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const hasImages = slots.some(Boolean);

  return (
    <PageWrapper>
      <BackBtn color={txt} onClick={() => navigate('/mi-trastero')}>
        ← Mi Trastero
      </BackBtn>

      <FormCard bg={bg} accent={acc}>
        <Title color={txt}>Nuevo artículo</Title>

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
          {[0, 1, 2, 3].map(idx => (
            <Slot
              key={idx}
              filled={!!slots[idx]}
              accent={acc}
              bg={bg}
              onClick={() => handleSlotClick(idx)}
              title={slots[idx] ? 'Cambiar imagen' : 'Añadir imagen'}
            >
              {slots[idx] ? (
                <>
                  <SlotImg src={slots[idx].preview} alt={`img ${idx + 1}`} />
                  {idx === 0 && <PrimaryBadge accent={acc}>PRINCIPAL</PrimaryBadge>}
                  <RemoveBtn
                    onClick={e => { e.stopPropagation(); handleRemove(idx); }}
                    title="Quitar imagen"
                  >
                    ✕
                  </RemoveBtn>
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

        <PreviewSection>
          <Label color={txt}>Vista previa</Label>
          {hasImages ? (
            <PreviewCard accent={acc}>
              <AdaptiveGrid srcs={slots.filter(Boolean).map(s => s.preview)} width="249px" />
            </PreviewCard>
          ) : (
            <PlaceholderPrev accent={acc} color={txt}>
              Las imágenes que añadas aparecerán aquí
            </PlaceholderPrev>
          )}
        </PreviewSection>

        {error && <ErrorMsg>{error}</ErrorMsg>}

        <PublishBtn accent={acc} onClick={handleSubmit} disabled={cargando}>
          {cargando ? 'Publicando...' : '+ Publicar artículo'}
        </PublishBtn>
      </FormCard>
    </PageWrapper>
  );
}

export default SubirTrastero;
