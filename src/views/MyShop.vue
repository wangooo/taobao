<template>
    <div class="flex">
        <div class="good" v-for="(item,index) in shopLists" :key="index">
            <img class="shop-img" :src="item.picImg" />
            <div class="shop-name">{{item.shopName}}</div>
            <div>
                <el-button type="primary" round @click="goods(item.id)">商品管理</el-button>
                <el-button round @click="fans(item.id)">粉丝管理</el-button>
            </div>
            <div class="shop-edit">
                <el-button type="success" icon="el-icon-edit" circle></el-button>
            </div>
        </div>
        <!-- <div> -->
            <el-button type="danger" plain class="add-shop">申请店铺</el-button>
        <!-- </div> -->
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "gg",
    data() {
        return {
            shopLists: [
                {
                    picImg: "../../static/1.jpg",
                    shopName: "小王的店铺",
                    id: "001"
                },
                {
                    picImg: "../../static/2.jpg",
                    shopName: "小X的店铺",
                    id: "002"
                },
                {
                    picImg: "../../static/3.jpg",
                    shopName: "小X的店铺",
                    id:"003"
                },
                {
                    picImg: "../../static/3.jpg",
                    shopName: "小X的店铺"
                }
            ]
        };
    },
    methods: {
        goods(shopId){
            this.$router.push({path:'/'})
        }
    },
    created() {
        this.checkAccess();
    }
};
</script>

<style scoped>
.flex {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    position: relative;
    flex-wrap: wrap;
}
.good {
    position: relative;
    margin: 20px;
    width: 300px;
    /* height: 400px; */
    background: #fff;
    border-radius: 10px;
    box-shadow: 1px grey;
    text-align: center;
    padding: 0 0 20px 0px;
}
.shop-img {
    width: 100%;
    height: 80%;
}
.shop-name {
    margin-bottom: 10px;
}
.shop-edit {
    position: absolute;
    top: 10px;
    right: 10px;
}
.add-shop {
    position: fixed;
    right: 30px;
    top: 30px;
}
</style>
