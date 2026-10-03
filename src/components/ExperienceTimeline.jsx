import React from 'react';

export default function ExperienceTimeline({ experience, earlierRoles, section, earlierRolesTitle }) {
  return (
    <section className="section" id="experience" aria-labelledby="experience-title" style={{ marginTop: 0 }}>
      <div className="section-title">
        <span className="num">{section?.expNum || '03'}</span>
        <h2 id="experience-title">{section?.expTitle || 'Engineering Experience'}</h2>
        <div className="rule"></div>
      </div>

      <div className="experience">
        {experience.map((job) => (
          <article key={job.id} className={`job ${job.featured ? 'featured' : ''}`}>
            <div className="job-card">
              <div className="job-head">
                <div>
                  <h3>{job.company}</h3>
                  <p className="role">{job.role}</p>
                </div>
                <div className="job-meta">
                  {job.period}
                  <br />
                  {job.location}
                </div>
              </div>

              <ul>
                {job.highlights.map((highlight, idx) => (
                  <li key={idx}>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {job.tags && job.tags.length > 0 && (
                <div className="job-tags">
                  {job.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="job-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}

        {earlierRoles && earlierRoles.length > 0 && (
          <article className="job">
            <div className="job-card">
              <h4 style={{ marginBottom: 10, fontFamily: 'var(--serif)', fontSize: 16, color: 'var(--ink-strong)' }}>
                {earlierRolesTitle || 'Open Source Contributions'}
              </h4>
              <ul className="earlier-roles">
                {earlierRoles.map((role, idx) => (
                  <li key={idx}>
                    <strong>{role.role}</strong>
                    <span>
                      {role.company} · {role.period}
                    </span>
                    <div className="time">{role.summary}</div>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
