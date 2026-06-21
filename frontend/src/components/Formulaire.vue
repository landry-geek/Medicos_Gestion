<template>
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-300">
    <form class="flex flex-col space-y-4 bg-white/9 backdrop-blur-sm p-6 rounded-2xl shadow-xl w-96">
    <div class="flex flex-col space-y-2">
        <label class="text-white font-medium text-xl">Nom</label>
        <input type="text" placeholder="Nom" class="px-4 py-3 rounded-lg bg-white/20 text-black placeholder-black/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400">
    </div>
    <div class="class=flex flex-col space-y-2">
        <label class="text-white font-medium text-xl"> Nombre de jour</label>
           <input type="number" placeholder="Nb Jours" step="1" min="0" class="px-4 py-3 rounded-lg bg-white/20 text-black placeholder-black/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400">

    </div>      
    <div class="flex flex-col space-y-2 relative">
        <label   class="text-white font-medium text-xl"> Taux journalier</label>
             <input 
              type="number" placeholder="taux journalier" step="1" min="0" class="px-4 py-3 rounded-lg bg-white/20 text-black placeholder-black/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400">
              <span class=" absolute right-10  bottom-[-27px] transform -translate-y-12 px-3 text-white font-bold">Ar</span>

    </div>
    <button type="submit" class="px-4 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition">
    Envoyer
</button>
    
    </form>
    </div>
    
    </template>
<script>
export default {
    setup () {
        

        return {}
    }
    
}
</script>

<style lang="scss" scoped>

</style>