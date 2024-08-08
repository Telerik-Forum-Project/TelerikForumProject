import { ref, push, get, update, remove } from 'firebase/database';
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
    return posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
  }

  return posts;
};

export const getPostById = async (id) => {
  const snapshot = await get(ref(db, `Posts/${id}`));
  if (!snapshot.exists()) {
    throw new Error('Post not found!');
  }

  const postData = snapshot.val();
  const commentsArray = postData.comments
    ? Object.values(postData.comments).map(comment => ({
        ...comment,
      }))
    : [];

  return {
    ...postData,
    likedBy: Object.keys(postData.likedBy ?? {}),
    comments: commentsArray,
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

export const updatePost = async (postId, updatedPost) => {
  const postRef = ref(db, `Posts/${postId}`);
  const snapshot = await get(postRef);

  if (!snapshot.exists()) {
    throw new Error('Post not found!');
  }

  await update(postRef, updatedPost);
};

export const deletePost = async (postId) => {
  const postRef = ref(db, `Posts/${postId}`);
  await remove(postRef);
};

export const addCommentToPost = async (postId, comment) => {
  const commentRef = ref(db, `Posts/${postId}/comments`);
  await push(commentRef, comment);
};