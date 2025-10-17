import React from 'react';
import { useAuth } from '../context/AuthContext';
import TempleIcon from './icons/TempleIcon';
import LogoutIcon from './icons/LogoutIcon';
import { useTranslation } from '../hooks/useTranslation';
import type { Locale } from '../context/LocaleContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { t, locale, setLocale } = useTranslation();

  const handleLanguageChange = (lang: Locale) => {
    setLocale(lang);
  };

  return (
    <header className="bg-amber-500 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-3">
          <TempleIcon className="h-8 w-8" />
          <h1 className="text-2xl font-bold tracking-tight">{t('templeConnect')}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center space-x-2 bg-black bg-opacity-10 rounded-full p-1">
                <button 
                    onClick={() => handleLanguageChange('en')}
                    className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${locale === 'en' ? 'bg-white text-amber-600' : 'text-white hover:bg-black hover:bg-opacity-10'}`}
                >
                    EN
                </button>
                 <button 
                    onClick={() => handleLanguageChange('te')}
                    className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${locale === 'te' ? 'bg-white text-amber-600' : 'text-white hover:bg-black hover:bg-opacity-10'}`}
                >
                    తె
                </button>
            </div>

            {user && (
            <div className="flex items-center space-x-4">
                <span className="hidden sm:inline">{t('welcome')}, {user.username}</span>
                <button
                onClick={logout}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                aria-label="Logout"
                >
                <LogoutIcon className="h-5 w-5" />
                <span className="hidden md:inline">{t('logout')}</span>
                </button>
            </div>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;
