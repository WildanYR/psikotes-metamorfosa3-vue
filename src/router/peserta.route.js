import { HomeIcon } from '@heroicons/vue/outline'

const DashboardPeserta = () => import('../views/DashboardPeserta.vue')

export default [
  {
    name: 'dashboard_peserta',
    path: '',
    component: DashboardPeserta,
    nav: {
      label: 'Dashboard',
      icon: HomeIcon
    },
    meta: { authRoute: true, authRole: 'USER' }
  }
]
