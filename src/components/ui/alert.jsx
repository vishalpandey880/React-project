export function Alert({ className = '', variant = 'default', children, ...props }) {
  return <div className={`ui-alert ui-alert-${variant} ${className}`} {...props}>{children}</div>;
}

export function AlertTitle({ className = '', children, ...props }) {
  return <strong className={`ui-alert-title ${className}`} {...props}>{children}</strong>;
}

export function AlertDescription({ className = '', children, ...props }) {
  return <p className={`ui-alert-description ${className}`} {...props}>{children}</p>;
}
