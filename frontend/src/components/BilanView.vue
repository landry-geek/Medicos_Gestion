<template>
<div class="bg-black w-[85vw] h-200">
    <div class=" flex items-center justify-around p-5 gap-9 w-[85vw] h-40">
        <div class="bg-gray-400 h-30 w-50">Prestation total</div>
        <div class="bg-gray-400 h-30 w-50">Prestation maximal</div>
        <div class="bg-gray-400 h-30 w-50">Prestation minimal</div>
    </div>
    <div class=" flex  items-center justify-center gap-6 bg-blue-500 w-[85vw] h-120"> 
        <div class="bg-green-500 h-[70vh] w-[40vw]"></div>
        <div class="bg-red-500 position-right h-[70vh] w-[40vw] flex flex-col"></div>
    </div>
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