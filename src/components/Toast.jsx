import React from 'react';
import { Check } from 'lucide-react';

export default function Toast({ message, visible }) {
  return (
    <div className={`toast ${visible ? 'show' : ''}`} role="status" aria-live="polite">
      <Check size={16} />
      <span>{message}</span>
    </div>
  );
}
