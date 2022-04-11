import axios from 'axios'
import config from '../config'
import { errorHandler } from '../helpers/response'
import { generateTokenHeader } from '../helpers/token'
import { compareHashObject, hashObject } from '../helpers/hashObject'

export const getKelompokTesSoal = async (id) => {
  try {
    const response = await axios.get(
      `${config.apiUrl}/api/soal?kelompok_tes_id=${id}`,
      { headers: { ...generateTokenHeader() } }
    )
    const signedSoal = response.data.apiData.map((soal) => {
      const signature = hashObject(soal)
      let opsi_soal = soal.jenis_soal === 'kelompok' ? soal.opsi_soal : null
      if (soal.jenis_soal !== 'kelompok' && soal.opsi_soal) {
        // A;-;image;-;image_name;=;
        opsi_soal = soal.opsi_soal.split(';=;').map((op) => {
          const opsiObj = op.split(';-;')
          return {
            value: opsiObj[0],
            type: opsiObj[1],
            teks: opsiObj[2]
          }
        })
      }
      return { ...soal, opsi_soal, signature }
    })
    return signedSoal
  } catch (error) {
    throw errorHandler(error)
  }
}

const opsiToString = (opsi) => {
  return opsi.map((op) => `${op.value};-;${op.type};-;${op.teks}`).join(';=;')
}
export const mutateSoal = async (soals) => {
  let mutateData = {
    insert: [],
    update: [],
    delete: []
  }
  soals.forEach((soal) => {
    let opsi_soal = soal.jenis_soal === 'kelompok' ? soal.opsi_soal : null
    if (
      ['pilgan_y', 'pilgan_x', 'multichoice_y', 'multichoice_x'].includes(
        soal.jenis_soal
      ) &&
      soal.opsi_soal
    ) {
      opsi_soal = opsiToString(soal.opsi_soal)
    }
    // insert soal
    if (!soal.signature) {
      mutateData.insert.push({ ...soal, opsi_soal })
    } else {
      // delete soal
      if (soal.remove) {
        mutateData.delete.push(soal.id)
      } else {
        // update soal
        const { signature, ...soalObj } = soal

        if (!compareHashObject({ ...soalObj, opsi_soal }, signature)) {
          const { createdAt, updatedAt, ...updateSoal } = soalObj
          mutateData.update.push({ ...updateSoal, opsi_soal })
        }
      }
    }
  })
  try {
    if (
      !mutateData.insert.length &&
      !mutateData.update.length &&
      !mutateData.delete.length
    ) {
      throw { response: { data: { message: 'Tidak ada perubahan pada soal' } } }
    }
    const response = await axios.post(`${config.apiUrl}/api/soal`, mutateData, {
      headers: { ...generateTokenHeader() }
    })
    return response.data
  } catch (error) {
    throw errorHandler(error)
  }
}
