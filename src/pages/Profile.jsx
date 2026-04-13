import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const getContrastColor = (hexColor) => {
  const hex = (hexColor || '#000000').replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminancia = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminancia > 0.5 ? '#000000' : '#ffffff';
};

/* ─── Layout principal ─────────────────────────────────────── */

const PageWrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 30px 20px 60px;
  min-height: 80vh;
`;

const Card = styled.div`
  background: ${p => p.bg || 'transparent'};
  border: 1px solid ${p => p.border || '#333'};
  border-radius: 12px;
  padding: ${p => p.pad || '24px'};
  box-shadow: 0 4px 20px rgba(0,0,0,0.35);
  transition: background-color 0.3s;
`;

const SectionTitle = styled.h2`
  color: ${p => p.accent};
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 18px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${p => p.accent}44;
`;

/* ─── Header card ──────────────────────────────────────────── */

const HeaderCard = styled(Card)`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  margin-bottom: 20px;
  align-items: start;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const AvatarWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const AvatarImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid ${p => p.accent};
  object-fit: cover;
`;

const UserMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const UserName = styled.h1`
  color: ${p => getContrastColor(p.bg)};
  font-size: 22px;
  font-weight: 700;
  margin: 0;
`;

const UserEmail = styled.p`
  color: ${p => getContrastColor(p.bg)}aa;
  font-size: 14px;
  margin: 0;
`;

const TipoBadge = styled.span`
  display: inline-block;
  margin-top: 4px;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${p => p.accent}22;
  color: ${p => p.accent};
  border: 1px solid ${p => p.accent}55;
  text-transform: capitalize;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 6px;
`;

/* ─── Ranking ──────────────────────────────────────────────── */

const RankingPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 160px;

  @media (max-width: 600px) {
    flex-direction: row;
    flex-wrap: wrap;
    min-width: unset;
  }
`;

const RankBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${p => p.bg}cc;
  border: 1px solid ${p => p.border || '#333'};
  border-radius: 8px;
  padding: 8px 12px;
`;

const RankIcon = styled.span`
  font-size: 18px;
  line-height: 1;
`;

const RankInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const RankLabel = styled.span`
  font-size: 11px;
  color: ${p => getContrastColor(p.bg)}88;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const RankValue = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: ${p => p.accent};
  line-height: 1.2;
`;

/* ─── Secciones inferiores ─────────────────────────────────── */

const BodyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

/* ─── Formulario ───────────────────────────────────────────── */

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  color: ${p => getContrastColor(p.bg)}99;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const inputBase = `
  width: 100%;
  padding: 10px 12px;
  border-radius: 7px;
  font-size: 14px;
  box-sizing: border-box;
  transition: all 0.2s;
  font-family: inherit;
`;

const Input = styled.input`
  ${inputBase}
  background: ${p => p.editing ? (getContrastColor(p.bg) === '#ffffff' ? '#2a2a2a' : '#f0f0f0') : 'transparent'};
  border: ${p => p.editing
    ? `2px solid ${getContrastColor(p.bg) === '#ffffff' ? '#555' : '#ccc'}`
    : '2px solid transparent'};
  color: ${p => getContrastColor(p.bg)};
  cursor: ${p => p.editing ? 'text' : 'default'};
  pointer-events: ${p => p.editing ? 'auto' : 'none'};

  &:focus {
    outline: none;
    border-color: ${p => p.accent};
    box-shadow: 0 0 0 3px ${p => p.accent}33;
  }

  &::placeholder {
    color: ${p => getContrastColor(p.bg)}44;
  }
`;

const Select = styled.select`
  ${inputBase}
  background: ${p => p.editing ? (getContrastColor(p.bg) === '#ffffff' ? '#2a2a2a' : '#f0f0f0') : 'transparent'};
  border: ${p => p.editing
    ? `2px solid ${getContrastColor(p.bg) === '#ffffff' ? '#555' : '#ccc'}`
    : '2px solid transparent'};
  color: ${p => getContrastColor(p.bg)};
  cursor: ${p => p.editing ? 'pointer' : 'default'};
  pointer-events: ${p => p.editing ? 'auto' : 'none'};
  appearance: ${p => p.editing ? 'auto' : 'none'};

  &:focus {
    outline: none;
    border-color: ${p => p.accent};
    box-shadow: 0 0 0 3px ${p => p.accent}33;
  }

  option {
    background: #1a1a1a;
    color: #fff;
  }
