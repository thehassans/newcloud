import React from 'react';
import { useTranslation } from 'react-i18next';
import { HiGlobe } from 'react-icons/hi';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 text-dark-300 hover:text-white transition-colors rounded-lg hover:bg-dark-800">
        <HiGlobe className="w-5 h-5" />
        <span className="text-sm hidden md:inline">
          {languages.find(l => l.code === i18n.language)?.flag || '🌐'}
        </span>
      </button>
      
      <div className="absolute right-0 mt-2 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="glass rounded-lg p-2 shadow-xl">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                i18n.language === lang.code
                  ? 'bg-primary-500/20 text-primary-400'
                  : 'text-dark-300 hover:text-white hover:bg-dark-800/50'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
