import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function ImpactSection({ impacts, section }) {
  return (
    <section className="section" id="impact" aria-labelledby="impact-title">
      <div className="section-title">
        <span className="num">{section?.impactNum || '01'}</span>
        <h2 id="impact-title">{section?.impactTitle || 'Selected Engineering Contributions'}</h2>
        <div className="rule"></div>
      </div>

      <div className="impact-grid">
        {impacts.map((item) => (
          <article key={item.id} className="impact-card">
            <div className="impact-head">
              <h3>{item.title}</h3>
              <span className="impact-badge">{item.badge}</span>
            </div>
            <p>{item.description}</p>
            <div className="impact-meta">
              <span>{item.tech}</span>
              {item.linkText && (
                <a href={item.linkUrl || '#'} className="impact-link">
                  {item.linkText} <ArrowUpRight size={13} />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
