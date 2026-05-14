export function Switch({ checked, onCheckedChange, className = '', ...props }) {
  return (
    <button
      type="button"
      className={`ui-switch ${checked ? 'checked' : ''} ${className}`}
      onClick={() => onCheckedChange?.(!checked)}
      aria-pressed={checked}
      {...props}
    >
      <span />
    </button>
  );
}
