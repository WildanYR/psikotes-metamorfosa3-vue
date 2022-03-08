import { notify } from '@kyvg/vue3-notification'

export const errorHandler = (error) => {
  if (error.response) {
    console.error(error.response.data)
    notify({
      title: 'Error',
      text: error.response.data.message,
      type: 'error'
    })
    return error.response.data
  } else if (error.request) {
    console.error('Request tidak terkirim')
    notify({
      title: 'Tidak terkirim',
      text: 'Cek internet anda',
      type: 'error'
    })
  } else {
    console.error('Error', error.message)
    notify({
      title: 'Error',
      text: 'Terjadi kesalahan pada aplikasi',
      type: 'error'
    })
  }
  return error
}
