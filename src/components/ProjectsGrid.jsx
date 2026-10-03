import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function ProjectsGrid({ projects, section }) {
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="section-title">
        <span className="num">{section?.projectsNum || '04'}</span>
        <h2 id="projects-title">{section?.projectsTitle || 'Featured Projects & Repositories'}</h2>
        <div className="rule"></div>
      </div>

      <div className="project-grid">
        {projects.map((proj) => (
          <div key={proj.id} className="project-card">
            <div className="pc-head">
              <h3>
                {proj.url ? (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    {proj.name}
                  </a>
                ) : (
                  proj.name
                )}
              </h3>
              {proj.url && (
                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${proj.name}`}
                  style={{ color: 'inherit' }}
                >
                  <ExternalLink className="pc-ext" size={14} />
                </a>
              )}
            </div>
            <p>{proj.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
