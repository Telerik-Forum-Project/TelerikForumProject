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

export const toggleUserBlock = async (handle, block) => {
  const user = ref(db, `users/${handle}`)
  await set(user, { isBlocked: block })
}

export const searchUsers = async (search = '') => {
  try {
    const snapshot = await get(ref(db, 'users'))

    if (!snapshot.exists()) return [];

    const users = Object.values(snapshot.val());

    if (search) {
      const lowercase = search.toLocaleLowerCase();
      return users.filter(user => 
        user.handle.toLocaleLowerCase().includes(lowercase) ||
        user.firstName.toLocaleLowerCase().includes(lowercase) ||
        user.lastName.toLocaleLowerCase().includes(lowercase)
      );
    }

    return users;
  } catch (error) {
    console.error(`Error fetching users ${error}`)
    return [];
  }
}

// export const createUserHandle = (handle, uid, email) => {

//   return set(ref(db, `users/${handle}`), { handle, uid, email, createdOn: new Date(), likedTweets: {} })
// };

// export const getUserData = (uid) => {

//   return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
// };