import React, { useState } from 'react';
import { Sun, Moon, Printer, Copy, Check, Share2 } from 'lucide-react';

export default function Toolbar({
  theme,
  onToggleTheme,
  email,
  currentLang,
  onSelectLang,
  onToggleShare,
  labels,
  onShowToast,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      onShowToast(labels?.copied || 'Copied ✓');
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      onShowToast('Could not copy email');
    });
  };

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'es', label: 'ES' },
  ];

  return (
    <nav className="toolbar" aria-label="Portfolio actions">
      <div className="tb-group">
        {/* Language Switcher (EN / हिंदी / ES) */}
        <div className="lang-switcher" role="group" aria-label="Language selection">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`lang-btn ${currentLang === lang.code ? 'active' : ''}`}
              onClick={() => onSelectLang && onSelectLang(lang.code)}
              aria-pressed={currentLang === lang.code}
              title={`Switch language to ${lang.label}`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* Theme Toggle */}
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          title={`Switch to ${theme === 'dark' ? (labels?.lightMode || 'Light Mode') : (labels?.darkMode || 'Dark Mode')}`}
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          <span>{theme === 'dark' ? (labels?.lightMode || 'Light Mode') : (labels?.darkMode || 'Dark Mode')}</span>
        </button>


        {/* Download PDF */}
        <button
          className="tb-btn"
          onClick={() => window.print()}
          title="Print or save as clean resume PDF"
        >
          <Printer size={14} />
          <span>{labels?.downloadPdf || 'Download PDF'}</span>
        </button>

        {/* Copy Email */}
        <button
          className={`tb-btn ${copied ? 'is-copied' : ''}`}
          onClick={handleCopyEmail}
          title="Copy email address"
        >
          {copied ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--emerald)', fontWeight: 700 }}>
              <Check size={14} />
              <span>{labels?.copied || 'Copied ✓'}</span>
            </span>
          ) : (
            <>
              <Copy size={14} />
              <span>{labels?.copyEmail || 'Copy Email'}</span>
            </>
          )}
        </button>

        {/* Share Card Toggle */}
        <button
          className="tb-btn"
          onClick={onToggleShare}
          title="View social sharing card"
        >
          <Share2 size={14} />
          <span>{labels?.shareCard || 'Share Card'}</span>
        </button>
      </div>
    </nav>
  );
}
