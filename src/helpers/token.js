export const storeToken = (token) => {
  localStorage.setItem('token', token)
}

export const generateTokenHeader = () => {
  const token = localStorage.getItem('token')
  return { Authorization: `Bearer ${token}` }
}
