import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import Navbar from './components/Formularios/Header/Navbar';
import Principal from './components/Formularios/Principal/Principal';
import De from './components/Formularios/De/De';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import OpsLogin from './pages/OpsLogin';
import OpsDashboard from './pages/OpsDashboard';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.bgColor};
  padding: 0;
  margin: 0;
  transition: background-color 0.3s ease;
`;

const ContentWrapper = styled.div`
  padding: 20px;
  max-width: 100%;
  margin: 0 auto;
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
  min-height: calc(100vh - 70px);
  transition: background-color 0.3s ease, color 0.3s ease;
`;

function AppContent() {
  const [user, setUser] = useState(null);
  const { theme } = useContext(ThemeContext);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <AppContainer bgColor={theme.background}>
        <Navbar user={user} onLogout={handleLogout} onLogin={handleLogin} />
        <ContentWrapper bgColor={theme.background} textColor={theme.text}>
          <Routes>
            <Route path="/" element={<Principal />} />
            <Route path="/De/:nombre" element={<De />} />
            <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} />} />
            <Route path="/settings" element={<Settings />} />
            {/* Rutas de sistema — sin enlace en navbar */}
            <Route path="/ops/login"     element={<OpsLogin />} />
            <Route path="/ops/dashboard" element={<OpsDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ContentWrapper>
      </AppContainer>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
