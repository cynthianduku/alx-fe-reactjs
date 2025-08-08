import React from 'react';
import ProfilePage from './ProfilePage';
import UserContext from './UserContext';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
    <UserContext.Provider value={userData}>
      <Header />
      <MainContent />
      <ProfilePage />
      <Footer />
    </UserContext.Provider>
  );
}

export default App;
