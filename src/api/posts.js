import axiosClient from './axiosClient'

export async function fetchPosts(params = {}) {
  // params can include pagination or filters
  const resp = await axiosClient.get('posts/', { params })
  // DRF DefaultRouter returns results as list for ModelViewSet
  return resp.data
}

export async function fetchPost(id) {
  const resp = await axiosClient.get(`posts/${id}/`)
  return resp.data
}

export async function createPost(payload) {
  const resp = await axiosClient.post('posts/', payload)
  return resp.data
}

export async function updatePost(id, payload) {
  const resp = await axiosClient.put(`posts/${id}/`, payload)
  return resp.data
}

export async function deletePost(id) {
  const resp = await axiosClient.delete(`posts/${id}/`)
  return resp.data
}