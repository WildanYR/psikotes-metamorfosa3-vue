import PsikotesPetunjuk from '../views/PsikotesPetunjuk.vue'
import PsikotesSoal from '../views/PsikotesSoal.vue'

export default [
  {
    name: 'psikotes_petunjuk',
    path: 'petunjuk',
    component: PsikotesPetunjuk,
    meta: { authRoute: true, authRole: 'USER', psikotes: true }
  },
  {
    name: 'psikotes_soal',
    path: '',
    component: PsikotesSoal,
    meta: { authRoute: true, authRole: 'USER', psikotes: true }
  }
]
