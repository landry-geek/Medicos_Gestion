<template>
  <Transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4"
      @click.self="fermer"
    >
      <Transition name="pop">
        <div
          v-if="visible"
          class="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
        >
          <!-- Bandeau supérieur -->
          <div class="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-5 relative">
            <h2 class="text-white text-xl font-bold tracking-tight">Mise à jour</h2>
            <p class="text-purple-100 text-sm mt-0.5">Modifiez les informations puis enregistrez</p>

            <button
              type="button"
              @click="fermer"
              aria-label="Fermer"
              class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/15 transition-colors duration-150"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form class="px-6 py-6 space-y-4" @submit.prevent="envoyer">
            <div class="space-y-1.5">
              <label class="text-slate-600 font-medium text-sm">Id</label>
              <input v-model="form.id" type="text" placeholder="Identifiant"
                class="w-full px-4 py-2.5 rounded-lg bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-shadow" />
            </div>

            <div class="space-y-1.5">
              <label class="text-slate-600 font-medium text-sm">Nom</label>
              <input v-model="form.nom" type="text" placeholder="Nom"
                class="w-full px-4 py-2.5 rounded-lg bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-shadow" />
            </div>

            <div class="space-y-1.5">
              <label class="text-slate-600 font-medium text-sm">Nombre de jours</label>
              <input v-model.number="form.nbJours" type="number" placeholder="Nb jours" step="1" min="0"
                class="w-full px-4 py-2.5 rounded-lg bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-shadow" />
            </div>

            <div class="space-y-1.5">
              <label class="text-slate-600 font-medium text-sm">Taux journalier</label>
              <div class="relative">
                <input v-model.number="form.taux" type="number" placeholder="Taux journalier" step="1" min="0"
                  class="w-full px-4 py-2.5 pr-12 rounded-lg bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-shadow" />
                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm pointer-events-none">Ar</span>
              </div>
            </div>

            <div class="flex gap-3 pt-3">
              <button type="button" @click="fermer"
                class="flex-1 px-4 py-2.5 rounded-lg font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors duration-150">
                Annuler
              </button>
              <button type="submit"
                class="flex-1 px-4 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-md shadow-purple-500/20 transition-all duration-150">
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'ModaleMiseAJour',
  props: {
    visible: { type: Boolean, default: false },
    donnees: { type: Object, default: () => ({ id: '', nom: '', nbJours: null, taux: null }) }
  },
  emits: ['update:visible', 'envoyer'],
  data() {
    return { form: { ...this.donnees } }
  },
  watch: {
    donnees: { handler(val) { this.form = { ...val } }, deep: true },
    visible(val) { document.body.style.overflow = val ? 'hidden' : '' }
  },
  methods: {
    fermer() { this.$emit('update:visible', false) },
    envoyer() { this.$emit('envoyer', { ...this.form }); this.fermer() }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.pop-enter-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.pop-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.pop-enter-from, .pop-leave-to { opacity: 0; transform: scale(0.95) translateY(8px); }
</style>