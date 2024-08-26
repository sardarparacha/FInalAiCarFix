// components/ProtectedRoute.js
import useAuth from '../hook/useAuth';

const ProtectedRoute = ({ children }) => {
  const user = useAuth();
  return user ? children : null;
};

export default ProtectedRoute;
