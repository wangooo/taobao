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
                    <el-submenu index="2">
                            <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>店铺管理</span>
                            </template>
                            <el-menu-item-group>            
                            <el-menu-item index="1-1" @click="goto('ShopManage')">店铺信息</el-menu-item>
                            <el-menu-item index="1-2" @click="goto('Audit')">审核信息</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>

                            <i class="el-icon-menu"></i>
                    <el-menu-item index="3" @click="goto('access')">
                        
                        <!-- <span slot="title">权限管理</span>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">管理员管理</el-menu-item>
                             <el-menu-item index="1-2">店主管理</el-menu-item>
                            
                                </el-menu-item-group>
                    </el-menu-item> -->
                     <el-submenu index="1">
    <!-- <template slot="title">
      <i class="el-icon-location"></i> -->
      
      <span slot="title">权限管理</span>
    <!-- </template> -->
    <el-menu-item-group>
      
      <el-menu-item index="1-1">管理员管理</el-menu-item>
      <el-menu-item index="1-2">店主管理</el-menu-item>
    </el-menu-item-group>
    </el-submenu>
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
