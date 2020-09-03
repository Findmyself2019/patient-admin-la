<template>
  <img :src="src" alt="" />
</template>

<script>
import api from '@/api/index'
export default {
  name: "Pertype",
  data(){
    return{
      src:''
    }
  },
  created(){
    api.city.getPicture().then(res=>{
      this.src = `data:image/jpg;base64,${res}`
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
