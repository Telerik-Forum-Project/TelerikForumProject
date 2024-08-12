import { get, set, ref, query, equalTo, orderByChild, update } from 'firebase/database';
import { db, auth } from '../config/firebase-config';


export const getAllUsers = async () => {
  const snapshot = await get(ref(db, 'users'));
  if (!snapshot.exists()) return [];
  return snapshot;
}
export const getUserByHandle = async (handle) => {
  const snapshot = await get(ref(db, `users/${handle}`));
  return snapshot.val();
};

export const createUserHandle = async (handle, uid, email, firstName, lastName, phoneNumber = '', isAdmin = false, isBlocked = false) => {
  const user = { handle, uid, email, firstName, lastName, phoneNumber, createdOn: new Date().toString(), isBlocked, isAdmin };
  await set(ref(db, `users/${handle}`), user);
};

export const getUserData = async (uid) => {
  const snapshot = await get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
  return snapshot.val();
};

export const toggleUserBlock = async (handle) => {
  const userRef = ref(db, `users/${handle}`);

  const snapshot = await get(userRef);

  if (snapshot.exists()) {
    const userData = snapshot.val();
    const currentStatus = userData.isBlocked;

    const newStatus = !currentStatus;

    await update(userRef, { isBlocked: newStatus });
  } else {
    console.error('User does not exist');
  }
};


export const searchUsers = async (search = '') => {
  try {
    const snapshot = await get(ref(db, 'users'));
    
    if (!snapshot.exists()) return [];

    const users = Object.values(snapshot.val());

    if (search) {
      const lowercase = search.toLowerCase();
      return users.filter(user => {
        const handle = user.handle || '';
        const firstName = user.firstName || '';
        const lastName = user.lastName || '';

        return handle.toLowerCase().includes(lowercase) ||
               firstName.toLowerCase().includes(lowercase) ||
               lastName.toLowerCase().includes(lowercase);
      });
    }

    return users;
  } catch (error) {
    console.error(`Error fetching users: ${error}`);
    return [];
  }
}

export const updateUserData = async (uid, updatedData) => {
  try {
    const userRef = query(ref(db, 'users'), orderByChild('uid'), equalTo(uid));
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userKey = Object.keys(snapshot.val())[0];

      await update(ref(db, `users/${userKey}`), updatedData);

      console.log(`User ${userKey} data updated successfully.`);
    } else {
      console.error('User does not exist');
    }
  } catch (error) {
    console.error(`Failed to update user data: ${error}`);
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};


// export const createUserHandle = (handle, uid, email) => {

//   return set(ref(db, `users/${handle}`), { handle, uid, email, createdOn: new Date(), likedTweets: {} })
// };

// export const getUserData = (uid) => {

//   return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
// };