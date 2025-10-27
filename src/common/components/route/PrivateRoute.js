import { Navigate } from 'react-router-dom';
// import { useAuth } from '../../../features/auth/hooks/AuthContext';
// import { authPath } from '../../../common/hooks/urlManager';

/* 로그인 상태의 유저 검증  */
export default function PrivateRoute ({ children }) {
  // const { isAuthenticated  } = useAuth();

  // if (!isAuthenticated ) { return <Navigate to={authPath.login} replace />; }
  return children;
};