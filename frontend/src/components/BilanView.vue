<template>
<div class=" w-[85vw] h-screen">
    <div class=" flex items-center justify-around p-5 gap-9 w-[85vw] h-40">
        <div class="bg-gray-700/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl w-56 text-center border border-white/10">
             <p class="text-white/60 text-sm uppercase tracking-wider">💰 Prestation Totale</p>
                <p class="text-white text-3xl font-bold mt-2">{{ totalPrestation }} Ar</p>
        </div>
        <div class="bg-green-700/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl w-56 text-center border border-green-500/30">
              <p class="text-white/60 text-sm uppercase tracking-wider">📈 Prestation Maximale</p>
                <p class="text-white text-3xl font-bold mt-2">{{ maxPrestation }} AR </p>
        </div>
        <div class="bg-red-700/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl w-56 text-center border border-red-500/30">
            <p class="text-white/60 text-sm uppercase tracking-wider">📉 Prestation Minimale</p>
                <p class="text-white text-3xl font-bold mt-2">{{ minPrestation }} Ar</p>
        </div>
    </div>
    <div  class=" flex  items-center justify-center gap-6 w-[85vw] h-120"> 
                 <!-- HISTOGRAMME DES PRESTATIONS                -->
        <div class="bg-gray-800/50 backdrop-blur-sm p-4 rounded-2xl w-[50vw] h-[60vh] overflow-visible ">
                <h3 class="text-white font-bold text-center mb-4">📊 Prestations par Médecin</h3>
                <!-- Si pas de données -->
                <div v-if="medecins.length === 0" class="text-white/50 text-center py-20">
                    Aucun médecin enregistré
         </div>
        
            <div v-else
                class="overflow-x-auto overflow-y-hidden h-full"
                style="height: 85%;width: 100%;">

                    <div    class="flex items-end justify-start  gap-[-5] px-4 overflow-visible "  
                    style="height: 400px; min-width: max-content;">
            
                        <div v-for="(medecin, index) in medecins" :key="medecin.id" 
                            class="flex flex-col items-center  justify-end group " 
                            style=" height: 100%;width: 60px;">
                    
                                <!--  zone de Barre de l'histogramme -->
                                <div class="relative w-50 flex flex-col overflow-visible items-center justify-end" style="height: 100%;">
                                    <!-- Valeur au-dessus de la barre -->
                                    <span class="text-white-100 z-10  pointer-events-none text-sm font-bold mb-1 opacity-0 group-hover:opacity-100 transition">
                                        {{ medecin.nb_jours * medecin.taux_journaliers }} Ar
                                    </span>
                                    <span class="text-white/80 text-sm mt-2 truncate w-full text-center font-medium">
                                        {{ medecin.nom }}
                                    </span>
                                    
                                  
                                        <div class="w-12 rounded-t-md transition-all duration-300 border-2 border-white"
                                            :style= "{
                                            height: Math.min(Math.max((medecin.nb_jours * medecin.taux_journaliers / maxPrestation * 120),5),80) + '%' ,
                                            backgroundColor: `hsl(220, 70%, ${40 + (index / medecins.length) * 40}%)`
                                            }"
                                        </div>
                                                
                                </div>
                    
                            
                         
                                    
                            </div>
                        
                    </div>
                
            </div>
    </div>
     <div class=" position-right h-[60vh] w-[50vw] flex flex-col">
    <!-- Camembert -->
    <div class="bg-gray-800/50 backdrop-blur-sm p-4 rounded-2xl w-full h-[60vh] overflow-hidden">
        <h3 class="text-white font-bold text-center mb-4">Répartition des Prestations</h3>
        <div v-if="medecins.length > 0" class="flex flex-col items-center justify-center h-[85%]">
            <div class="relative w-64 h-64 rounded-full" 
     :style="{
        background: `conic-gradient(
           from 0deg,
    #b91c1c 0deg ${(totalPrestation > 0 ? Math.max((minPrestation/totalPrestation*360 * 2), 18) : 0)}deg,
    #15803d ${(totalPrestation > 0 ? Math.max((minPrestation/totalPrestation*360 * 2), 18) : 0)}deg ${(totalPrestation > 0 ? Math.max(((minPrestation * 2 + maxPrestation)/totalPrestation*360), 20) : 0)}deg,
    #4b5563 ${(totalPrestation > 0 ? Math.max(((minPrestation * 2 + maxPrestation)/totalPrestation*360), 20) : 0)}deg 360deg
     )`
     }">
</div>
            <div class="flex justify-center gap-6 mt-4">
               <span class="text-gray-400 text-s">● Total: {{ totalPrestation }} Ar</span>
<span class="text-green-400 text-s">● Max: {{ maxPrestation }} Ar</span>
<span class="text-red-400 text-s">● Min: {{ minPrestation }} Ar</span>
</div>
        </div>
        <div v-else class="text-white/50 text-center py-20">
            Aucun médecin enregistré
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
    
    computed: {
        // ✅ CALCUL DU TOTAL
        totalPrestation() 
        {
            if (!this.medecins || this.medecins.length === 0) return 0
            return this.medecins.reduce((total, m) => {
                return total + (m.nb_jours * m.taux_journaliers)
            }, 0)
        },
        
        // ✅ CALCUL DU MAX
                maxPrestation() 
            {
            if (!this.medecins || this.medecins.length === 0) return 1
            
            const prestations = this.medecins.map(m => m.nb_jours * m.taux_journaliers)
            const maxVal = Math.max(...prestations)
            
            console.log('📊 Prestations :', prestations)
            console.log('📈 Max :', maxVal)
            
            this.medecins.forEach((m, i) => {
                const p = prestations[i]
                const hauteur = (p / maxVal * 100)
                console.log(`${m.nom} : ${p} Ar → ${hauteur.toFixed(1)}%`)
            })
            
            return maxVal
        },
    
        
        // ✅ CALCUL DU MIN
        minPrestation()
         {
            if (!this.medecins || this.medecins.length === 0) return 0
            const prestations = this.medecins.map(m => m.nb_jours * m.taux_journaliers)
            return Math.min(...prestations)
        },
    }
}
</script>
<style>
/* Barre de défilement horizontale uniquement */
.overflow-x-auto::-webkit-scrollbar {
    height: 8px;
}
.overflow-x-auto::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
}
.overflow-x-auto::-webkit-scrollbar-thumb {
    background: rgba(168, 85, 247, 0.5);
    border-radius: 10px;
}
</style>