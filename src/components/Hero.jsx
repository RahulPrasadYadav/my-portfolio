import React, { useState } from 'react';
import { ArrowUpRight, Download, Mail, MapPin, Clock, Globe, Copy, Check, Phone } from 'lucide-react';

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function KaggleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4v16" />
      <path d="M18 4l-9 9" />
      <path d="M11 11l8 9" />
    </svg>
  );
}

function LeetCodeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.874 5.874 0 0 0 .349 1.017 5.933 5.933 0 0 0 1.253 1.848l4.243 4.243a1.374 1.374 0 0 0 1.943-1.943l-4.243-4.243a3.18 3.18 0 0 1-.673-.992 2.78 2.78 0 0 1-.167-.488 2.78 2.78 0 0 1-.03-.984 2.8 2.8 0 0 1 .64-1.127l3.854-4.126 5.406-5.788A1.374 1.374 0 0 0 13.483 0z" />
      <path d="M9.832 9.567a1.374 1.374 0 0 0 0 1.943l5.05 5.05a1.374 1.374 0 1 0 1.943-1.943l-5.05-5.05a1.374 1.374 0 0 0-1.943 0z" />
      <path d="M12.986 16.03a1.374 1.374 0 1 0 0 2.748h7.828a1.374 1.374 0 1 0 0-2.748h-7.828z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  );
}

export default function Hero({ profile, ctas, contactCard, onShowToast }) {
  const [inlineCopied, setInlineCopied] = useState(false);

  const handleCopyInline = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setInlineCopied(true);
      onShowToast('Copied to clipboard!');
      setTimeout(() => setInlineCopied(false), 2000);
    });
  };

  const cleanPortfolioUrl = profile.portfolioUrl ? profile.portfolioUrl.replace(/^https?:\/\//, '') : '';

  return (
    <header className="hero">
      <div className="hero-left">
        {/* Pulsing Availability Beacon */}
        <div className="eyebrow">
          <span className="pulse"></span>
          <span>{profile.eyebrow}</span>
        </div>

        {/* Big Serif Heading */}
        <h1>
          {profile.firstName} <span className="name-accent">{profile.lastName}</span>
        </h1>

        {/* Title and specialty */}
        <p className="hero-title">
          {profile.title}
          {profile.specialty && (
            <>
              <span className="pipe"></span>
              <span>{profile.specialty}</span>
            </>
          )}
        </p>

        {/* Editorial Pitch */}
        <p className="hero-pitch">{profile.pitch}</p>

        {/* Narrative Summary */}
        <p className="hero-summary">{profile.summary}</p>

        {/* Action CTAs */}
        <div className="ctas">
          <a href="#impact" className="cta primary">
            <span>{ctas?.viewImpact || 'View Engineering Impact'}</span>
            <ArrowUpRight size={15} />
          </a>
          <button className="cta" onClick={() => window.print()}>
            <Download size={14} />
            <span>{ctas?.downloadCv || 'Download Resume (PDF)'}</span>
          </button>
          <a href={`mailto:${profile.email}`} className="cta">
            <Mail size={14} />
            <span>{ctas?.getInTouch || 'Get in Touch'}</span>
          </a>
        </div>
      </div>

      {/* Right Contact Card */}
      <aside className="contact-card" aria-label="Contact information">
        <div className="contact-card-head">
          <h2>{contactCard?.title || 'Contact & Details'}</h2>
          <div className="contact-head-actions">
            {profile.githubUrl && (
              <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="contact-bubble" title="GitHub Profile">
                <GithubIcon />
              </a>
            )}
            {profile.linkedinUrl && (
              <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="contact-bubble" title="LinkedIn Profile">
                <LinkedinIcon />
              </a>
            )}
            {profile.kaggleUrl && (
              <a href={profile.kaggleUrl} target="_blank" rel="noopener noreferrer" className="contact-bubble" title="Kaggle Profile">
                <KaggleIcon />
              </a>
            )}
            {profile.leetcodeUrl && (
              <a href={profile.leetcodeUrl} target="_blank" rel="noopener noreferrer" className="contact-bubble" title="LeetCode Profile">
                <LeetCodeIcon />
              </a>
            )}
            {profile.twitterUrl && (
              <a href={profile.twitterUrl} target="_blank" rel="noopener noreferrer" className="contact-bubble" title="Twitter / X Profile">
                <TwitterIcon />
              </a>
            )}
          </div>
        </div>

        {/* Clean Contact Identity */}
        <div style={{ marginBottom: 6, paddingTop: 4 }}>
          <div style={{ fontWeight: 700, color: 'var(--ink-strong)', fontSize: 17, letterSpacing: '-0.01em' }}>
            {profile.firstName} {profile.lastName}
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 3 }}>
            {profile.title}
          </div>
        </div>

        <div className="contact-list">
          <div className="contact-item">
            <MapPin className="ico" size={14} />
            <span className="contact-label">{contactCard?.location || 'Location'}</span>
            <span className="contact-value">{profile.location}</span>
          </div>
          <div className="contact-item">
            <Clock className="ico" size={14} />
            <span className="contact-label">{contactCard?.timezone || 'Timezone'}</span>
            <span className="contact-value">{profile.timezone}</span>
          </div>
          <div className="contact-item">
            <Mail className="ico" size={14} />
            <span className="contact-label">{contactCard?.email || 'Email'}</span>
            <span className="contact-value">
              <a href={`mailto:${profile.email}`} className="link-underline">
                {profile.email}
              </a>
              <button
                className="copy-inline-btn"
                onClick={() => handleCopyInline(profile.email)}
                title="Copy email to clipboard"
              >
                {inlineCopied ? <Check size={12} color="var(--emerald)" /> : <Copy size={12} />}
              </button>
            </span>
          </div>
          {profile.phone && (
            <div className="contact-item">
              <Phone className="ico" size={14} />
              <span className="contact-label">{contactCard?.phone || 'Phone'}</span>
              <span className="contact-value">
                <a href={`tel:${profile.phone}`} className="link-underline">
                  {profile.phone}
                </a>
              </span>
            </div>
          )}
          <div className="contact-item">
            <Globe className="ico" size={14} />
            <span className="contact-label">{contactCard?.github || 'GitHub'}</span>
            <span className="contact-value">
              <a href={profile.githubUrl || profile.portfolioUrl} target="_blank" rel="noopener noreferrer" className="link-underline">
                {cleanPortfolioUrl}
              </a>
            </span>
          </div>
        </div>
      </aside>
    </header>
  );
}
