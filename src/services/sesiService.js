import axios from 'axios'
import config from '../config'
import { errorHandler } from '../helpers/response'
import { generateTokenHeader } from '../helpers/token'

export const getSesi = async () => {
  try {
    const response = await axios.get(`${config.apiUrl}/api/sesi`, {
      headers: { ...generateTokenHeader() }
    })
    return response.data.apiData
  } catch (error) {
    throw errorHandler(error)
  }
}

export const addSesi = async (nama, aktif = false) => {
  try {
    const response = await axios.post(
      `${config.apiUrl}/api/sesi`,
      { nama, aktif },
      {
        headers: { ...generateTokenHeader() }
      }
    )
    return response.data
  } catch (error) {
    throw errorHandler(error)
  }
}

export const setSesiAktif = async (id) => {
  try {
    const response = await axios.put(
      `${config.apiUrl}/api/sesi/${id}`,
      { aktif: true },
      {
        headers: { ...generateTokenHeader() }
      }
    )
    return response.data
  } catch (error) {
    throw errorHandler(error)
  }
}

export const deleteSesi = async (id) => {
  try {
    const response = await axios.delete(`${config.apiUrl}/api/sesi/${id}`, {
      headers: { ...generateTokenHeader() }
    })
    return response.data
  } catch (error) {
    throw errorHandler(error)
  }
}

export const resetSesi = async () => {
  try {
    const response = await axios.post(
      `${config.apiUrl}/api/sesi/disable`,
      null,
      {
        headers: { ...generateTokenHeader() }
      }
    )
    return response.data
  } catch (error) {
    throw errorHandler(error)
  }
}
