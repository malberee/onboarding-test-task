const API_URL = import.meta.env.VITE_API_URL

export const apiRequest = async <T>(
  path: string,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(`${API_URL}${path}`, options)

  if (!response.ok) {
    throw new Error(response.status.toString())
  }

  return response.json()
}
