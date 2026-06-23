<template>

    <div  class="w-260 h-screen flex items-center justify-center">
        <div class="bg-white h-[70vh] w-[800px] 
        shadow-[0_0_60px_rgba(239,68,68,0.8)]
        overflow-hidden  flex flex-col rounded-lg shadow-lg">
            <div  class="bg-gray-400 flex items-center text-white">
                <span class=" text-black  bg-green-100 font-bold w-16 px-2 py-1">Numed</span>
                <span class=" text-black font-bold w-40 px-2 py-1">Nom</span>
                <span class=" text-black font-bold  bg-green-100 w-32 px-2 py-1">Nombre de Jours</span>
                <span class="font-bold  text-black    w-32 px-2 py-1">Taux journaliers</span>
                <span class="font-bold  text-black   bg-green-100 w-40 px-2 py-1">Prestation</span>
                <span  class="font-bold text-black w-32 px-2 py-1 text-center">Actions</span>
            </div>
                <div class="bg-white flex-1 overflow-hidden ">
                    <div v-if="!medecins || medecins.length === 0" class="text-gray-400 text-center py-8">
                         Aucun médecin enregistré
                    </div>

                    <div  class="h-full overflow-y-auto">
                        <div v-for="(medecin, index) in medecins" :key="medecin.id" 
                            class="flex items-center border-b border-gray-200 hover:bg-gray-50">
                            
                            <span class="w-16 px-2 py-1 text-sm text-center">{{ index + 1 }}</span>
                            <span class="w-40 px-2 py-1 text-sm">{{ medecin.nom }}</span>
                            <span class="w-32 px-2 py-1 text-sm text-center">{{ medecin.nb_jours }}</span>
                            <span class="w-32 px-2 py-1 text-sm text-center">{{ medecin.taux_journaliers }} Ar</span>
                            <span class="w-40 px-2 py-2 text-sm text-center font-bold text-purple-600">
                                {{ medecin.nb_jours * medecin.taux_journaliers }} Ar
                            </span>  
                            <span class="w-32 px-2 py-1 text-sm text-center flex items-center justify-center gap-2">
                                <button @click="modifierMedecin(medecin)" class="text-blue-500 hover:text-blue-700 text-lg">
                                    ✏️
                                </button>
                                <button @click="supprimerMedecin(medecin.id)" class="text-red-500 hover:text-red-700 text-lg">
                                    🗑️
                                </button>
                            </span>           
                        </div>
                    </div>

                </div>
        </div>
        
    
    </div>


    
</template>

<script>
import axios from "axios"
export default {
    props: {
    medecins: {
        type: Array,
        default: () => []
        }
    },
     methods: {
        modifierMedecin(medecin) {
            console.log('✏️ Modifier :', medecin)
            // Émettre l'événement vers le parent
            this.$emit('modifier', medecin)
        },
                supprimerMedecin(id) {
                    if (window.confirm('Voulez-vous vraiment supprimer ce médecin ?')) {

                this.$emit('supprimer', id)
                    }
                 }
    }
    
    
   
}
</script>

<style lang="scss" scoped>

</style>