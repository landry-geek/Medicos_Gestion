<script setup>
import { onMounted } from 'vue'
import { api } from './lib/api'

onMounted(async () => {
  try {
    const { data } = await api.get('/ping')
    console.log(data) // devrait afficher { status: "ok" }
  } catch (error) {
    console.error('Erreur :', error)
  }
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>