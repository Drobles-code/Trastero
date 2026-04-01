import React, { useState, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../context/ThemeContext';
import ModalLogin from '../../Modal/ModalLogin';
import SignInContent from '../../Auth/SignInContent';
import SignUpContent from '../../Auth/SignUpContent';
import ContactContent from '../../Content/ContactContent';
import AboutContent from '../../Content/AboutContent';

const NavBar = styled.nav`
  background: ${props => props.navbarColor};
  border-bottom: 3px solid var(--accent-color, #667eea);
  padding: 15px 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  overflow: visible;
`;

const NavContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const RightSection = styled.div`
  position: absolute;
  right: 30px;
  top: 65px;
  flex-direction: column;
  background-color: #222;
  width: auto;
  min-width: 180px;
  text-align: right;
  padding: 15px 20px;
  gap: 0;
  border: 1px solid #444;
  border-radius: 5px;
  display: ${props => props.active ? 'flex' : 'none'};
  align-items: flex-end;
  transition: opacity 0.3s ease;
  opacity: ${props => props.active ? '1' : '0'};
  z-index: 999;
`;

const Logo = styled(Link)`
  color: white;
  font-size: 24px;
  font-weight: 700;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    opacity: 0.9;
  }
`;


const NavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s;
  padding: 10px 0;

  &:hover {
    color: #fff;
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 15px 0;
  }
`;

const NavButton = styled.button`
  background: ${props => props.variant === 'text' ? 'transparent' : props.accentColor};
  color: #fff;
  border: ${props => props.variant === 'text' ? 'none' : `2px solid ${props.accentColor}`};
  padding: ${props => props.variant === 'text' ? '10px 0' : '10px 20px'};
  border-radius: 5px;
  font-weight: ${props => props.variant === 'text' ? '500' : '600'};
  cursor: pointer;
  transition: all 0.3s;
  font-size: ${props => props.variant === 'text' ? '16px' : 'auto'};
  opacity: ${props => props.variant === 'text' ? '0.9' : '0.8'};

  &:hover {
    opacity: 1;
    transform: ${props => props.variant === 'text' ? 'none' : 'translateY(-2px)'};
    text-decoration: ${props => props.variant === 'text' ? 'underline' : 'none'};
    box-shadow: ${props => props.variant === 'text' ? 'none' : `0 2px 8px ${props.accentColor}`};
  }

  @media (max-width: 768px) {
    width: ${props => props.variant === 'text' ? '100%' : '80%'};
    margin: ${props => props.variant === 'text' ? '0' : '10px auto'};
    padding: ${props => props.variant === 'text' ? '15px 0' : '10px 20px'};
  }
`;

const MenuButton = styled.button`
  background: var(--accent-color, #667eea);
  color: #fff;
  border: 2px solid var(--accent-color, #667eea);
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
  width: 100%;
  margin: 10px 0;

  &:hover {
    opacity: 0.9;
    box-shadow: 0 2px 8px var(--accent-color, #667eea);
  }
`;

const HamburgerMenu = styled.button`
  display: block;
  background: none;
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
`;

const UserChip = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255,255,255,0.9);
  font-size: 14px;
  font-weight: 600;
`;

const ChipAvatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.4);
  object-fit: cover;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }
`;

const UserAvatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid white;
`;

const LogoutBtn = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;

  &:hover {
    background: #c0392b;
  }
`;

function Navbar({ user, onLogout, onLogin }) {
  const [click, setClick] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const menuRef = useRef(null);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // Cierra el menú al hacer clic fuera de él
  useEffect(() => {
    if (!click) return;
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setClick(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [click]);

  const handleLogout = () => {
    onLogout();
    closeMobileMenu();
    navigate('/');
  };

  const handleSignInSuccess = (userData) => {
    onLogin(userData);
    setShowSignInModal(false);
    setAuthMode('signin');
    closeMobileMenu();
    navigate('/');
  };

  const handleSignUpSuccess = (userData) => {
    onLogin(userData);
    setShowSignInModal(false);
    setAuthMode('signin');
    closeMobileMenu();
    navigate('/');
  };

  return (
    <>
      <ModalLogin isOpen={showSignInModal} onClose={() => {
        setShowSignInModal(false);
        setAuthMode('signin'); // Resetear al modo signin cuando se cierre el modal
      }}>
        {authMode === 'signin' ? (
          <SignInContent
            onLogin={handleSignInSuccess}
            onSwitchToSignUp={() => setAuthMode('signup')}
          />
        ) : (
          <SignUpContent
            onSignUp={handleSignUpSuccess}
            onSwitchToSignIn={() => setAuthMode('signin')}
          />
        )}
      </ModalLogin>

      <ModalLogin isOpen={showAboutModal} onClose={() => setShowAboutModal(false)}>
        <AboutContent />
      </ModalLogin>

      <ModalLogin isOpen={showContactModal} onClose={() => setShowContactModal(false)}>
        <ContactContent onClose={() => setShowContactModal(false)} />
      </ModalLogin>

      <NavBar navbarColor={theme.navbar} accentColor={theme.accent}>
        <NavContainer ref={menuRef}>
          <LeftSection>
            <Logo to="/" onClick={closeMobileMenu}>
              📦 Trastero
            </Logo>
          </LeftSection>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {user && (
              <UserChip
                onClick={() => navigate('/profile')}
                style={{ cursor: 'pointer' }}
                title="Ver perfil"
              >
                <ChipAvatar src={user.avatar} alt={user.name} />
                {user.name}
              </UserChip>
            )}
            <HamburgerMenu onClick={handleClick}>
              {click ? '✕' : '☰'}
            </HamburgerMenu>
          </div>

          <RightSection active={click}>
            <NavLink to="/" onClick={closeMobileMenu}>
              Inicio
            </NavLink>
            <NavButton
              variant="text"
              onClick={() => {
                setShowAboutModal(true);
                closeMobileMenu();
              }}
            >
              Acerca de
            </NavButton>
            <NavButton
              variant="text"
              onClick={() => {
                setShowContactModal(true);
                closeMobileMenu();
              }}
            >
              Contacto
            </NavButton>
            <NavLink to="/settings" onClick={closeMobileMenu}>
              ⚙️ Tema
            </NavLink>

            {user ? (
              <UserSection>
                <UserAvatar
                  src={user.avatar}
                  alt={user.name}
                  title={user.name}
                  onClick={() => {
                    navigate('/profile');
                    closeMobileMenu();
                  }}
                />
                <NavLink to="/profile" onClick={closeMobileMenu}>
                  👤 Mi Perfil
                </NavLink>
                <LogoutBtn onClick={handleLogout}>
                  Salir
                </LogoutBtn>
              </UserSection>
            ) : (
              <>
                <MenuButton accentColor={theme.accent} onClick={() => {
                  setShowSignInModal(true);
                  setAuthMode('signin');
                  closeMobileMenu();
                }}>
                  Iniciar Sesión
                </MenuButton>
                <MenuButton accentColor={theme.accent} onClick={() => {
                  setShowSignInModal(true);
                  setAuthMode('signup');
                  closeMobileMenu();
                }}>
                  Registrarse
                </MenuButton>
              </>
            )}
          </RightSection>
        </NavContainer>
      </NavBar>
    </>
  );
}

export default Navbar;
