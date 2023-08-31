const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function getAllPosts() {
  const response = await fetch(`${API_BASE_URL}/posts?_start=0&_limit=9`);
  return response.json();
}

export async function getPostById(postId) {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}`);
  return response.json();
}

export async function getPostCommentsById(postId) {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
  return response.json();
}

export async function updatePost(postId, newPostData) {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPostData),
  });
  return response.json();
}

export async function createPost(postData) {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  return response.json();
}

export async function removePost(postId) {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: 'DELETE',
  });
  return response.json();
}
