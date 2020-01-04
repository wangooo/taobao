<template>
  <div id="app">
    jjjj
    <myNav class="nav" v-show="this.$route.name != 'Login'"></myNav>
    <div class="right"><router-view/></div>
  </div>
</template>

<script>
import myNav from '@/components/Nav'

export default {
  name: 'App',
  components:{myNav},
  data(){
      return{
        loginIf:true
      }
    }
    // watch
  // created(){
  //   if(this.$route.name === "Login"){
  //     this.loginIf = false;
  //   }
  // }
}
</script>

<style scoped>
  .nav{
    float:left;
    width: 180px;
    /* height:100%; */
    /* height: */
  }
  .right{
    float:left;
  }
</style>
