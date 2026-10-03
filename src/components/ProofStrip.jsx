import React from 'react';
import { Clock, Award, Users, Layers } from 'lucide-react';

const iconMap = {
  Clock: Clock,
  Award: Award,
  Users: Users,
  Layers: Layers,
};

export default function ProofStrip({ stats }) {
  const renderFormattedValue = (val) => {
    if (val.includes('+')) {
      return (
        <>
          {val.replace('+', '')}
          <span className="small">+</span>
        </>
      );
    }
    if (val.includes('/')) {
      const [num, den] = val.split('/');
      return (
        <>
          {num}
          <span className="small">/{den}</span>
        </>
      );
    }
    if (val.includes('M')) {
      return (
        <>
          {val.replace('M', '').replace('+', '')}
          <span className="small">M+</span>
        </>
      );
    }
    return val;
  };

  return (
    <section className="proof-strip" aria-label="Key quantitative metrics">
      {stats.map((item, idx) => {
        const IconComponent = iconMap[item.icon] || Clock;
        return (
          <div key={idx} className="proof-card">
            <IconComponent className="proof-icon" size={18} />
            <span className="proof-value">{renderFormattedValue(item.value)}</span>
            <div className="proof-label">{item.label}</div>
          </div>
        );
      })}
    </section>
  );
}
