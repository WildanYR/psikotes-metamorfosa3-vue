import axios from 'axios'
import config from '../config'
import { errorHandler } from '../helpers/response'
import { generateTokenHeader } from '../helpers/token'

export const getAllImage = async (path) => {
  try {
    const response = await axios.get(
      `${config.apiUrl}/api/image-manager${path ? `?path=${path}` : ''}`,
      { headers: { ...generateTokenHeader() } }
    )
    return response.data.apiData
  } catch (error) {
    throw errorHandler(error)
  }
}

export const uploadImage = async (formData) => {
  try {
    const response = await axios.post(
      `${config.apiUrl}/api/image-manager`,
      formData,
      { headers: { ...generateTokenHeader() } }
    )
    return response.data
  } catch (error) {
    throw errorHandler(error)
  }
}

export const removeImage = async (path) => {
  try {
    const response = await axios.delete(
      `${config.apiUrl}/api/image-manager?path=${path}`,
      { headers: { ...generateTokenHeader() } }
    )
    return response.data
  } catch (error) {
    throw errorHandler(error)
  }
}

export const addNewFolder = async (path) => {
  try {
    const response = await axios.post(
      `${config.apiUrl}/api/image-manager/dir`,
      { path },
      { headers: { ...generateTokenHeader() } }
    )
    return response.data
  } catch (error) {
    throw errorHandler(error)
  }
}

export const removeFolder = async (path) => {
  try {
    const response = await axios.delete(
      `${config.apiUrl}/api/image-manager/dir?path=${path}`,
      { headers: { ...generateTokenHeader() } }
    )
    return response.data
  } catch (error) {
    throw errorHandler(error)
  }
}
