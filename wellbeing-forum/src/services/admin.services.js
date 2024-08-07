import { get, ref } from 'firebase/database';
import { db } from '../config/firebase-config';


export const isAdmin = async (uid) => {
  const snapshot = await get(ref(db, `users`));
  if (!snapshot.exists()) return false;

  const users = snapshot.val();
  const user = Object.values(users).find(user => user.uid === uid);
  
  return user ? user.isAdmin : false;
};
