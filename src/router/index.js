import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '../Views/View/InicioView.vue'
import EleccionView from '../Views/View/EleccionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: InicioView
    },
    {
      path: '/eleccion',
      name: 'eleccion',
      component: EleccionView
    }
  ]
})

export default router
