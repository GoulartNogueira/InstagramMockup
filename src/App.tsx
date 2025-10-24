import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProfileView from './pages/ProfileView';
import ConfigPage from './pages/ConfigPage';
import { ProfileContextProvider } from './context/ProfileContext';
import PublicationsPage from './pages/PublicationsPage';

const App: React.FC = () => {
  return (
    <ProfileContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProfileView />} />
          <Route path="/config" element={<ConfigPage />} />
          <Route path="/publicacoes/:photoIndex" element={<PublicationsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ProfileContextProvider>
  );
};

export default App;
