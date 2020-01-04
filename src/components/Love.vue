<template>
    <div class="love">
      啦啦啦
      <!--<h1>{{china}}</h1>-->
      <button @click="getParentS">获取父组件的事件</button>
    </div>
</template>

<script>
    export default {
        name: "Love",
      data(){
          return{

          }
      },
      methods:{
        getParentS(){
          this.$emit('say',222);
        }
      },
      // props: ['china']
    }
</script>

<style scoped>

</style>
