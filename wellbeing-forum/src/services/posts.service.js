import { ref, push, get, update } from 'firebase/database';
import { db } from '../config/firebase-config'

export const createPost = async (author, title, content, tags) => {
  const post = { author, title, content, createdOn: new Date().toString(), tags};
  const result = await push(ref(db, 'Posts'), post);
  const id = result.key;
  await update(ref(db), {
    [`Posts/${id}/id`]: id,
  });
};

export const getAllPosts = async (search = '') => {
  const snapshot = await get(ref(db, 'Posts'));
  if (!snapshot.exists()) return [];

  const posts = Object.values(snapshot.val());

  if (search) {
    return posts.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
  }

  return posts;
};

export const getPostById = async (id) => {
  const snapshot = await get(ref(db, `Posts/${id}`));
  if (!snapshot.exists()) {
    throw new Error('Post not found!');
  }

  return {
    ...snapshot.val(),
    likedBy: Object.keys(snapshot.val().likedBy ?? {}),
  };
};

export const likePost = (handle, postId) => {
  const updateObject = {
    [`Posts/${postId}/likedBy/${handle}`]: true,
    [`users/${handle}/likedPosts/${postId}`]: true,
  };

  return update(ref(db), updateObject);
};

export const dislikePost = (handle, postId) => {
  const updateObject = {
    [`Posts/${postId}/likedBy/${handle}`]: null,
    [`users/${handle}/likedPosts/${postId}`]: null,
  };

  return update(ref(db), updateObject);
};