`;

/* ─── Botones ──────────────────────────────────────────────── */

const Btn = styled.button`
  padding: 9px 20px;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;

  ${p => p.variant === 'primary' && `
    background: ${p.accent};
    color: #fff;
    &:hover { opacity: 0.85; transform: translateY(-1px); }
  `}
  ${p => p.variant === 'ghost' && `
    background: transparent;
    color: ${getContrastColor(p.bg || '#000')}99;
    border: 1px solid ${getContrastColor(p.bg || '#000')}33;
    &:hover { background: ${getContrastColor(p.bg || '#000')}11; }
  `}
  ${p => p.variant === 'danger' && `
    background: #e74c3c;
    color: #fff;
    &:hover { background: #c0392b; }
  `}
`;

/* ─── Pantalla protegida ───────────────────────────────────── */

const ProtectedScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 16px;
  text-align: center;
`;

const LockIcon = styled.div`
  font-size: 56px;
  margin-bottom: 8px;
`;

const ProtectedTitle = styled.h2`
  color: ${p => getContrastColor(p.bg)};
  font-size: 22px;
  margin: 0;
`;

const ProtectedSub = styled.p`
  color: ${p => getContrastColor(p.bg)}88;
  font-size: 15px;
  margin: 0;
  max-width: 320px;
`;

/* ─── Imagen de trastero ───────────────────────────────────── */

const DatosGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  align-items: start;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const ImgSlot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const ImgSlotImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 10px;
  object-fit: cover;
  border: 2px solid ${p => p.accent};
`;

const ImgSlotLabel = styled.label`
  display: inline-block;
  padding: 7px 14px;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  background: transparent;
  color: ${p => getContrastColor(p.bg || '#000')}99;
  border: 1px solid ${p => getContrastColor(p.bg || '#000')}33;
  transition: all 0.2s;
  text-align: center;
  &:hover { background: ${p => getContrastColor(p.bg || '#000')}11; }
`;

const DEFAULT_IMG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' rx='10' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='52' fill='%23666'%3E%F0%9F%93%A6%3C/text%3E%3C/svg%3E`;

/* ─── Tipos de vía ─────────────────────────────────────────── */

const TIPOS_VIA = [
  'Calle', 'Avenida', 'Paseo', 'Plaza', 'Carretera',
  'Autovía', 'Autopista', 'Camino', 'Ronda', 'Travesía',
  'Vía', 'Callejón', 'Bulevar',
];

/* ─── Componente principal ─────────────────────────────────── */

