import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export function ProtectedRoute({ children }) {
  const { currentUser } = useStore();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
