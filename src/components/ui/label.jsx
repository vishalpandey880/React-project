export function Label({ className = '', children, ...props }) {
  return <label className={`ui-label ${className}`} {...props}>{children}</label>;
}
