// frontend/src/composables/useAuth.js
import { ref, computed, readonly } from 'vue'

// États globaux
const user = ref(null)
const isAuthenticated = ref(false)
const loading = ref(false)

export function useAuth() {
  // Action de connexion
        const login = (email, password) => {
            loading.value=true
  return new Promise((resolve) => {
    setTimeout(() => {
      const userData = {
        id: 1,
        name: 'Dr. Jean Dupont',
        email: email || 'jean.dupont@medicos.com',
        role: 'medecin',
        specialite: 'Cardiologie',
        avatar: 'https://ui-avatars.com/api/?name=JD&background=0D9488&color=fff'
      }
      
      user.value = userData
      isAuthenticated.value = true
      
      localStorage.setItem('medicos_token', 'fake_jwt_token_12345')
      localStorage.setItem('medicos_user', JSON.stringify(userData))
      
      loading.value = false  // ← S'assurer que loading passe à false
      
      resolve(userData)
    }, 500)
  })
}
        

  // Action de déconnexion
  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    loading.value = false
    localStorage.removeItem('medicos_token')
    localStorage.removeItem('medicos_user')
  }

  // Vérifier l'authentification
  const checkAuth = () => {
    const token = localStorage.getItem('medicos_token')
    const storedUser = localStorage.getItem('medicos_user')
    
    if (token && storedUser) {
      try {
        user.value = JSON.parse(storedUser)
        isAuthenticated.value = true
        return true
      } catch (e) {
        localStorage.removeItem('medicos_user')
        return false
      }
    }
    return false
  }

  // Computed
  const getUser = computed(() => user.value)
  const getIsAuthenticated = computed(() => isAuthenticated.value)
  const getLoading = computed(() => loading.value)
  const getUserRole = computed(() => user.value?.role || null)

  // Initialisation automatique
  checkAuth()

  return {
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    loading: readonly(loading),
    getUser,
    getIsAuthenticated,
    getLoading,
    getUserRole,
    login,
    logout,
    checkAuth
  }
}
