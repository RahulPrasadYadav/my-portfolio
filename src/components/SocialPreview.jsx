import React, { useState } from 'react';
import { Download, Share2, Copy, Check, Mail, Phone, MapPin, ExternalLink, Sparkles, Briefcase } from 'lucide-react';

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

async function renderCardToCanvas(profile, socialPreview) {
  const canvas = document.createElement('canvas');
  const width = 1200;
  const height = 630;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // Ignore font readiness errors and proceed with fallbacks
    }
  }

  // 1. Deep obsidian background
  ctx.fillStyle = '#13101c';
  ctx.fillRect(0, 0, width, height);

  // 2. Warm amber / copper glow (top-right)
  const grad1 = ctx.createRadialGradient(1040, 70, 20, 1040, 70, 620);
  grad1.addColorStop(0, 'rgba(235, 120, 65, 0.48)');
  grad1.addColorStop(0.5, 'rgba(235, 120, 65, 0.14)');
  grad1.addColorStop(1, 'rgba(19, 16, 28, 0)');
  ctx.fillStyle = grad1;
  ctx.fillRect(0, 0, width, height);

  // 3. Radiant deep violet / amethyst glow (bottom-left)
  const grad2 = ctx.createRadialGradient(140, 560, 20, 140, 560, 580);
  grad2.addColorStop(0, 'rgba(138, 75, 238, 0.42)');
  grad2.addColorStop(0.5, 'rgba(138, 75, 238, 0.12)');
  grad2.addColorStop(1, 'rgba(19, 16, 28, 0)');
  ctx.fillStyle = grad2;
  ctx.fillRect(0, 0, width, height);

  // 4. Subtle outer card border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 2;
  roundRect(ctx, 24, 24, width - 48, height - 48, 22);
  ctx.stroke();

  // 5. Header row: Brand & Title tag
  ctx.font = '600 15px "JetBrains Mono", Menlo, Consolas, monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.72)';
  ctx.textAlign = 'left';
  ctx.fillText('GITHUB.COM/RAHULPRASADYADAV', 72, 86);

  // Right pill badge
  const pillText = profile.title || 'Software Developer & AI/ML Engineer';
  ctx.font = '600 13px "JetBrains Mono", Menlo, Consolas, monospace';
  const pillWidth = ctx.measureText(pillText).width + 28;
  const pillX = width - 72 - pillWidth;
  const pillY = 66;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.14)';
  roundRect(ctx, pillX, pillY, pillWidth, 30, 15);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.fillText(pillText, pillX + 14, pillY + 20);

  // 6. Name: Rahul Prasad Yadav (large serif)
  ctx.font = '600 52px "Playfair Display", Georgia, serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'left';
  ctx.fillText(`${profile.firstName} ${profile.lastName}`, 72, 195);

  // 7. Subtitle / Specialty
  ctx.font = '600 22px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  const specialty = profile.specialty || 'GenAI, Computer Vision & Scalable APIs';
  ctx.fillText(specialty, 72, 238);

  // Tags
  ctx.font = '400 17px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.72)';
  const tags = socialPreview?.tags || 'Generative AI & RAG · Computer Vision · Scalable FastAPI Systems';
  ctx.fillText(tags, 72, 272);

  // 8. Contact Box (Gmail, Phone, Location)
  const contactY = 320;
  const contactH = 100;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  roundRect(ctx, 72, contactY, width - 144, contactH, 14);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Contact items inside box
  // Line 1: Email & Location
  ctx.font = '600 17px "JetBrains Mono", Menlo, Consolas, monospace';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`✉  ${profile.email || 'yrahul8777@gmail.com'}`, 96, contactY + 40);

  ctx.font = '500 16px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.90)';
  ctx.textAlign = 'right';
  ctx.fillText(`📍  ${profile.location || 'Hyderabad, India'} · Full-Time`, width - 96, contactY + 40);

  // Line 2: Phone & Availability
  ctx.textAlign = 'left';
  if (profile.phone) {
    ctx.font = '500 16px "JetBrains Mono", Menlo, Consolas, monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fillText(`✆  ${profile.phone}`, 96, contactY + 74);
  }

  ctx.font = '500 15px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.textAlign = 'right';
  ctx.fillText('Onsite · Hybrid · Remote (Available Worldwide)', width - 96, contactY + 74);

  // 9. Footer separator line
  ctx.textAlign = 'left';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(72, 480);
  ctx.lineTo(width - 72, 480);
  ctx.stroke();

  // 10. Footer profiles / handles
  ctx.font = '500 14.5px "JetBrains Mono", Menlo, Consolas, monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.fillText('GitHub: RahulPrasadYadav   |   LinkedIn: rahul-prasad-yadav', 72, 530);

  ctx.textAlign = 'right';
  ctx.fillText('Kaggle: helooohy   |   LeetCode: Rahulprasadyadav', width - 72, 530);

  return canvas;
}

