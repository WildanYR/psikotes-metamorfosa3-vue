import {
  CogIcon,
  UserIcon,
  DocumentIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/vue/outline'

import AlatTesAdmin from '../views/AlatTesAdmin.vue'
import AlatTesEditAdmin from '../views/AlatTesEditAdmin.vue'
import KelompokTesAdmin from '../views/KelompokTesAdmin.vue'
import SoalAdmin from '../views/SoalAdmin.vue'
import SesiAdmin from '../views/SesiAdmin.vue'
import UnderDevelopment from '../views/UnderDevelopment.vue'
import HasilPsikotes from '../views/HasilPsikotes.vue'

export default [
  {
    name: 'sesi_admin',
    path: '',
    component: SesiAdmin,
    nav: {
      label: 'Sesi',
      icon: ClockIcon
    },
    meta: { authRoute: true, authRole: 'ADMIN' }
  },
  {
    name: 'alat_tes_admin',
    path: 'alat-tes',
    component: AlatTesAdmin,
    nav: {
      label: 'Alat Tes',
      icon: DocumentIcon
    },
    meta: { authRoute: true, authRole: 'ADMIN' }
  },
  {
    name: 'alat_tes_edit_admin',
    path: 'alat-tes/:id',
    component: AlatTesEditAdmin,
    nav: {
      hidden: true,
      label: 'Alat Tes Edit'
    },
    meta: { authRoute: true, authRole: 'ADMIN' }
  },
  {
    name: 'kelompok_tes_add_admin',
    path: 'alat-tes/:alatTesId/kelompok-tes',
    component: KelompokTesAdmin,
    meta: {
      mode: 'add',
      authRoute: true,
      authRole: 'ADMIN'
    },
    nav: {
      hidden: true,
      label: 'Tambah Kelompok Tes'
    }
  },
  {
    name: 'kelompok_tes_edit_admin',
    path: 'alat-tes/:alatTesId/kelompok-tes/:id',
    component: KelompokTesAdmin,
    meta: {
      mode: 'edit',
      authRoute: true,
      authRole: 'ADMIN'
    },
    nav: {
      hidden: true,
      label: 'Tambah Kelompok Tes'
    }
  },
  {
    name: 'kelompok_tes_soal_admin',
    path: 'alat-tes/:alatTesId/kelompok-tes/:id/soal',
    component: SoalAdmin,
    nav: {
      hidden: true,
      label: 'Edit Soal'
    },
    meta: { authRoute: true, authRole: 'ADMIN' }
  },
  {
    name: 'hasil_psikotes_admin',
    path: 'hasil-psikotes',
    component: HasilPsikotes,
    nav: {
      label: 'Hasil Psikotes',
      icon: CheckCircleIcon
    },
    meta: { authRoute: true, authRole: 'ADMIN' }
  },
  {
    name: 'user_manager_admin',
    path: 'user',
    component: UnderDevelopment,
    nav: {
      label: 'User Manager',
      icon: UserIcon
    },
    meta: { authRoute: true, authRole: 'ADMIN' }
  },
  {
    name: 'setting_admin',
    path: 'setting',
    component: UnderDevelopment,
    nav: {
      label: 'Setting',
      icon: CogIcon
    },
    meta: { authRoute: true, authRole: 'ADMIN' }
  }
]
