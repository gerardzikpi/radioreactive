import axiosClient from './axiosClient'

export async function fetchPosts(params = {}) {
  // params can include pagination or filters
  // axiosClient.baseURL already points to /api/, so request the viewset path 'posts/'
  const resp = await axiosClient.get('posts/', { params })
  return resp.data
}

export default async function fetchPost(id) {
  const resp = await axiosClient.get(`posts/${id}/`)
  return resp.data
}

export async function createPost(payload) {
  // Return the full axios response so caller can inspect status/data consistently
  const resp = await axiosClient.post('posts/', payload)
  return resp
}

export async function updatePost(id, payload) {
  const resp = await axiosClient.put(`posts/${id}/`, payload)
  return resp.data
}

export async function deletePost(id) {
  const resp = await axiosClient.delete(`posts/${id}/`)
  return resp.data
}
