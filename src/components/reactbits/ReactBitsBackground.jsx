export function ReactBitsBackground({ children, className = '' }) {
  return (
    <div className={`rb-background ${className}`}>
      <span />
      <span />
      <span />
      {children}
    </div>
  );
}