export default function SocialPreview({ profile, isRevealed, socialPreview, onShowToast }) {
  const [downloading, setDownloading] = useState(null);
  const [linkCopied, setLinkCopied] = useState(false);

  if (!isRevealed) return null;

  const handleDownload = async (format) => {
    try {
      setDownloading(format);
      onShowToast?.(`Preparing ${format.toUpperCase()} card image...`);
      const canvas = await renderCardToCanvas(profile, socialPreview);
      const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
      const extension = format === 'jpeg' ? 'jpg' : 'png';
      const filename = `rahul-prasad-yadav-card.${extension}`;

      canvas.toBlob((blob) => {
        setDownloading(null);
        if (!blob) {
          onShowToast?.('Could not generate card image');
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        onShowToast?.(`Card downloaded as ${extension.toUpperCase()}!`);
      }, mimeType, 0.95);
    } catch (err) {
      console.error(err);
      setDownloading(null);
      onShowToast?.('Failed to download card');
    }
  };

  const handleShare = async () => {
    try {
      onShowToast?.('Opening share options...');
      const canvas = await renderCardToCanvas(profile, socialPreview);

      canvas.toBlob(async (blob) => {
        // Try native Web Share with file if supported
        if (blob && navigator.canShare) {
          const file = new File([blob], 'rahul-prasad-yadav-card.png', { type: 'image/png' });
          if (navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({
                title: `${profile.firstName} ${profile.lastName} - Portfolio`,
                text: `${profile.firstName} ${profile.lastName} | ${profile.title} (${profile.email})`,
                files: [file],
              });
              onShowToast?.('Card shared successfully!');
              return;
            } catch (e) {
              if (e.name === 'AbortError') return;
            }
          }
        }

        // Fallback: Web Share with URL
        if (navigator.share) {
          try {
            await navigator.share({
              title: `${profile.firstName} ${profile.lastName} - Portfolio`,
              text: `${profile.firstName} ${profile.lastName} | ${profile.title} (${profile.email})`,
              url: window.location.href,
            });
            onShowToast?.('Portfolio shared!');
            return;
          } catch (e) {
            if (e.name === 'AbortError') return;
          }
        }

        // Fallback: Copy URL to clipboard
        await navigator.clipboard.writeText(window.location.href);
        setLinkCopied(true);
        onShowToast?.('Portfolio link copied to clipboard!');
        setTimeout(() => setLinkCopied(false), 2500);
      }, 'image/png');
    } catch (err) {
      console.error(err);
      navigator.clipboard.writeText(window.location.href).then(() => {
        setLinkCopied(true);
        onShowToast?.('Portfolio link copied to clipboard!');
        setTimeout(() => setLinkCopied(false), 2500);
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setLinkCopied(true);
      onShowToast?.(socialPreview?.linkCopied || 'Portfolio link copied to clipboard!');
      setTimeout(() => setLinkCopied(false), 2500);
    }).catch(() => {
      onShowToast?.('Could not copy link');
    });
  };

  return (
    <section className="social-preview-section is-revealed" id="sharePreview" aria-labelledby="share-preview-title">
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--amber)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
        <Sparkles size={14} />
        <span>Portfolio Snapshot</span>
      </div>

      <h3 id="share-preview-title" style={{ fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--ink-strong)', marginBottom: 8 }}>
        {socialPreview?.heading || 'Social Sharing Card'}
      </h3>
      <p style={{ color: 'var(--muted)', fontSize: 13.5, marginBottom: 20, maxWidth: 640, marginInline: 'auto' }}>
        {socialPreview?.subtitle || 'Open Graph 1200×630 share snapshot formatted for LinkedIn, Twitter / X, and Slack previews.'}
      </p>

      {/* Visual Social Card Preview with Gmail and Contact Info */}
      <article className="social-preview-card" aria-label="Social card snapshot">
        <div className="spc-head">
          <span className="spc-brand">{socialPreview?.domain || 'GITHUB.COM/RAHULPRASADYADAV'}</span>
          <span className="spc-tag">{profile.title}</span>
        </div>

        <div className="spc-body">
          <h3>
            {profile.firstName} {profile.lastName}
          </h3>
          <p className="spc-specialty">
            {profile.specialty}
          </p>
          <p className="spc-tags">
            {socialPreview?.tags || 'Generative AI & RAG · Computer Vision · Scalable FastAPI Systems'}
          </p>

          {/* Contact Strip with Gmail & Phone */}
          <div className="spc-contact-strip">
            <a href={`mailto:${profile.email}`} className="spc-contact-pill" title="Email Rahul">
              <Mail size={13} />
              <span>{profile.email}</span>
            </a>
            {profile.phone && (
              <a href={`tel:${profile.phone}`} className="spc-contact-pill" title="Call Rahul">
                <Phone size={13} />
                <span>{profile.phone}</span>
              </a>
            )}
            <span className="spc-contact-pill">
              <MapPin size={13} />
              <span>{profile.location}</span>
            </span>
            <span className="spc-contact-pill" title="Work Modes">
              <Briefcase size={13} />
              <span>Onsite · Hybrid · Remote (Full-Time)</span>
            </span>
          </div>
        </div>

        <div className="spc-foot">
          <div className="spc-foot-links">
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
            <span className="spc-dot">·</span>
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span className="spc-dot">·</span>
            <a href={profile.kaggleUrl} target="_blank" rel="noopener noreferrer">Kaggle</a>
            <span className="spc-dot">·</span>
            <a href={profile.leetcodeUrl} target="_blank" rel="noopener noreferrer">LeetCode</a>
          </div>
          <span className="spc-availability">{socialPreview?.availability || 'Onsite, Hybrid & Remote · Full-Time'}</span>
        </div>
      </article>

      {/* Action Buttons: Download JPG, Download PNG, Share Card, Copy Link */}
      <div className="spc-actions">
        <button
          className="spc-btn primary"
          onClick={() => handleDownload('jpeg')}
          disabled={downloading === 'jpeg'}
          title="Download social card as high-res JPG image"
        >
          <Download size={15} />
          <span>{downloading === 'jpeg' ? 'Exporting...' : (socialPreview?.downloadJpg || 'Download JPG')}</span>
        </button>

        <button
          className="spc-btn primary"
          onClick={() => handleDownload('png')}
          disabled={downloading === 'png'}
          title="Download social card as high-res PNG image"
        >
          <Download size={15} />
          <span>{downloading === 'png' ? 'Exporting...' : (socialPreview?.downloadPng || 'Download PNG')}</span>
        </button>

        <button
          className="spc-btn"
          onClick={handleShare}
          title="Share card via device share sheet or social media"
        >
          <Share2 size={15} />
          <span>{socialPreview?.shareCard || 'Share Card'}</span>
        </button>

        <button
          className="spc-btn"
          onClick={handleCopyLink}
          title="Copy portfolio link to clipboard"
        >
          {linkCopied ? <Check size={15} color="var(--emerald)" /> : <Copy size={15} />}
          <span>{linkCopied ? (socialPreview?.linkCopied || 'Link Copied ✓') : (socialPreview?.copyLink || 'Copy Link')}</span>
        </button>
      </div>
    </section>
  );
}
