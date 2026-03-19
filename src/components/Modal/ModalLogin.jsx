import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  background: ${props => props.bgColor || 'white'};
  padding: 55px 40px 40px 40px;
  border-radius: 15px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 450px;
  position: relative;
  animation: slideUp 0.3s ease;
  max-height: 90vh;
  overflow-y: auto;
  transition: background-color 0.3s ease;

  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 55px 20px 30px 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  transition: all 0.3s;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 0;
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: #333;
  }
`;

function ModalLogin({ isOpen, onClose, children }) {
  const { theme } = useContext(ThemeContext);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContent bgColor={theme.modalBg || 'white'}>
        <CloseButton onClick={onClose} title="Cerrar">
          ✕
        </CloseButton>
        {children}
      </ModalContent>
    </Overlay>
  );
}

export default ModalLogin;
