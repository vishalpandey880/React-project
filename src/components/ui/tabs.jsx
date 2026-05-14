export function Tabs({ value, onValueChange, className = '', children }) {
  return <div className={`ui-tabs ${className}`} data-value={value}>{typeof children === 'function' ? children({ value, onValueChange }) : children}</div>;
}

export function TabsList({ className = '', children }) {
  return <div className={`ui-tabs-list ${className}`}>{children}</div>;
}

export function TabsTrigger({ value, activeValue, onValueChange, className = '', children }) {
  return (
    <button
      type="button"
      className={`ui-tabs-trigger ${activeValue === value ? 'active' : ''} ${className}`}
      onClick={() => onValueChange(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, activeValue, className = '', children }) {
  if (value !== activeValue) return null;
  return <div className={`ui-tabs-content ${className}`}>{children}</div>;
}
