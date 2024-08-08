import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { isAdmin } from '../services/user.services';

export default function useAdmin() {
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const adminStatus = await isAdmin(user.uid);
        setIsAdminUser(adminStatus);
      }
      setLoading(false);
    };

    checkAdminStatus();
  }, [user]);

  return { isAdminUser, loading };
}
