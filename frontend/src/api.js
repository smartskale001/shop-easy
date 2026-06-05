const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function request(path) {
  const res = await fetch(`${API_URL}${path}`)
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`)
  }
  return res.json()
}

export async function fetchProducts({ search = '', category = 'All' } = {}) {
  const params = new URLSearchParams()
  if (search) params.set('search', search)
  if (category && category !== 'All') params.set('category', category)
  const qs = params.toString()
  const data = await request(`/api/products${qs ? `?${qs}` : ''}`)
  return data.products
}

export async function fetchProduct(id) {
  return request(`/api/products/${id}`)
}

export async function fetchCategories() {
  const data = await request('/api/categories')
  return data.categories
}
