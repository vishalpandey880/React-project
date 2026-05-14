export function Progress({ value = 0, className = '', ...props }) {
  return (
    <div className={`ui-progress ${className}`} {...props}>
      <span style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}
