<template>
    <div class="form-box">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
                <el-input type="input" v-model="form.age"></el-input>
            </el-form-item>
            <el-form-item label="籍贯">
                <el-input type="input" v-model="form.province"></el-input>
            </el-form-item>
            <el-form-item label="城市">
                <el-input type="input" v-model="form.city"></el-input>
            </el-form-item>
             <el-form-item label="住址">
                <el-input type="input" v-model="form.adress"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addmanager">立即添加</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import axios from "axios";

export default {
    name: "gg",
    data() {
        return {
            form: {
                        name: '',
                        age:'',
                        province: '',
                        city:'',
                        adress:''
            },
          //  imageUrl: ""
        };
    },
    methods: {
        addmanager(){
            axios
                .get("/user/addManager",{
                    params:
                        {
                            name: this.form.name,
                            age:this.form.age,
                            province: this.form.province,
                            city:this.form.city,
                            adress:this.form.address
                        }
                })
                .then(res => {
                    console.log(res);
                });
        }
    }
};
</script>

<style scoped>
.form-box {
    width: 700px;
    padding: 40px;
    /* margin: 0 auto;  */
    background: white;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
