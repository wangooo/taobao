<template>
    <div>
        <template>
            搜索：<el-input v-model="fans"></el-input>
            <el-table :data="searchData" style="width: 100%">
                <el-table-column prop="name" label="昵称" width="180"></el-table-column>
                <el-table-column prop="rate" label="退货率"></el-table-column>
                <el-table-column prop="score" label="信用分"></el-table-column>
                <el-table-column prop="sex" label="性别"></el-table-column>
                <el-table-column prop="date" label="关注时间" width="180"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="laHei(scope.row)" type="text" size="small">拉黑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "fans",
    data() {
        return {
            tableData: [
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄",
                    rate: "80%",
                    sex: "男",
                    score: 80
                },
                {
                    date: "2016-05-02",
                    name: "刘三",
                    address: "贵州省",
                    rate: "80%",
                    sex: "男",
                    score: 80
                },
                {
                    date: "2016-05-02",
                    name: "李四",
                    address: "遵义",
                    rate: "80%",
                    sex: "男",
                    score: 80
                }
            ],
            fans:""
        };
    },
    methods:{
        laHei(){
            alert('确定拉黑吗？')
        }
    },
    computed:{
        searchData(){
            if(this.fans){
                return this.tableData.filter((value)=>{  //过滤数组元素
                    return value.name.includes(this.fans); //如果包含字符返回true
                });
            }
            else{
                return this.tableData;
            }
        }
    }
};
</script>

<style scoped>
</style>
