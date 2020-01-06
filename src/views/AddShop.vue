<template>
    <div class="form-box">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="商铺名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="店主名">
                <el-input type="input" v-model="form.order"></el-input>
            </el-form-item>
            <el-form-item label="图片">
                <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="add">立即创建</el-button>
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
                name: "",
                desc: "",
                order:""
            },
            imageUrl: ""
        };
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        add(){
            axios
                .get("/shop/addShop", {
                    params: {
                        form
                    }
                })
                .then(res => {
                    // this.shopLists = res.data.result.list;
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
