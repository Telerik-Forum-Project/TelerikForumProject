import { ref, push, get, update, remove, onValue } from 'firebase/database';
import { db } from '../config/firebase-config'

export const createPost = async (author, title, content, tags) => {
  const post = { author, title, content, createdOn: new Date().toString(), tags};
  const result = await push(ref(db, 'Posts'), post);
  const id = result.key;
  await update(ref(db), {
    [`Posts/${id}/id`]: id,
  });
  return id;
};

export const getAllPosts = async () => {
  const snapshot = await get(ref(db, 'Posts'));
  if (!snapshot.exists()) return [];

  return Object.values(snapshot.val()).map(post => ({
    ...post,
    likeCount: post.likedBy ? Object.keys(post.likedBy).length : 0,
  }));
};


export const searchPosts = (posts, search = '', searchType = 'content') => {
  if (!search) return posts;

  if (searchType === 'content') {
    return posts.filter(p => p.content.toLowerCase().includes(search.toLowerCase()));
  } else if (searchType === 'tag') {
    return posts.filter(p => p.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())));
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
    ? Object.entries(postData.comments).map(([firebaseKey, comment]) => ({
        id: firebaseKey, 
        author: comment.author,
        content: comment.content,
        createdOn: comment.createdOn,
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

export const sortPostsByCommentCount = (posts) => {
  return posts
    .map(post => ({
      ...post,
      commentCount: post.comments ? Object.keys(post.comments).length : 0,
    }))
    .sort((a, b) => b.commentCount - a.commentCount);
};

export const updateComment = async (postId, commentId, updatedComment) => {
  const commentRef = ref(db, `Posts/${postId}/comments/${commentId}`);
  try {
    await update(commentRef, updatedComment);
  } catch (error) {
    throw new Error('Failed to update comment: ' + error.message);
  }
};


export const deleteComment = async (postId, commentId) => {
  const commentRef = ref(db, `Posts/${postId}/comments/${commentId}`);
  try {
    await remove(commentRef);
  } catch (error) {
    throw new Error('Failed to delete comment: ' + error.message);
  }
};

export const getRecentPostsRealtime = (callback) => {
  const postsRef = ref(db, 'Posts');
  
  onValue(postsRef, (snapshot) => {
    if (!snapshot.exists()) {
      callback([]);
      return;
    }
    
    const posts = Object.values(snapshot.val());

    posts.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));

    callback(posts.slice(0, 10));
  });
};

export const getUniqueCommentId = () => {
  const newCommentRef = push(ref(db, 'comments'));
  return newCommentRef.key;
};
