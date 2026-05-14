import { useStore } from '../context/StoreContext';

export function Toasts() {
  const { toasts } = useStore();
  return (
    <div className="toast-stack">
      {toasts.map((toast) => (
        <div className="toast" key={toast.id}>{toast.message}</div>
      ))}
    </div>
  );
}
