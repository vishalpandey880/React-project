import { BookOpen } from 'lucide-react';

export function EmptyState({ title, text, action }) {
  return (
    <div className="empty-state">
      <span><BookOpen size={32} /></span>
      <h2>{title}</h2>
      <p>{text}</p>
      {action}
    </div>
  );
}
