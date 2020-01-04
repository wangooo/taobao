<template>
    <div>
      <p>oo</p>
      <p>{{name}}</p>
      <p>{{age}}</p>
      <h1>{{this.$route.query.name}}</h1>
    </div>
</template>

<script>

  import axios from 'axios'

    export default {
        name: "oo",
      data(){
          return{
            name:'ss',
            age:''
          }
      },

    beforeUpdate() {
      var a=this.$route.query.id;
      console.log(a);
      axios.post('/goods/tryy',{
        tryId:a
      }).then((response)=>{
        var res=response.data;
        this.name=res.result.name;
        this.age=res.result.age;
      })
    }
    }
</script>

<style scoped>

</style>
