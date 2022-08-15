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
        if (soal.teks) {
          response.data.apiData.kelompok_tes[i].soal[j].teks =
            soal.teks.replace(/==cdn_url==/g, config.cdnUrl)
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
    ? jawaban.map((jwb) => jwb.id + ';-;' + jwb.jawaban || '-').join(';=;')
    : ''
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

export const getUserPsikotes = async (sesi_id, alat_tes_id) => {
  try {
    const response = await axios.get(
      `${config.apiUrl}/api/psikotes/user/${sesi_id}/${alat_tes_id}`,
      {
        headers: { ...generateTokenHeader() }
      }
    )
    return response.data.apiData
  } catch (error) {
    throw errorHandler(error)
  }
}

export const getJawabanUserPsikotes = async (sesi_id, alat_tes_id, user_id) => {
  try {
    const response = await axios.get(
      `${config.apiUrl}/api/psikotes/user/${sesi_id}/${alat_tes_id}/${user_id}`,
      {
        headers: { ...generateTokenHeader() }
      }
    )
    const kelompokTesData = response.data.apiData.kelompok_tes
    let jawabanUser = ''
    if (response.data.apiData.jawaban) {
      jawabanUser = response.data.apiData.jawaban.split(';=;').map((jwb) => {
        const [id, jawaban] = jwb.split(';-;')
        return { id, jawaban }
      })
    }
    let kelompokTes = []
    for (const keltes of kelompokTesData) {
      const jenis_soal_kelompok = keltes.soal[0].jenis_soal === 'kelompok'
      const kelompokDetail = {
        nama: keltes.nama,
        soal: [],
        jenis_soal_kelompok
      }
      if (jenis_soal_kelompok) {
        let jenisSoalKelompok = []
        for (const soal of keltes.soal) {
          let jawabanKelompok = '-'
          if (jawabanUser) {
            for (const jawaban of jawabanUser) {
              if (soal.id === jawaban.id) {
                jawabanKelompok = jawaban.jawaban
              }
            }
          }
          const kelompokIndex = jenisSoalKelompok.findIndex(
            (item) => item.nomor === jawabanKelompok
          )
          if (kelompokIndex < 0) {
            jenisSoalKelompok.push({ nomor: jawabanKelompok, jawaban: 1 })
          } else {
            const jumlah = jenisSoalKelompok[kelompokIndex].jawaban
            jenisSoalKelompok[kelompokIndex].jawaban = jumlah + 1
          }
        }
        kelompokDetail.soal = jenisSoalKelompok
      } else {
        for (const soal of keltes.soal) {
          const soalDetail = { nomor: soal.nomor, jawaban: '' }
          for (const jawaban of jawabanUser) {
            if (soal.id === jawaban.id) {
              soalDetail.jawaban = jawaban.jawaban
            }
          }
          kelompokDetail.soal.push(soalDetail)
        }
      }
      kelompokTes.push(kelompokDetail)
    }
    return kelompokTes
  } catch (error) {
    throw errorHandler(error)
  }
}

export const saveLocalJawaban = (
  user_id,
  alat_tes_id,
  alat_tes_nama,
  jawaban
) => {
  const key = `${user_id.replace(/-/g, '')}_${alat_tes_id.replace(/-/g, '')}`
  const data = {
    user_id,
    alat_tes_id,
    alat_tes_nama,
    jawaban
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export const getLocalJawaban = (key) => {
  return JSON.parse(localStorage.getItem(key))
}
