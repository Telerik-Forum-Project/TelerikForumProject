import { get, set, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../config/firebase-config';

export const getUserByHandle = async (handle) => {

    const snapshot = await get(ref(db, `users/${handle}`));

  return snapshot.val();
};

export const createUserHandle = (handle, uid, email) => {

  return set(ref(db, `users/${handle}`), { handle, uid, email, createdOn: new Date(), likedTweets: {} })
};

export const getUserData = (uid) => {

  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};