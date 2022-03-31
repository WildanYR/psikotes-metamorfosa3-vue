import axios from 'axios'
import config from '../config'
import { errorHandler } from '../helpers/response'
import { generateTokenHeader } from '../helpers/token'

export const detailKelompokTes = async (id) => {
  try {
    const response = await axios.get(
      `${config.apiUrl}/api/kelompok-tes/${id}`,
      { headers: { ...generateTokenHeader() } }
    )
    return response.data.apiData
  } catch (error) {
    throw errorHandler(error)
  }
}

export const addKelompokTes = async (
  alat_tes_id,
  nama,
  waktu = 0,
  petunjuk = null,
  sort_index = 0
) => {
  try {
    const response = await axios.post(
      `${config.apiUrl}/api/kelompok-tes`,
      { nama, waktu, petunjuk, alat_tes_id, sort_index },
      {
        headers: { ...generateTokenHeader() }
      }
    )
    return response.data
  } catch (error) {
    throw errorHandler(error)
  }
}

export const updateKelompokTes = async (
  id,
  nama,
  waktu,
  petunjuk,
  sort_index
) => {
  try {
    const response = await axios.put(
      `${config.apiUrl}/api/kelompok-tes/${id}`,
      { nama, waktu, petunjuk, sort_index },
      {
        headers: { ...generateTokenHeader() }
      }
    )
    return response.data
  } catch (error) {
    throw errorHandler(error)
  }
}

export const deleteKelompokTes = async (id) => {
  try {
    const response = await axios.delete(
      `${config.apiUrl}/api/kelompok-tes/${id}`,
      {
        headers: { ...generateTokenHeader() }
      }
    )
    return response.data
  } catch (error) {
    throw errorHandler(error)
  }
}
