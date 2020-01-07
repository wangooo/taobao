<template>
    <div>
        <div>
            用户名：
            <el-input v-model="name"></el-input>密码
            <el-input show-password v-model="pwd"></el-input>
            <el-button @click="saveUser">登陆</el-button>
        </div>
        <!-- <FFF></FFF> -->
    </div>
</template>

<script>
import axios from "axios";
import FFF from "@/components/Footer.vue";

export default {
    
    data() {
        return {
           name:"",
           pwd:""
        };
    },
    components: { FFF },
    methods: {
        saveUser() {
            // let storage = window.localStorage;
            // storage.setItem("userName", this.name);
            // storage.setItem("pwd", this.pwd);
            let params = {
                name: this.name,
                pwd: this.pwd
            }
            axios
            .get("/check/getAccess",params).then(res=>{
                // let b=res.data.result;
                // if(b==true)
                // {
                //     let r=res.data.result.list.limit
                // }else{
                //     alert("用户名或密码错误")
                // }
              if(res.data.success==true){

              }else{
                  alert("用户名或密码错误")
              }
            })
           
        }
    }
};
</script>

<style scoped>
</style>
