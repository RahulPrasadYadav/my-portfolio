import React, { useState, useEffect } from 'react';
import { translations } from './data/translations';
import Toolbar from './components/Toolbar';
import Hero from './components/Hero';
import ProofStrip from './components/ProofStrip';
import ImpactSection from './components/ImpactSection';
import SkillsMatrix from './components/SkillsMatrix';
import ExperienceTimeline from './components/ExperienceTimeline';
import ProjectsGrid from './components/ProjectsGrid';
import Sidebar from './components/Sidebar';
import ContactCta from './components/ContactCta';
import SocialPreview from './components/SocialPreview';
import Toast from './components/Toast';
import { Eye } from 'lucide-react';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('rahul_portfolio_theme');
    if (saved) return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  // Language state: 'en' | 'hi' | 'es'
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('rahul_portfolio_lang') || 'en';
  });

  // Active dataset based on language selection
  const currentData = translations[currentLang] || translations.en;

  // UI States
  const [isShareRevealed, setIsShareRevealed] = useState(false);
  const [toast, setToast] = useState({ message: '', visible: false });

  // Sync theme with DOM and localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('rahul_portfolio_theme', theme);
  }, [theme]);

  // Handle toast notifications
  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2800);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    const modeName =
      currentLang === 'hi'
        ? nextTheme === 'dark' ? 'डार्क मोड' : 'लाइट मोड'
        : currentLang === 'es'
        ? nextTheme === 'dark' ? 'Modo Oscuro' : 'Modo Claro'
        : nextTheme === 'dark' ? 'Obsidian Night mode' : 'Warm Paper mode';
    showToast(modeName);
  };

  const handleSelectLang = (langCode) => {
    setCurrentLang(langCode);
    localStorage.setItem('rahul_portfolio_lang', langCode);
    const feedback =
      langCode === 'hi'
        ? 'भाषा बदलकर हिंदी की गई'
        : langCode === 'es'
        ? 'Idioma cambiado a Español'
        : 'Language switched to English';
    showToast(feedback);
  };

  const toggleShare = () => {
    setIsShareRevealed(true);
    showToast(
      currentLang === 'hi'
        ? 'सोशल शेयर कार्ड नीचे तैयार है (JPG/PNG डाउनलोड और शेयर विकल्प)'
        : currentLang === 'es'
        ? 'Tarjeta para compartir disponible abajo (Descarga JPG/PNG)'
        : 'Social card ready below (Download JPG/PNG or Share)'
    );
    setTimeout(() => {
      const el = document.getElementById('sharePreview');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  return (
    <div className="app-container">
      {/* Skip to Content for Accessibility */}
      <a href="#main" className="skip-link">
        {currentLang === 'hi' ? 'मुख्य सामग्री पर जाएं' : currentLang === 'es' ? 'Saltar al contenido principal' : 'Skip to main content'}
      </a>

      {/* Sticky Top Toolbar with Language Switcher */}
      <Toolbar
        theme={theme}
        onToggleTheme={toggleTheme}
        email={currentData.profile.email}
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
        onToggleShare={toggleShare}
        labels={currentData.toolbar}
        onShowToast={showToast}
      />

      {/* Main Resume Sheet */}
      <main id="main" className="resume" aria-label="Rahul Prasad Yadav Portfolio">
        <Hero
          profile={currentData.profile}
          ctas={currentData.ctas}
          contactCard={currentData.contactCard}
          onShowToast={showToast}
        />

        <ProofStrip stats={currentData.stats} />

        <ImpactSection
          impacts={currentData.impacts}
          section={currentData.sections}
        />

        <SkillsMatrix
          skills={currentData.skills}
          section={currentData.sections}
        />

        <div className="body-grid">
          <div className="main-column">
            <ExperienceTimeline
              experience={currentData.experience}
              earlierRoles={currentData.earlierRoles}
              section={currentData.sections}
              earlierRolesTitle={currentData.earlierRolesTitle}
            />
            <ProjectsGrid
              projects={currentData.projects}
              section={currentData.sections}
            />
          </div>

          <Sidebar sidebar={currentData.sidebar} />
        </div>

        <ContactCta
          email={currentData.profile.email}
          contactCta={currentData.contactCta}
        />

        <SocialPreview
          profile={currentData.profile}
          isRevealed={isShareRevealed}
          socialPreview={currentData.socialPreview}
          onShowToast={showToast}
        />

        <footer className="resume-footer">
          <div>
            <span>{currentData.footer.copyright}</span>
          </div>
          <div>
            <span>{currentData.footer.printHint}</span>
          </div>
        </footer>
      </main>

      {/* Floating Toast Notification */}
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}
