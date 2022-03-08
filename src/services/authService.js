import axios from 'axios'
import config from '../config'
import { errorHandler } from '../helpers/response'
import { generateTokenHeader, storeToken } from '../helpers/token'

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${config.apiUrl}/api/auth/login`, {
      email,
      password
    })
    storeToken(response.data.apiData.token)
    return response.data.apiData
  } catch (error) {
    throw errorHandler(error)
  }
}

export const register = async (
  email,
  password,
  nama_lengkap,
  tempat_tanggal_lahir,
  jenis_kelamin,
  alamat,
  agama,
  pendidikan_terakhir
) => {
  try {
    const response = await axios.post(`${config.apiUrl}/api/auth/register`, {
      email,
      password,
      nama_lengkap,
      tempat_tanggal_lahir,
      jenis_kelamin,
      alamat,
      agama,
      pendidikan_terakhir
    })
    storeToken(response.data.apiData.token)
    return response.data.apiData
  } catch (error) {
    throw errorHandler(error)
  }
}

export const logout = async () => {
  try {
    const response = await axios.post(
      `${config.apiUrl}/api/auth/logout`,
      null,
      { headers: { ...generateTokenHeader() } }
    )
    return response.data.apiData
  } catch (error) {
    throw errorHandler(error)
  }
}

export const registerStatus = async () => {
  try {
    const response = await axios.get(`${config.apiUrl}/api/auth/register`)
    return response.data.apiData
  } catch (error) {
    throw errorHandler(error)
  }
}
