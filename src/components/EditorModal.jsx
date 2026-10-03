import React, { useState, useEffect } from 'react';

export default function EditorModal({ isOpen, onClose, data, onSave, onReset, onShowToast }) {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data, isOpen]);

  if (!isOpen) return null;

  const handleProfileChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }));
  };

  const handleStatChange = (index, field, value) => {
    setFormData((prev) => {
      const newStats = [...prev.stats];
      newStats[index] = { ...newStats[index], [field]: value };
      return { ...prev, stats: newStats };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.profile.firstName.toLowerCase().replace(/\s+/g, '_')}_portfolio_config.json`;
    a.click();
    URL.revokeObjectURL(url);
    onShowToast('Exported portfolio JSON configuration!');
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="editorModalTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="editor-modal">
        <div className="modal-header">
          <h3 id="editorModalTitle">Customize Your Portfolio Live</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div className="modal-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.profile.firstName}
                  onChange={(e) => handleProfileChange('firstName', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.profile.lastName}
                  onChange={(e) => handleProfileChange('lastName', e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label>Job Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.profile.title}
                  onChange={(e) => handleProfileChange('title', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Specialty Focus</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.profile.specialty}
                  onChange={(e) => handleProfileChange('specialty', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Availability / Eyebrow Text</label>
              <input
                type="text"
                className="form-input"
                value={formData.profile.eyebrow}
                onChange={(e) => handleProfileChange('eyebrow', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Elevator Pitch</label>
              <textarea
                className="form-textarea"
                value={formData.profile.pitch}
                onChange={(e) => handleProfileChange('pitch', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Executive Summary</label>
              <textarea
                className="form-textarea"
                style={{ minHeight: 90 }}
                value={formData.profile.summary}
                onChange={(e) => handleProfileChange('summary', e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  value={formData.profile.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.profile.phone || ''}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.profile.location}
                  onChange={(e) => handleProfileChange('location', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Timezone / Schedule</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.profile.timezone}
                  onChange={(e) => handleProfileChange('timezone', e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label>GitHub URL</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.profile.githubUrl}
                  onChange={(e) => handleProfileChange('githubUrl', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>LinkedIn URL</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.profile.linkedinUrl}
                  onChange={(e) => handleProfileChange('linkedinUrl', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Kaggle URL</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.profile.kaggleUrl || ''}
                  onChange={(e) => handleProfileChange('kaggleUrl', e.target.value)}
                />
              </div>
            </div>

            <div style={{ marginTop: 8 }}>
              <label style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'var(--muted-2)' }}>
                Quantitative Key Stats
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 6 }}>
                {formData.stats.map((stat, idx) => (
                  <div key={idx} className="form-group">
                    <input
                      type="text"
                      className="form-input"
                      value={stat.value}
                      onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                      placeholder={`Stat ${idx + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="tb-btn"
              onClick={() => {
                if (confirm('Reset all changes back to original defaults?')) {
                  onReset();
                  onClose();
                }
              }}
            >
              Reset to Default
            </button>
            <div className="modal-actions">
              <button type="button" className="tb-btn" onClick={handleExportJson}>
                Export JSON
              </button>
              <button type="submit" className="tb-btn primary">
                Save &amp; Update View
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
