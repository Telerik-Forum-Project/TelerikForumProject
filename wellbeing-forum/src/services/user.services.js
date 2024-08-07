import { get, set, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../config/firebase-config';

export const getUserByHandle = async (handle) => {
  const snapshot = await get(ref(db, `users/${handle}`));
  return snapshot.val();
};

export const createUserHandle = async (handle, uid, email, firstName, lastName, phoneNumber = '', isAdmin = false) => {
  const user = { handle, uid, email, firstName, lastName, phoneNumber, createdOn: new Date().toString(), isBlocked: false, isAdmin };
  await set(ref(db, `users/${handle}`), user);
};

export const getUserData = async (uid) => {
  const snapshot = await get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
  return snapshot.val();
};


// export const createUserHandle = (handle, uid, email) => {

//   return set(ref(db, `users/${handle}`), { handle, uid, email, createdOn: new Date(), likedTweets: {} })
// };

// export const getUserData = (uid) => {

//   return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
// };