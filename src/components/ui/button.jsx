export function Button({ className = '', variant = 'default', size = 'default', asChild = false, children, ...props }) {
  const Comp = asChild ? 'span' : 'button';
  return (
    <Comp className={`ui-button ui-button-${variant} ui-button-${size} ${className}`} {...props}>
      {children}
    </Comp>
  );
}
