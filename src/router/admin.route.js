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
    }
  },
  {
    name: 'alat_tes_admin',
    path: 'alat-tes',
    component: AlatTesAdmin,
    nav: {
      label: 'Alat Tes',
      icon: DocumentIcon
    }
  },
  {
    name: 'alat_tes_edit_admin',
    path: 'alat-tes/edit/:id',
    component: AlatTesEditAdmin,
    nav: {
      hidden: true,
      label: 'Alat Tes Edit'
    }
  },
  {
    name: 'kelompok_tes_add_admin',
    path: 'kelompok-tes',
    component: KelompokTesAdmin,
    meta: {
      mode: 'add'
    },
    nav: {
      hidden: true,
      label: 'Tambah Kelompok Tes'
    }
  },
  {
    name: 'kelompok_tes_edit_admin',
    path: 'kelompok-tes/edit/:id',
    component: KelompokTesAdmin,
    meta: {
      mode: 'edit'
    },
    nav: {
      hidden: true,
      label: 'Tambah Kelompok Tes'
    }
  },
  {
    name: 'kelompok_tes_soal_admin',
    path: 'kelompok-tes/soal/:id',
    component: SoalAdmin,
    nav: {
      hidden: true,
      label: 'Edit Soal'
    }
  },
  {
    name: 'hasil_psikotes_admin',
    path: 'hasil-psikotes',
    component: HasilPsikotes,
    nav: {
      label: 'Hasil Psikotes',
      icon: CheckCircleIcon
    }
  },
  {
    name: 'user_manager_admin',
    path: 'user',
    component: UnderDevelopment,
    nav: {
      label: 'User Manager',
      icon: UserIcon
    }
  },
  {
    name: 'setting_admin',
    path: 'setting',
    component: UnderDevelopment,
    nav: {
      label: 'Setting',
      icon: CogIcon
    }
  }
]
