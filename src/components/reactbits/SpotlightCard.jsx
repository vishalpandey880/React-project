import { useRef } from 'react';

export function SpotlightCard({ as: Tag = 'div', className = '', children }) {
  const ref = useRef(null);

  const move = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    ref.current.style.setProperty('--rb-x', `${event.clientX - rect.left}px`);
    ref.current.style.setProperty('--rb-y', `${event.clientY - rect.top}px`);
  };

  return (
    <Tag ref={ref} className={`rb-spotlight ${className}`} onMouseMove={move}>
      {children}
    </Tag>
  );
}
