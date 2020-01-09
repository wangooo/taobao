<template>
    <div class="container">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select"></el-input>
        <el-table :data="searchData" style="width: 100%" max-height="250" class="ttt">
            <el-table-column fixed prop="shopname" label="店铺名称" width="150"></el-table-column>
            <el-table-column prop="order" label="店主" width="120"></el-table-column>
            <el-table-column prop="kind" label="种类" width="120"></el-table-column>
            <el-table-column prop="score" label="信用" width="180"></el-table-column>
            <el-table-column prop="fanss" label="粉丝量" width="180"></el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        @click="clearshop(scope.row.shopname,scope.$index,searchData)"
                    >关闭店铺</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "gg",
    data() {
        return {
            input3: "",
            shopList: [
                {
                    shopname: "",
                    order: "",
                    kind: "",
                    score: "",
                    fanss: ""
                }
            ]
        };
    },
    methods: {
        getshop() {
            axios
                .get("/user/myShopAudit", {
                    params: {
                        order: window.localStorage.name
                    }
                })
                .then(res => {
                    if (res.data.result.audit === "order") {
                        alert("你没有权限查看此页面");
                        return;
                    } else {
                        axios.get("/shop/getShop").then(res => {
                            this.shopList = res.data.result.list;
                            this.shopList.map(item => {
                                item.fanss = item.fans.length;
                            });
                        });
                    }
                });
        },
        clearshop(shop, index, rows) {
            var con;
            con = confirm("确定要关闭吗？");
            if (con == true) {
                console.log(shop);
                rows.splice(index, 1);
                axios
                    .get("/shop/clearShop", { params: { shopname: shop } })
                    .then(res => {
                        this.shopList = res.data.result.list;
                        console.log(res);
                    });
            }
        }
    },
    computed: {
        searchData() {
            if (this.input3) {
                return this.shopList.filter(value => {
                    //过滤数组元素
                    return (
                        value.shopname.includes(this.input3) ||
                        value.order.includes(this.input3)
                    ); //如果包含字符返回true
                });
            } else {
                return this.shopList;
            }
        }
    },
    created() {
        this.getshop();
    }
};
</script>

<style scoped>
.ttt {
    margin: 60px 150px 20px 0px;
    text-align: center;
}
.input-with-select {
    margin: 40px 150px 20px 0px;
}
</style>
