export function Dialog({ open, children }) {
  if (!open) return null;
  return <>{children}</>;
}

export function DialogContent({ className = '', children, ...props }) {
  return (
    <div className="ui-dialog-backdrop">
      <div className={`ui-dialog-content ${className}`} {...props}>{children}</div>
    </div>
  );
}

export function DialogHeader({ className = '', children, ...props }) {
  return <div className={`ui-dialog-header ${className}`} {...props}>{children}</div>;
}

export function DialogTitle({ className = '', children, ...props }) {
  return <h2 className={`ui-dialog-title ${className}`} {...props}>{children}</h2>;
}

export function DialogDescription({ className = '', children, ...props }) {
  return <p className={`ui-dialog-description ${className}`} {...props}>{children}</p>;
}

export function DialogFooter({ className = '', children, ...props }) {
  return <div className={`ui-dialog-footer ${className}`} {...props}>{children}</div>;
}
