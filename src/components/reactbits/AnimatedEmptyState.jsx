import { Sparkles } from 'lucide-react';

export function AnimatedEmptyState({ title, text, action }) {
  return (
    <div className="rb-empty">
      <span><Sparkles size={30} /></span>
      <h2>{title}</h2>
      <p>{text}</p>
      {action}
    </div>
  );
}
