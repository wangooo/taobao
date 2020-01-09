<template>
    <div>
        <div class="box">
            用户名：
            <el-input v-model="name"></el-input>密码
            <el-input show-password v-model="pwd"></el-input>
            <el-button @click="saveUser" style="margin-top:20px">登陆</el-button>
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
            let storage = window.localStorage;
            let params = {
                name: this.name,
                pwd: this.pwd
            };
            axios.get("/user/checkLogin", {params}).then(res => {
                console.log(res);
                if (res.data.status == "0") {
                    storage.setItem("name", this.name);
                    storage.setItem("pwd", this.pwd);
                    this.$router.push({ name: "Home" });
                } else {
                    alert("用户名或密码错误");
                }
            });
        }
    }
};
</script>

<style scoped>
.box{
    width:600px;
    height:300px;
    border:.5px solid orange;
    padding:20px;
    margin: 0 auto;
    margin-top:200px;
    background: rgb(170, 157, 157);
    color:black;
}
</style>
