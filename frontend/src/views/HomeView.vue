<template>
    <div class="bg-gradient-to-r from-purple-400 to-blue-300 w-screen h-screen flex justify-between">
        <div class="bg-gray-800/90 w-50 h-screen rounded-tr-3xl shadow-2xl border-r border-white/10 backdrop-blur-sm bg-gradient-to-b from-purple-900/50 to-gray-900/90">
        <h1 class="text-center pt-7 text-white text-2xl font-bold tracking-wider bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">MEDICOS APP</h1>             
               
            <div class="text-center space-y-2 pt-35" >
                   
                <div class=" 
                bg-white/5 px-4 py-3 mx-2 my-1 text-gray-300 hover:text-white hover:bg-purple-500/20 rounded-lg transition-all duration-300 cursor-pointer  border-transparent hover:border-purple-400 hover:scale-105  flex items-center gap-3 font-medium" @click="pageActive='FormulaireView'">📄 Formulaire</div>
                <div class="bg-white/5 px-4 py-3 mx-2 my-1 text-gray-300 hover:text-white hover:bg-purple-500/20 rounded-lg transition-all duration-300 cursor-pointer  border-transparent hover:border-purple-400 hover:scale-105 flex items-center gap-3 font-medium" @click="pageActive='ListeView'">📋 Liste</div>   
                
                <div class="bg-white/5 px-4 py-3 mx-2 my-1 text-gray-300 hover:text-white hover:bg-purple-500/20 rounded-lg transition-all duration-300 cursor-pointer  border-transparent hover:border-purple-400 hover:scale-105 flex items-center gap-3 font-medium" @click="pageActive='BilanView'">📈 Bilan</div>
                </div>
                

            </div>
             <!-- Dans le template, APRÈS </div> qui ferme la liste -->
                <div v-if="showModal" class="fixed inset-0  bg-black/50 flex items-center justify-center z-50">
                  
                    <div class="  relative p-[-5] rounded-2xl w-[400px] max-h-[600px] overflow-y-hidden shadow-2xl bg-gradient-to-r from-purple-400 to-blue-300 mt-5">
 
                        <!-- ❌ Bouton fermer -->
                        <button @click="fermerModal" class=" bg-gray-400 absolute  top-10 right-4 h-10 w-10 flex items-center justify-center   text-black/50 hover:text-black text-xl">
                            X
                        </button>
                        
                        
                        <!-- Formulaire -->
                        <FormulaireView 
                            :medecin="medecinAModifier"
                            mode="modification"
                            @medecin-modifie="sauvegarderModification"
                            @annuler="fermerModal"
                        />
                        
                    </div>
        
                </div>
        

        <div class=" bg-gradient-to-r from-purple-400 to-blue-300  w-300 h-screen"> 
            
          
            <FormulaireView 
              v-if="pageActive === 'FormulaireView'"
               @medecin-ajoute="ajouterMedecin"
                 :medecin="medecinAModifier"    
                   :mode="mode"  
                
            />
          
            <ListeView 
               v-if="pageActive === 'ListeView'" 
               :medecins="liste"
               @modifier="ouvrirModal"
                @supprimer="supprimerMedecin"   />
         
            <BilanView v-if="pageActive === 'BilanView' "
              ref="bilanView"
                 :key="bilanKey"
    :medecins="liste"
               />
        
                        
           
          
            
        </div>
        
    </div>

    
 
</template>

<script>
import axios from "axios";
import BilanView from '@/components/BilanView.vue';
import ListeView from '@/components/ListeView.vue';
import FormulaireView from '@/components/FormulaireView.vue';
export default{
   
    data() {
    return {
      pageActive: 'FormulaireView',
      liste: [],
      medecinAModifier :null,
      mode : 'ajout',
      showModal :false,
      bilanKey: 0
    }
},
    components : {
        FormulaireView,
        ListeView,
        BilanView
    },

    mounted(){
        this.fetchMedecins()
    } ,
     methods: {
            ouvrirModal(medecin) {
        this.medecinAModifier = medecin
        this.showModal = true
    },
    
    fermerModal() {
        this.showModal = false
        this.medecinAModifier = null
    },
    
    
    sauvegarderModification(medecinModifie) {
    // 🔴 MODIFIER : Appel API avec .then()
    axios.put(`http://localhost:8000/api/medecins/${medecinModifie.id}`, medecinModifie)
        .then(() => {
            const index = this.liste.findIndex(m => m.id === medecinModifie.id);
            if (index !== -1) {
                this.liste.splice(index, 1, medecinModifie);
                console.log('✅ Liste mise à jour :', this.liste);
                 this.bilanKey++
            }
            this.fermerModal();
            console.log('✅ Médecin modifié :', medecinModifie);
        })
        .catch(error => {
            console.error('❌ Erreur lors de la modification:', error);
            alert('Erreur lors de la modification');
        });
},         
        // Récupérer les médecins
        async fetchMedecins() {
            try {
                const response = await axios.get('http://localhost:8000/api/medecins')
                this.liste = response.data.data.sort((a, b) => a.id - b.id)
                console.log('✅ Liste chargée :', this.liste)
            } catch (err) {
                console.error('❌ Erreur :', err)
            }
        },
         ajouterMedecin(nouveauMedecin) {
            this.liste.push(nouveauMedecin)  // ← Ajoute à la liste
            console.log('✅ Médecin ajouté à la liste :', nouveauMedecin)
             this.bilanKey++ 
        },
             
        supprimerMedecin(id) {
    // 🔴 MODIFIER : Appel API avec .then()
    axios.delete(`http://localhost:8000/api/medecins/${id}`)
        .then(() => {
            this.liste = this.liste.filter(medecin => medecin.id !== id);
            console.log('🗑️ Médecin supprimé, id:', id);
            console.log('📋 Nouvelle liste:', this.liste);
             this.bilanKey++
        })
        .catch(error => {
            console.error('❌ Erreur lors de la suppression:', error);
            alert('Erreur lors de la suppression');
        });
},
        preparerModification(medecin) {   // ← Tu as déjà cette méthode
        this.medecinAModifier = medecin   // ← AJOUTER
        this.mode = 'modification'        // ← AJOUTER
        this.showModal= true // ← AJOUTER (si pas déjà)
        }
         
    
    }
}
</script>

<style lang="scss" scoped>

</style>