import React from 'react';
import { Mail } from 'lucide-react';

export default function ContactCta({ email, contactCta }) {
  const mailSubject = encodeURIComponent("Regarding AI/ML Engineering Opportunity - Rahul Prasad Yadav");

  return (
    <section className="contact-cta" aria-labelledby="contact-cta-title">
      <div className="contact-cta-content">
        <h2 id="contact-cta-title">{contactCta?.title || 'Looking for an Impactful AI/ML Engineer?'}</h2>
        <p>
          {contactCta?.body ||
            'I am available for AI/ML engineering roles, Generative AI & RAG system development, and high-performance production ML deployment worldwide.'}
        </p>
      </div>
      <a href={`mailto:${email}?subject=${mailSubject}`} className="cta primary">
        <Mail size={15} />
        <span>{contactCta?.button || 'Initiate Conversation'}</span>
      </a>
    </section>
  );
}
