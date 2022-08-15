import { defineStore } from 'pinia'

export const usePsikotesStore = defineStore('psikotes', {
  state: () => ({
    alat_tes: null,
    kelompok_tes_index: 0,
    lock: false,
    timer: null,
    timer_start: 0,
    mengerjakan: false,
    jawaban: [],
    jumlah_terjawab: 0
  }),
  actions: {
    resetState() {
      this.alat_tes = null
      this.kelompok_tes_index = 0
      this.lock = false
      this.timer = null
      this.timer_start = 0
      this.mengerjakan = false
      this.jawaban = []
      this.jumlah_terjawab = 0
    }
  },
  persist: true
})
