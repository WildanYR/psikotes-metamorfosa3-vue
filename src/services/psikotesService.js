import axios from 'axios'
import config from '../config'
import { errorHandler } from '../helpers/response'
import { generateTokenHeader } from '../helpers/token'

export const getPsikotesStatus = async () => {
  try {
    const response = await axios.get(`${config.apiUrl}/api/psikotes/status`, {
      headers: { ...generateTokenHeader() }
    })
    return response.data.apiData
  } catch (error) {
    throw errorHandler(error)
  }
}

export const getPsikotes = async (alat_tes_id) => {
  try {
    const response = await axios.get(
      `${config.apiUrl}/api/psikotes/kerjakan/${alat_tes_id}`,
      {
        headers: { ...generateTokenHeader() }
      }
    )
    // convert opsi ke object
    response.data.apiData.kelompok_tes.forEach((kelompok_tes, i) => {
      kelompok_tes.soal.forEach((soal, j) => {
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
        response.data.apiData.kelompok_tes[i].soal[j].opsi_soal = opsi_soal
      })
    })
    return response.data.apiData
  } catch (error) {
    throw errorHandler(error)
  }
}

export const submitJawaban = async (alat_tes_id, jawaban) => {
  const jawabanStr = jawaban
    .map((jwb) => jwb.id + ';-;' + jwb.jawaban)
    .join(';=;')
  // persist jawaban
  try {
    const response = await axios.post(
      `${config.apiUrl}/api/psikotes/submit/${alat_tes_id}`,
      { jawaban: jawabanStr },
      {
        headers: { ...generateTokenHeader() }
      }
    )
    return response.data
  } catch (error) {
    throw errorHandler(error)
  }
}
