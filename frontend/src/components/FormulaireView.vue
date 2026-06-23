<template>
    
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-300">
    <form  @submit.prevent="ajouterMedecin" class="shadow-[0_0_30px_rgba(168,85,247,0.5)] 
    flex flex-col space-y-4 bg-white/9 backdrop-blur-sm p-6 rounded-2xl 
    shadow-2xl shadow-purple-500/20 w-96 border border-purple-400/20  w-96">
        <div v-if="succes" class="  texte-center mx-auto -mt-8 fixed bg-gray-400 text-white-200 p-3 rounded-lg mb-4">
    ✅ Médecin ajouté avec succès !
</div>
    <div class="flex flex-col space-y-2">
        <label class="text-white font-medium text-xl">Nom</label>
        <input type="text"
        v-model="nouveauMedecin.nom"
        placeholder="Nom" class="px-4 py-3 rounded-lg bg-white/20 text-black placeholder-black/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400">
    </div>
    <div class="flex flex-col space-y-2">
        <label class="text-white font-medium text-xl"> Nombre de jour</label>
           <input type="number" 
           v-model="nouveauMedecin.nb_jours"  max= "365" placeholder="Nb Jours" step="1" min="0" class="px-4 py-3 rounded-lg bg-white/20 text-black placeholder-black/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400">
                <div v-if="nouveauMedecin.nb_jours > 365" class="text-red-500 text-sm mt-1">
            ⚠️ Le nombre de jours ne peut pas dépasser 365
                </div>
    </div>      
    <div class="flex flex-col space-y-2 relative">
        <label   class="text-white font-medium text-xl"> Taux journalier</label>
             <input 
              type="number" 
              v-model="nouveauMedecin.taux_journaliers"
              placeholder="taux journalier" step="1" min="0" class="px-4 py-3 rounded-lg bg-white/20 text-black placeholder-black/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400">
              <span class=" absolute right-10  bottom-[-27px] transform -translate-y-12 px-3 text-white font-bold">Ar</span>

    </div>
   <button type="submit" class="flex-1 px-4 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition">
    {{ mode === 'ajout' ? '📤 Envoyer' : '💾 Modifier' }}
</button>
<button type="button" @click="$emit('annuler')" 
        class="flex-1 px-4 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition">
    Annuler
</button>
 
   
    
    </form>
    </div>
    
    </template>
<script>

import axios from "axios"

export default 
{
        // Ajouter dans les props
props: {
    medecin: {
        type: Object,
        default: null
    },
    mode: {
        type: String,
        default: 'ajout'
    }
},

// Ajouter watch
watch: {
    medecin: {
        handler(newVal) {
            if (newVal) {
                this.nouveauMedecin = { ...newVal }
            }
        },
        immediate: true
    }
},
    emits: ['medecin-ajoute', 'medecin-modifie', 'annuler'],
            data(){ 
                return{
                        nouveauMedecin :{
                        nom :'',
                        nb_jours :'',
                        taux_journaliers:'',
                        },
                        succes:false
                }
             } ,



             methods :{
                    resetForm() {
                        this.nouveauMedecin = {
                                            nom: '',
                                            nb_jours: '',
                                            taux_journaliers: ''
                        }
                    },
                     async ajouterMedecin() {
                        console.log('📝 Données envoyées :', this.nouveauMedecin)

    
                    try {
                        let response  // ← AJOUTER CETTE LIGNE

                        // ✅ AJOUTER CETTE CONDITION
                        if (this.mode === 'modification' && this.medecin)
                            {
                            // 🔄 MODIFICATION → PUT
                            response = await axios.put(
                            `http://localhost:8000/api/medecins/${this.medecin.id}`, 
                            this.nouveauMedecin
                            )
                            this.$emit('medecin-modifie', response.data.data)
                            alert('✅ Médecin modifié !')
                            } 
                        else {
                        // ➕ AJOUT → POST
                        response = await axios.post('http://localhost:8000/api/medecins', this.nouveauMedecin)
                        this.$emit('medecin-ajoute', response.data.data)
                        alert('✅ Médecin ajouté !')
                        }

                        console.log('✅ Réponse :', response.data)
                        this.succes = true
                        setTimeout(() => { this.succes = false }, 3000)
                        this.resetForm()


                } 
                    catch (err) {
                            // 👇 AFFICHER LES DÉTAILS DE L'ERREUR
                            console.error('❌ Erreur complète :', err)
                            
                            if (err.response) {
                                console.log('📝 Status :', err.response.status)
                                console.log('📝 Message :', err.response.data.message)
                                console.log('📝 Erreurs de validation :', err.response.data.errors)
                            
                            // Afficher les erreurs dans une alerte
                             if (err.response.data.errors){
                                const errors = err.response.data.errors
                                let message = '❌ Erreur de validation :\n'
                                for (let field in errors) {
                                message += `- ${field} : ${errors[field].join(', ')}\n`
                                }
                                 alert(message)
                        }
                            
                            }
                           
                    }
}
             }
 }

</script>
