import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: ${props => props.bgColor};
  min-height: 80vh;
  transition: background-color 0.3s ease;
`;

const Title = styled.h1`
  color: #333;
  font-size: 32px;
  margin-bottom: 30px;
  text-align: center;
`;

const ProfileSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AvatarCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 20px;
  border: 4px solid ${props => props.accentColor};
`;

const InfoCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const InfoGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: ${props => props.accentColor};
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
`;

const Value = styled.p`
  color: #333;
  font-size: 18px;
  margin: 0;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.3s;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${props => props.accentColor};
    box-shadow: 0 0 0 3px ${props => props.accentColor ? props.accentColor + '20' : 'rgba(102, 126, 234, 0.1)'};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  ${props => props.primary ? `
    background: ${props.accentColor || '#667eea'};
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px ${props.accentColor ? props.accentColor + '66' : 'rgba(102, 126, 234, 0.4)'};
    }
  ` : `
    background: #f0f0f0;
    color: #333;

    &:hover {
      background: #e0e0e0;
    }
  `}
`;

const LogoutButton = styled(Button)`
  background: #e74c3c;
  color: white;
  margin-top: 20px;
  width: 100%;

  &:hover {
    background: #c0392b;
    transform: none;
  }
`;

const ProtectedMessage = styled.div`
  background: #fff3cd;
  border: 1px solid #ffc107;
  color: #856404;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
  margin-bottom: 20px;
`;

function Profile({ user }) {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  if (!user) {
    return (
      <Container bgColor={theme.background}>
        <ProtectedMessage>
          ⚠️ Debes iniciar sesión para ver tu perfil.
          <div style={{ marginTop: '15px' }}>
            <Button primary accentColor={theme.accent} onClick={() => navigate('/signin')}>
              Ir a Iniciar Sesión
            </Button>
          </div>
        </ProtectedMessage>
      </Container>
    );
  }

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar cambios en una API
    setIsEditing(false);
  };

  const handleLogout = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <Container bgColor={theme.background}>
      <Title>Mi Perfil</Title>

      <ProfileSection>
        <AvatarCard>
          <Avatar src={user.avatar} alt={user.name} accentColor={theme.accent} />
          <h3>{user.name}</h3>
          <p style={{ color: '#999', marginBottom: '20px' }}>{user.email}</p>
          <Button primary accentColor={theme.accent} onClick={handleEdit}>
            {isEditing ? 'Cancelar Edición' : 'Editar Perfil'}
          </Button>
        </AvatarCard>

        <InfoCard>
          {isEditing ? (
            <>
              <InfoGroup>
                <Label accentColor={theme.accent} htmlFor="name">Nombre Completo</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  accentColor={theme.accent}
                />
              </InfoGroup>

              <InfoGroup>
                <Label accentColor={theme.accent} htmlFor="email">Correo Electrónico</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={editData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  accentColor={theme.accent}
                />
              </InfoGroup>

              <ButtonGroup>
                <Button primary accentColor={theme.accent} onClick={handleSave}>
                  Guardar Cambios
                </Button>
                <Button onClick={handleEdit}>
                  Cancelar
                </Button>
              </ButtonGroup>
            </>
          ) : (
            <>
              <InfoGroup>
                <Label accentColor={theme.accent}>Nombre Completo</Label>
                <Value>{user.name}</Value>
              </InfoGroup>

              <InfoGroup>
                <Label accentColor={theme.accent}>Correo Electrónico</Label>
                <Value>{user.email}</Value>
              </InfoGroup>

              <InfoGroup>
                <Label accentColor={theme.accent}>Miembro Desde</Label>
                <Value>{new Date().toLocaleDateString('es-ES')}</Value>
              </InfoGroup>

              <InfoGroup>
                <Label accentColor={theme.accent}>Estado</Label>
                <Value style={{ color: '#27ae60' }}>✓ Activo</Value>
              </InfoGroup>
            </>
          )}
        </InfoCard>
      </ProfileSection>

      <AvatarCard>
        <h3>Configuración de Cuenta</h3>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Opciones adicionales y preferencias de tu cuenta
        </p>
        <ButtonGroup>
          <Button accentColor={theme.accent}>Cambiar Contraseña</Button>
          <Button accentColor={theme.accent}>Privacidad</Button>
          <Button accentColor={theme.accent}>Notificaciones</Button>
        </ButtonGroup>
        <LogoutButton onClick={handleLogout}>
          Cerrar Sesión
        </LogoutButton>
      </AvatarCard>
    </Container>
  );
}

export default Profile;
