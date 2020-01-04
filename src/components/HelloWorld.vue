<template>
  <div class="hello">
    <h1>这是首页</h1>
    <router-link to="/p/student">老师</router-link>
    <router-link to="/p/teacher">学生</router-link>
    <!-- <router-link to="/p/news">news</router-link> -->
    <router-view></router-view>

    <button @click="jump">view</button>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  methods: {
    jump(){
      this.$router.push({path:'/p/news?id=212'})
    }
  }
}
</script>
