<template>
    <div class="container">
        <el-input placeholder="请输入内容" v-model="input2" class="input-with-select"></el-input>

        <el-table :data="searchData" style="width: 100%" max-height="250" class="ttt">
            <el-table-column fixed prop="name" label="店主姓名" width="150"></el-table-column>
            <el-table-column prop="nshop" label="店铺数量" width="120"></el-table-column>
            <el-table-column prop="city" label="市区" width="180"></el-table-column>
            <el-table-column prop="adress" label="地址" width="180"></el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        @click="clearshopkeeper(scope.row.name,scope.$index,searchData)"
                    >删除店主</el-button>
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
            input2: "",
            shopkeeperList: [
                {
                    name: "",
                    nshop: "",

                    city: "",
                    adress: ""
                }
            ]
        };
    },
    methods: {
        getshopkeeper() {
            axios
                .get("/user/myShopAudit", {
                    params: {
                        order: window.localStorage.name
                    }
                })
                .then(res => {
                    if (res.data.result.audit !== "super") {
                        alert("你没有权限查看此页面");
                        return;
                    } else {
                        axios.get("/shopkeeper/getshopkeeper").then(res => {
                            this.shopkeeperList = res.data.result.list;
                            //  this.shopList.map(item=>{
                            //    item.fanss=item.fans.length
                            //  })
                        });
                    }
                });
        },
        clearshopkeeper(shopkeeper, index, rows) {
            var con;
            con = confirm("确定要删除吗？");
            if (con == true) {
                console.log(shopkeeper);
                rows.splice(index, 1);
                axios
                    .get("/shopkeeper/clearshopkeeper", {
                        params: { name: shopkeeper }
                    })
                    .then(res => {
                        this.shopkeeperList = res.data.result.list;
                        console.log(res);
                    });
            }
        }
    },
    computed: {
        searchData() {
            if (this.input2) {
                return this.shopkeeperList.filter(value => {
                    //过滤数组元素
                    return (
                        value.name.includes(this.input2) ||
                        value.city.includes(this.input2) ||
                        value.adress.includes(this.input2)
                    ); //如果包含字符返回true
                });
            } else {
                return this.shopkeeperList;
            }
        }
    },
    created() {
        this.getshopkeeper();
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
