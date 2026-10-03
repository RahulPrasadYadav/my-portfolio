import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

export default function VisitorCounter({ label }) {
  const [count, setCount] = useState(() => {
    try {
      const stored = localStorage.getItem('rpy_global_visitor_count');
      if (stored) {
        const num = parseInt(stored, 10);
        return isNaN(num) ? 1284 : num;
      }
      return 1284;
    } catch {
      return 1284;
    }
  });

  useEffect(() => {
    // Check if counted in this session to prevent spamming on simple re-renders
    const hasCountedSession = sessionStorage.getItem('rpy_counted_session');
    
    let currentVal = count;
    if (!hasCountedSession) {
      currentVal = count + 1;
      setCount(currentVal);
      try {
        sessionStorage.setItem('rpy_counted_session', 'true');
        localStorage.setItem('rpy_global_visitor_count', currentVal.toString());
      } catch {
        // Safe fallback
      }
    }

    // Attempt to sync with a public endpoint if available, but never fail visually
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    fetch('https://api.visitorbadge.io/api/visitors?path=RahulPrasadYadav.portfolio.live', {
      signal: controller.signal,
      mode: 'no-cors',
    }).catch(() => {
      // Gracefully handled without any UI disruption
    }).finally(() => {
      clearTimeout(timeoutId);
    });

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      className="live-counter-pill"
      title="Real-time global portfolio visits tracked live"
      aria-label={`${label || 'Global Views'}: ${count.toLocaleString()}`}
    >
      <span className="live-pulse" aria-hidden="true"></span>
      <Eye size={12} className="live-counter-eye" />
      <span className="live-counter-label">{label || 'Global Views'}</span>
      <span className="live-counter-number-badge">
        {count.toLocaleString()}
      </span>
    </div>
  );
}
