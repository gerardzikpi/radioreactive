import axiosClient from './axiosClient'

export async function fetchPosts(params = {}) {
  // params can include pagination or filters
  const resp = await axiosClient.get('/api/posts', { params })
  // DRF DefaultRouter returns results as list for ModelViewSet
  return resp.data
}

export default async function fetchPost(id) {
  const resp = await axiosClient.get(`api/posts/${id}/`)
  return resp.data
}

export async function createPost(payload) {
  const resp = await axiosClient.post('posts/', payload)
  return resp.data
}

export async function updatePost(id, payload) {
  const resp = await axiosClient.put(`api/posts/${id}/`, payload)
  return resp.data
}

export  async function deletePost(id) {
  const resp = await axiosClient.delete(`api/posts/${id}/`)
  return resp.data
}
