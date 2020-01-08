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
                        <el-button @click="laHei(scope.row.name,scope.$index,searchData)" type="text" size="small">拉黑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <template>
            搜索：<el-input v-model="black"></el-input>
            <el-table :data="searchData1" style="width: 100%">
                <el-table-column prop="name" label="昵称" width="180"></el-table-column>
                <el-table-column prop="rate" label="退货率"></el-table-column>
                <el-table-column prop="score" label="信用分"></el-table-column>
                <el-table-column prop="sex" label="性别"></el-table-column>
                <el-table-column prop="date" label="关注时间" width="180"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="NolaHei(scope.row.name,scope.$index,searchData1)" type="text" size="small">取消拉黑</el-button>
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
                
            ],
            trueArr:[],
            falseArr:[],
            blacklist:[],
            fans:""
        };
    },
    methods:{
        laHei(name,index,rows){
            var con
            con=confirm('确定拉黑吗？')
            if(con==true){
                console.log('~~~')
                axios
                .get("/shop/addBlack",{params:{name:name,shopname:this.$route.query.shopname}}).then(res=>{
                  // this.trueArr=res.data.result.list[0].fans
                })
                rows.splice(index,1)
            }
            else{
                console.log('no coming')

            }
        },
        NolaHei(name,index,rows){
            axios
            .get("/shop/NoBlack",{params:{name:name,shopname:this.$route.query.shopname}}).then(ress=>{
                    this.falseArr=res.data.result.list[0].fans
                })
             rows.splice(index,1)
        },
        showfans(){
            axios
            .get("/shop/showFans",{params:{shopname:this.$route.query.shopname}}).then(res=>{
                console.log(res)
                let arr=res.data.result.list[0].fans
                console.log(arr)
                 this.trueArr=arr.filter(item=>{
                    return item.state
                })
                this.falseArr = arr.filter(item=>{
                    return !item.state
                })
                console.log(this.trueArr+' true   ~~')
                // if(arr.state==false)
                // {
                //     this.blacklist=
                // }
            })
        }
    },
    computed:{
        searchData(){
            if(this.fans){
                return this.trueArr.filter((value)=>{  //过滤数组元素
                    return value.name.includes(this.fans); //如果包含字符返回true
                });
            }
            else{
                return this.trueArr;
            }
        },
        searchData1(){
            if(this.black){
                return this.falseArr.filter((value)=>{  //过滤数组元素
                    return value.name.includes(this.black); //如果包含字符返回true
                });
            }
            else{
                return this.falseArr;
            }
        }
    },
    created(){
        this.showfans()
    }
};
</script>

<style scoped>
</style>
