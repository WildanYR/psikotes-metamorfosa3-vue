import { HomeIcon } from '@heroicons/vue/outline'

import DashboardPeserta from '../views/DashboardPeserta.vue'

export default [
  {
    name: 'dashboard_peserta',
    path: '/',
    component: DashboardPeserta,
    nav: {
      label: 'Dashboard',
      icon: HomeIcon
    }
  }
]
