import axios from 'axios'
import config from '../config'
import { errorHandler } from '../helpers/response'
import { generateTokenHeader } from '../helpers/token'

export const getAlatTes = async (aktif = null) => {
  try {
    let activeQueryString = ''
    if (typeof aktif === 'boolean') {
      activeQueryString = `?aktif=${aktif ? '1' : '0'}`
    }
    const response = await axios.get(
      `${config.apiUrl}/api/alat-tes${activeQueryString}`,
      { headers: { ...generateTokenHeader() } }
    )
    return response.data.apiData
  } catch (error) {
    throw errorHandler(error)
  }
}

export const detailAlatTes = async (id) => {
  try {
    const response = await axios.get(`${config.apiUrl}/api/alat-tes/${id}`, {
      headers: { ...generateTokenHeader() }
    })
    return response.data.apiData
  } catch (error) {
    throw errorHandler(error)
  }
}

export const addAlatTes = async (nama, aktif = false, sort_index = 0) => {
  try {
    const response = await axios.post(
      `${config.apiUrl}/api/alat-tes`,
      { nama, aktif, sort_index },
      {
        headers: { ...generateTokenHeader() }
      }
    )
    return response.data
  } catch (error) {
    throw errorHandler(error)
  }
}

export const updateAlatTes = async (id, nama, sort_index) => {
  try {
    const response = await axios.put(
      `${config.apiUrl}/api/alat-tes/${id}`,
      { nama, sort_index },
      {
        headers: { ...generateTokenHeader() }
      }
    )
    return response.data
  } catch (error) {
    throw errorHandler(error)
  }
}

export const deleteAlatTes = async (id) => {
  try {
    const response = await axios.delete(`${config.apiUrl}/api/alat-tes/${id}`, {
      headers: { ...generateTokenHeader() }
    })
    return response.data
  } catch (error) {
    throw errorHandler(error)
  }
}

export const setAlatTesAktif = async (id, aktif) => {
  try {
    const response = await axios.put(
      `${config.apiUrl}/api/alat-tes/${id}`,
      { aktif },
      {
        headers: { ...generateTokenHeader() }
      }
    )
    return response.data
  } catch (error) {
    throw errorHandler(error)
  }
}
