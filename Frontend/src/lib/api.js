const BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')

function getToken() {
  return localStorage.getItem('token')
}

export function setToken(token) {
  if (token) localStorage.setItem('token', token)
  else localStorage.removeItem('token')
}

export async function api(path, { method = 'GET', body, headers = {}, signal } = {}) {
  if (!BASE_URL) {
    throw new Error('VITE_API_BASE_URL is not set')
  }

  const config = {
    method,
    signal,
    headers: {
      Accept: 'application/json',
      ...headers,
    },
  }

  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`

  if (body !== undefined) {
    config.headers['Content-Type'] = 'application/json'
    config.body = JSON.stringify(body)
  }

  const res = await fetch(`${BASE_URL}${path}`, config)

  if (res.status === 204) return null

  const text = await res.text()
  let data = null
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  if (!res.ok) {
    const message =
      (data && typeof data === 'object' && (data.detail || data.message)) ||
      (typeof data === 'string' && data) ||
      `Request failed with status ${res.status}`
    const error = new Error(message)
    error.status = res.status
    error.data = data
    throw error
  }

  return data
}

export const apiGet = (path, options) => api(path, { ...options, method: 'GET' })
export const apiPost = (path, body, options) => api(path, { ...options, method: 'POST', body })
export const apiPut = (path, body, options) => api(path, { ...options, method: 'PUT', body })
export const apiPatch = (path, body, options) => api(path, { ...options, method: 'PATCH', body })
export const apiDelete = (path, options) => api(path, { ...options, method: 'DELETE' })
