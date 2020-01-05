<template>
    <div>
        <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Nshops"
      label="店铺数量"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="shanchu(scope.row)" type="text" size="small">删除</el-button> 
        <!-- <el-button type="text" size="small">删除</el-button> -->
      </template>
    </el-table-column>
  </el-table> 
  
</div>
</template>
    
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>
   
<script>
import axios from "axios";

export default {
    name: "gg",
    data() {
      return {
        tableData: [{
          name:'zyf',
          Nshops:'5',
          city:'上海',
          address: '上海市普陀区金沙江路 1518 弄'
      }]
      }},
       methods:{
        shanchu(){
            alert('确定删除吗？')
        }
    },
    computed:{
        searchData(){
            if(this.fans){
                return this.tableData.filter((value)=>{  //过滤数组元素
                    return value.name.includes(this.shopkeepers); //如果包含字符返回true
                });
            }
            else{
                return this.tableData;
            }
        }
    }
};
//     methods: {},
//     created(){
//       axios.get('/user/getUsers').then((response)=>{
//               let res=response.data;
//               if(res.status=='0'){
//                 console.log("见成果了");
//                 this.getCardList();
//               }
//             });
//     }
// };
</script>

<style scoped>
</style>
