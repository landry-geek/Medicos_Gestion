// frontend/src/composables/useApi.js
import { inject } from 'vue'

export function useApi() {
  const auth = inject('auth')
  
  const fetchWithAuth = (endpoint, options = {}) => {
    const token = localStorage.getItem('medicos_token')
    const user = auth?.user?.value || null
    
    console.log(`📡 Appel API simulé: ${endpoint}`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : null,
        'X-User-Email': user?.email || null,
        'X-User-Role': user?.role || null
      },
      ...options
    })
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResponses = {
          '/api/patients': {
            success: true,
            data: [
              { id: 1, nom: 'Martin', prenom: 'Sophie', age: 45, diagnostic: 'Hypertension' },
              { id: 2, nom: 'Bernard', prenom: 'Michel', age: 62, diagnostic: 'Diabète' },
              { id: 3, nom: 'Dubois', prenom: 'Claire', age: 38, diagnostic: 'Migraine' }
            ]
          },
          '/api/bilans': {
            success: true,
            data: [
              { id: 1, patient: 'Sophie Martin', date: '2026-06-20', resultats: 'Normaux' },
              { id: 2, patient: 'Michel Bernard', date: '2026-06-18', resultats: 'À surveiller' }
            ]
          }
        }
        
        if (mockResponses[endpoint]) {
          resolve(mockResponses[endpoint])
        } else {
          resolve({
            success: true,
            message: `Données mockées pour ${endpoint}`,
            data: []
          })
        }
      }, 300)
    })
  }
  
  return { fetchWithAuth }
}
