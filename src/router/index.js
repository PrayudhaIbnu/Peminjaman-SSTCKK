import { createRouter, createWebHistory } from 'vue-router'
import BarangList from '../views/BarangList.vue'
import BarangForm from '@/views/BarangForm.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/barang-form',
      name: 'BarangForm',
      component: BarangForm
    },
    {
      path: '/barang-list',
      name: 'BarangList',
      component: BarangList
    },
  ]
})

export default router
