// hooks/useAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const useAuth = () => {
  const router = useRouter();
  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    if (!userInfo) {
      router.replace('/Login'); // Redirect to login page if not authenticated
    }
  }, [userInfo, router]);

  return userInfo;
};

export default useAuth;
