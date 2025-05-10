import { useState, createContext, useContext } from 'react';

import Navbar from './common/Navbar';
import Footer from './common/Footer';
import CustomCursor from './common/CustomCursor';

// Create theme context
export const ThemeContext = createContext(null);

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default function Layout({ children, title, description }) {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Theme values with blue color scheme for Alumni network
  const theme = {
    darkMode,
    setDarkMode,
    bgColor: darkMode ? 'bg-gray-900' : 'bg-gray-50',
    textColor: darkMode ? 'text-blue-400' : 'text-gray-900',
    secondaryTextColor: darkMode ? 'text-gray-300' : 'text-gray-700',
    buttonBg: darkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700',
    buttonText: darkMode ? 'text-white' : 'text-white',
    borderColor: darkMode ? 'border-blue-500' : 'border-blue-600',
    gradient: darkMode ? 'from-blue-500 to-blue-600' : 'from-blue-600 to-blue-700',
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`min-h-screen flex flex-col ${theme.bgColor} ${theme.textColor} transition-all duration-500`}>


        {/* Custom cursor component */}
        <CustomCursor />

        <Navbar 
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          borderColor={theme.borderColor}
          secondaryTextColor={theme.secondaryTextColor}
        />

        <main className="flex-grow transition-colors duration-500">
          {children}
        </main>

        <Footer darkMode={darkMode} />
      </div>
    </ThemeContext.Provider>
  );
}