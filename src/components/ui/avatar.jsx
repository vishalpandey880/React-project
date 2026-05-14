export function Avatar({ className = '', children, ...props }) {
  return <span className={`ui-avatar ${className}`} {...props}>{children}</span>;
}

export function AvatarImage({ className = '', ...props }) {
  return <img className={`ui-avatar-image ${className}`} {...props} />;
}

export function AvatarFallback({ className = '', children, ...props }) {
  return <span className={`ui-avatar-fallback ${className}`} {...props}>{children}</span>;
}
