import { useState } from 'react';

export function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false);
  return <div className="ui-dropdown" onMouseLeave={() => setOpen(false)}>{typeof children === 'function' ? children({ open, setOpen }) : children}</div>;
}

export function DropdownMenuTrigger({ className = '', children, onClick, ...props }) {
  return (
    <button className={`ui-dropdown-trigger ${className}`} onClick={onClick} type="button" {...props}>
      {children}
    </button>
  );
}

export function DropdownMenuContent({ className = '', open, children, ...props }) {
  return <div className={`ui-dropdown-content ${open ? 'open' : ''} ${className}`} {...props}>{children}</div>;
}

export function DropdownMenuItem({ className = '', children, ...props }) {
  return <button type="button" className={`ui-dropdown-item ${className}`} {...props}>{children}</button>;
}

export function DropdownMenuSeparator() {
  return <div className="ui-dropdown-separator" />;
}
