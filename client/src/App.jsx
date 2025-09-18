import React, { useState, useEffect } from 'react';
import ChatApp from './ChatApp';
import AuthForm from './component/AuthForm';

const USER_KEY = "chatapp_remember_user";

function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? true : false;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const [darkMode, setDarkMode] = useState(false);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setLoggedIn(true);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    // Set theme based on user prefs or system
    const userTheme = user.preferences?.theme || 'system';
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(userTheme === 'dark' || (userTheme === 'system' && systemPrefersDark));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoggedIn(false);
    setDarkMode(false);
    localStorage.removeItem(USER_KEY);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.body.className = darkMode ? 'bg-dark text-white' : 'bg-light text-dark';
  }, [darkMode]);

  return (
    <>
      {loggedIn ? (
        <ChatApp user={currentUser} onLogout={handleLogout} />
      ) : (
        <AuthForm onLogin={handleLogin} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      )}
    </>
  );
}

export default App;
