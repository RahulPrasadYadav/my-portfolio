import React from 'react';
import { Layers, Palette, Zap, Database, ShieldCheck, Cpu } from 'lucide-react';

const skillIcons = {
  Layers: Layers,
  Palette: Palette,
  Zap: Zap,
  Database: Database,
  ShieldCheck: ShieldCheck,
  Cpu: Cpu,
};

export default function SkillsMatrix({ skills, section }) {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="section-title">
        <span className="num">{section?.skillsNum || '02'}</span>
        <h2 id="skills-title">{section?.skillsTitle || 'AI/ML Expertise & Core Stack'}</h2>
        <div className="rule"></div>
      </div>

      <div className="expertise-grid">
        {skills.map((skill, idx) => {
          const IconComponent = skillIcons[skill.icon] || Layers;
          return (
            <div key={idx} className={`expertise-card ${skill.colorClass || ''}`}>
              <div className="ec-head">
                <span className="ec-icon">
                  <IconComponent size={16} />
                </span>
                <h3>{skill.category}</h3>
              </div>
              <p>{skill.items}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
