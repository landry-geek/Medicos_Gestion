<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50">
    <div class="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-3xl text-white font-bold">M</span>
        </div>
        <h2 class="text-2xl font-bold text-gray-800">Medicos Gestion</h2>
        <p class="text-gray-500 text-sm">Plateforme de gestion médicale</p>
      </div>
      
      <!-- Formulaire -->
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-medium mb-2">Email professionnel</label>
          <input 
            v-model="form.email" 
            type="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
            placeholder="medecin@hopital.fr"
            required
          >
        </div>
        
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-medium mb-2">Mot de passe</label>
          <input 
            v-model="form.password" 
            type="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
            placeholder="••••••••"
            required
          >
        </div>
        
        <button 
  type="submit"
   :disabled="auth.loading.value"
  class="w-full bg-teal-600 text-white py-2.5 px-4 rounded-lg hover:bg-teal-700 transition duration-200 font-medium"
>
  Se connecter
</button>
      </form>

      
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

const auth = inject('auth')
const router = useRouter()

const form = ref({
  email: 'jean.dupont@medicos.com',
  password: 'password123'
})

const handleLogin = async () => {
  try {
    await auth.login(form.value.email, form.value.password)
    router.push('/')
  } catch (error) {
    console.error('Erreur:', error)
  }
}
</script>
