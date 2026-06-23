import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/', 
      name: 'home', 
      component: () => import('@/views/HomeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/bilan',
      name: 'bilan',
      component: () => import('@/components/BilanView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/formulaire',
      name: 'formulaire',
      component: () => import('@/components/FormulaireView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/liste',
      name: 'liste',
      component: () => import('@/components/ListeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { guest: true }
    }
  ]
})

// ⬇️⬇️⬇️ METTRE ICI EN DEHORS DU createRouter ⬇️⬇️⬇️
router.beforeEach((to, _from) => {
  const auth = useAuth()
  auth.checkAuth()
  
  if (to.meta.requiresAuth && !auth.isAuthenticated.value) {
    return '/login'  // ← SUPPRIMER next() et retourner directement
  }
  
  if (to.meta.guest && auth.isAuthenticated.value) {
    return '/'  // ← SUPPRIMER next() et retourner directement
  }
  
  return true  // ← AJOUTER return true
})

export default router
