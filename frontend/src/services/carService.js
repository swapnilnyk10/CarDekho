// const API_BASE = 'http://localhost:8080/api/cars'
const API = import.meta.env.VITE_API_BASE_URL + 'api/cars';

export async function getCars(params = {}) {
  const query = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      query.append(key, value)
    }
  })

  const url = query.toString() ? `${API_BASE}/filter?${query.toString()}` : API_BASE
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Unable to fetch cars')
  }

  return response.json()
}
