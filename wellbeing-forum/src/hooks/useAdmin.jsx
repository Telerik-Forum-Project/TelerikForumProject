import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { isAdmin } from '../services/admin.services';

export default function useAdmin() {
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const checkAdminStatus = async () => {
        const adminStatus = await isAdmin(user.uid);
        setIsAdminUser(adminStatus);
        setLoading(false);
      };
      checkAdminStatus();
    } else {
      setIsAdminUser(false);
      setLoading(false);
    }
  }, [user]);

  return { isAdminUser, loading };
}
