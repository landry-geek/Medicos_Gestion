<template>
    <div class="bg-gradient-to-r from-purple-400 to-blue-300 w-screen h-screen flex justify-between">
        <div class="bg-gray-800/90 w-50 h-screen rounded-tr-3xl rounded-br-3xl">
            <h1 class="text-center  pt-7 text-white text-xl font-bold drop-shadow-lg">MEDICOS APP</h1>     
            
            <div class="text-center space-y-2 pt-35" >
                <div class="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition duration-200 cursor-pointer" @click="pageActive='FormulaireView'">formulaire</div>
                <div class="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition duration-200 cursor-pointer" @click="pageActive='ListeView'">liste</div>
                <div class="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition duration-200 cursor-pointer" @click="pageActive='BilanView'">bilan</div>
                
            </div>
        </div>
        
            
        

        <div class="bg-gradient-to-r from-purple-400 to-blue-300  w-300 h-screen"> 
            
          
            <formulaire v-if="pageActive === 'FormulaireView'" />
            <liste v-if="pageActive === 'ListeView'" />
            <bilan v-if="pageActive === 'BilanView' " />
        
                        
           
          
            
        </div>
    </div>
    
    
   
</template>

<script>
import BilanView from '@/components/BilanView.vue';
import ListeView from '@/components/ListeView.vue';
import FormulaireView from '@/components/FormulaireView.vue';
export default{
    data() {
    return {
      pageActive: 'FormulaireView'
    }
},
    components : {
        FormulaireView,
        ListeView,
        BilanView
    }
    
}
</script>

<style lang="scss" scoped>

</style>