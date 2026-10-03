import React from 'react';
import { BookOpen, Cpu, Award, GraduationCap } from 'lucide-react';

export default function Sidebar({ sidebar }) {
  return (
    <aside className="sidebar">
      {/* Philosophy Panel */}
      <section className="side-panel">
        <div className="side-panel-head">
          <span className="sp-icon">
            <BookOpen size={14} />
          </span>
          <h2>{sidebar?.philosophyTitle || 'AI & Engineering Philosophy'}</h2>
        </div>
        <p>{sidebar?.philosophy}</p>
      </section>

      {/* Tech Stack Pills */}
      <section className="side-panel">
        <div className="side-panel-head">
          <span className="sp-icon">
            <Cpu size={14} />
          </span>
          <h2>{sidebar?.stackTitle || 'Primary Stack'}</h2>
        </div>
        <div className="stack-cloud">
          {sidebar?.stackPills?.map((pill, idx) => (
            <span
              key={idx}
              className={`stack-pill ${pill.highlight ? 'highlight' : ''}`}
            >
              {pill.name}
            </span>
          ))}
        </div>
      </section>

      {/* Honors & Achievements */}
      <section className="side-panel">
        <div className="side-panel-head">
          <span className="sp-icon">
            <Award size={14} />
          </span>
          <h2>{sidebar?.talksTitle || 'Honors & Achievements'}</h2>
        </div>
        <ul className="side-list">
          {sidebar?.talks?.map((talk, idx) => (
            <li key={idx}>
              <strong>{talk.title}</strong>
              <div className="meta-info">{talk.meta}</div>
            </li>
          ))}
        </ul>
      </section>

      {/* Education & Credentials */}
      <section className="side-panel">
        <div className="side-panel-head">
          <span className="sp-icon">
            <GraduationCap size={14} />
          </span>
          <h2>{sidebar?.educationTitle || 'Education & Honors'}</h2>
        </div>
        <ul className="side-list">
          {sidebar?.education?.map((edu, idx) => (
            <li key={idx}>
              <strong>{edu.title}</strong>
              <div className="meta-info">{edu.meta}</div>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
