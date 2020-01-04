<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                >
                    <el-menu-item index="1" @click="goto('myShop')">
                        <i class="el-icon-setting"></i>
                        <span slot="title">我的店铺</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="goto('shopManage')">
                        <i class="el-icon-menu"></i>
                        <span slot="title">店铺管理</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="goto('access')">
                        <i class="el-icon-document"></i>
                        <span slot="title">权限管理</span>
                    </el-menu-item>
                    <!-- <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item> -->
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        goto(val){
            this.$router.push({path:val})
        }
    }
};
</script>

<style scoped>
.tac {
    /* width: 100%; */
}
</style>