function Profile({ user, onLogout, onUserUpdate }) {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const bg = theme.modalBg;
  const acc = theme.accent;

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(() => {
    const defaults = {
      nombre: user?.name || '', telefono: '', tipoUsuario: 'persona',
      personaContacto: '', tipoVia: 'Calle', nombreVia: '', numero: '',
      piso: '', puerta: '', codigoPostal: '', pais: 'España', trasteroImg: null,
    };
    if (!user) return defaults;
    try {
      const saved = localStorage.getItem(`userProfile_${user.id}`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return defaults;
  });
  const [draft, setDraft] = useState(profileData);

  // Ranking (de API en el futuro, por ahora desde localStorage o ceros)
  const [ranking] = useState({
    vendidos: 0,
    reclamaciones: 0,
    devueltos: 0,
    recomendados: 0,
  });
  const [trasteroNombre,  setTrasteroNombre]  = useState('');
  const [trasteroId,      setTrasteroId]      = useState(null);
  const [draftTrastero,   setDraftTrastero]   = useState('');

  // Cargar nombre del trastero contenedor
  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem('trastero_token');
    fetch(`${API_URL}/api/trasteros/contenedor?usuario_id=${user.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.ok ? r.json() : [])
      .then(data => {
        if (data.length > 0) {
          setTrasteroNombre(data[0].nombre);
          setDraftTrastero(data[0].nombre);
          setTrasteroId(data[0].id);
        }
      })
      .catch(() => {});
  }, [user]);

  /* ── Pantalla de acceso restringido ── */
  if (!user) {
    return (
      <PageWrapper>
        <ProtectedScreen>
          <LockIcon>🔒</LockIcon>
          <ProtectedTitle bg={theme.background}>Acceso restringido</ProtectedTitle>
          <ProtectedSub bg={theme.background}>
            Necesitas iniciar sesión para ver tu perfil.
          </ProtectedSub>
          <Btn variant="primary" accent={acc} onClick={() => navigate('/')}>
            Ir al inicio
          </Btn>
        </ProtectedScreen>
      </PageWrapper>
    );
  }

  /* ── Handlers ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDraft(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setDraft(profileData);
    setDraftTrastero(trasteroNombre);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft(profileData);
    setDraftTrastero(trasteroNombre);
    setIsEditing(false);
  };

  const handleSave = async () => {
    setProfileData(draft);
    localStorage.setItem(`userProfile_${user.id}`, JSON.stringify(draft));

    const token = localStorage.getItem('trastero_token');

    // Actualizar nombre de usuario en la BD si cambió
    if (draft.nombre.trim() && draft.nombre.trim() !== user.name) {
      try {
        const res = await fetch(`${API_URL}/api/auth/nombre`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ nombre: draft.nombre.trim() }),
        });
        if (res.ok && onUserUpdate) {
          onUserUpdate({ ...user, name: draft.nombre.trim() });
        }
      } catch {}
    }

    // Guardar nombre del trastero si cambió
    if (draftTrastero.trim() && draftTrastero.trim() !== trasteroNombre && trasteroId) {
      try {
        const res = await fetch(`${API_URL}/api/trasteros/contenedor/${trasteroId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ nombre: draftTrastero.trim() }),
        });
        if (res.ok) setTrasteroNombre(draftTrastero.trim());
      } catch {}
    }

    setIsEditing(false);
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setDraft(prev => ({ ...prev, trasteroImg: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate('/');
  };

  const data = isEditing ? draft : profileData;

  return (
    <PageWrapper>

      {/* ── HEADER ── */}
      <HeaderCard bg={bg} border={acc + '55'}>
        <UserInfo>
          <AvatarWrapper>
            <AvatarImg
              src={user.avatar}
              alt={user.name}
              accent={acc}
            />
          </AvatarWrapper>
          <UserMeta>
            <UserName bg={bg}>{data.nombre || user.name}</UserName>
            <UserEmail bg={bg}>{user.email}</UserEmail>
            {isEditing ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                <span style={{ fontSize: 15 }}>🏠</span>
                <Input
                  type="text"
                  value={draftTrastero}
                  onChange={e => setDraftTrastero(e.target.value)}
                  placeholder="Nombre de tu trastero"
                  editing={true}
                  bg={bg}
                  accent={acc}
                  style={{ width: 180, padding: '4px 10px', fontSize: 13 }}
                />
              </div>
            ) : trasteroNombre ? (
              <TipoBadge accent={acc} style={{ fontSize: 13, width: 'fit-content' }}>
                🏠 {trasteroNombre}
              </TipoBadge>
            ) : null}
            <TipoBadge accent={acc}>
              {data.tipoUsuario === 'empresa' ? '🏢 Empresa' : '👤 Persona'}
            </TipoBadge>
            <HeaderActions>
              {isEditing ? (
                <>
                  <Btn variant="primary" accent={acc} onClick={handleSave}>
                    Guardar
                  </Btn>
                  <Btn variant="ghost" bg={bg} onClick={handleCancel}>
                    Cancelar
                  </Btn>
                </>
              ) : (
                <>
                  <Btn variant="primary" accent={acc} onClick={handleEdit}>
                    ✏️ Editar perfil
                  </Btn>
                  <Btn variant="danger" onClick={handleLogout}>
                    Salir
                  </Btn>
                </>
              )}
            </HeaderActions>
          </UserMeta>
        </UserInfo>

        {/* ── RANKING ── */}
        <RankingPanel>
          <RankBadge bg={bg} border={acc + '33'}>
            <RankIcon>📦</RankIcon>
            <RankInfo>
              <RankLabel bg={bg}>Vendidos</RankLabel>
              <RankValue accent={acc}>{ranking.vendidos}</RankValue>
            </RankInfo>
          </RankBadge>
          <RankBadge bg={bg} border="#e74c3c55">
            <RankIcon>⚠️</RankIcon>
            <RankInfo>
              <RankLabel bg={bg}>Reclamaciones</RankLabel>
              <RankValue accent="#e74c3c">{ranking.reclamaciones}</RankValue>
            </RankInfo>
          </RankBadge>
          <RankBadge bg={bg} border="#f39c1255">
            <RankIcon>↩️</RankIcon>
            <RankInfo>
              <RankLabel bg={bg}>Devueltos</RankLabel>
              <RankValue accent="#f39c12">{ranking.devueltos}</RankValue>
            </RankInfo>
          </RankBadge>
          <RankBadge bg={bg} border="#27ae6055">
            <RankIcon>👍</RankIcon>
            <RankInfo>
              <RankLabel bg={bg}>Recomendado</RankLabel>
              <RankValue accent="#27ae60">{ranking.recomendados}</RankValue>
            </RankInfo>
          </RankBadge>
        </RankingPanel>
      </HeaderCard>

      {/* ── CUERPO ── */}
      <BodyGrid>

        {/* ── DATOS PERSONALES ── */}
        <Card bg={bg} border={acc + '44'}>
          <SectionTitle accent={acc}>Datos personales</SectionTitle>

          <DatosGrid>
            <div>
              <FormGroup>
                <Label bg={bg} htmlFor="nombre">Nombre completo</Label>
                <Input
                  id="nombre" name="nombre" type="text"
                  value={data.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  editing={isEditing} bg={bg} accent={acc}
                />
              </FormGroup>

              <FormGroup>
                <Label bg={bg} htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono" name="telefono" type="tel"
                  value={data.telefono}
                  onChange={handleChange}
                  placeholder="+34 600 000 000"
                  editing={isEditing} bg={bg} accent={acc}
                />
              </FormGroup>

              <FormGroup>
                <Label bg={bg} htmlFor="tipoUsuario">Tipo de cuenta</Label>
                <Select
                  id="tipoUsuario" name="tipoUsuario"
                  value={data.tipoUsuario}
                  onChange={handleChange}
                  editing={isEditing} bg={bg} accent={acc}
                >
                  <option value="persona">Persona</option>
                  <option value="empresa">Empresa</option>
                </Select>
              </FormGroup>

              {data.tipoUsuario === 'empresa' && (
                <FormGroup>
                  <Label bg={bg} htmlFor="personaContacto">Persona de contacto</Label>
                  <Input
                    id="personaContacto" name="personaContacto" type="text"
                    value={data.personaContacto}
                    onChange={handleChange}
                    placeholder="Nombre del responsable"
                    editing={isEditing} bg={bg} accent={acc}
                  />
                </FormGroup>
              )}
            </div>

            <ImgSlot>
              <ImgSlotImg
                src={data.trasteroImg || DEFAULT_IMG}
                alt="Imagen de trastero"
                accent={acc}
              />
              {isEditing && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    id="trasteroImgInput"
                    style={{ display: 'none' }}
                    onChange={handleImgChange}
                  />
                  <ImgSlotLabel htmlFor="trasteroImgInput" bg={bg}>
                    Cambiar imagen
                  </ImgSlotLabel>
                </>
              )}
            </ImgSlot>
          </DatosGrid>
        </Card>

        {/* ── DIRECCIÓN ── */}
        <Card bg={bg} border={acc + '44'}>
          <SectionTitle accent={acc}>Dirección</SectionTitle>

          <TwoCol>
            <FormGroup>
              <Label bg={bg} htmlFor="tipoVia">Tipo de vía</Label>
              <Select
                id="tipoVia" name="tipoVia"
                value={data.tipoVia}
                onChange={handleChange}
                editing={isEditing} bg={bg} accent={acc}
              >
                {TIPOS_VIA.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label bg={bg} htmlFor="numero">Número</Label>
              <Input
                id="numero" name="numero" type="text"
                value={data.numero}
                onChange={handleChange}
                placeholder="12"
                editing={isEditing} bg={bg} accent={acc}
              />
            </FormGroup>
          </TwoCol>

          <FormGroup>
            <Label bg={bg} htmlFor="nombreVia">Nombre de la vía</Label>
            <Input
              id="nombreVia" name="nombreVia" type="text"
              value={data.nombreVia}
              onChange={handleChange}
              placeholder="Gran Vía"
              editing={isEditing} bg={bg} accent={acc}
            />
          </FormGroup>

          <TwoCol>
            <FormGroup>
              <Label bg={bg} htmlFor="piso">Piso</Label>
              <Input
                id="piso" name="piso" type="text"
                value={data.piso}
                onChange={handleChange}
                placeholder="3º"
                editing={isEditing} bg={bg} accent={acc}
              />
            </FormGroup>
            <FormGroup>
              <Label bg={bg} htmlFor="puerta">Puerta</Label>
              <Input
                id="puerta" name="puerta" type="text"
                value={data.puerta}
                onChange={handleChange}
                placeholder="B"
                editing={isEditing} bg={bg} accent={acc}
              />
            </FormGroup>
          </TwoCol>

          <TwoCol>
            <FormGroup>
              <Label bg={bg} htmlFor="codigoPostal">Código Postal</Label>
              <Input
                id="codigoPostal" name="codigoPostal" type="text"
                value={data.codigoPostal}
                onChange={handleChange}
                placeholder="28001"
                editing={isEditing} bg={bg} accent={acc}
              />
            </FormGroup>
            <FormGroup>
              <Label bg={bg} htmlFor="pais">País</Label>
              <Input
                id="pais" name="pais" type="text"
                value={data.pais}
                onChange={handleChange}
                placeholder="España"
                editing={isEditing} bg={bg} accent={acc}
              />
            </FormGroup>
          </TwoCol>
        </Card>
      </BodyGrid>
    </PageWrapper>
  );
}

export default Profile;
