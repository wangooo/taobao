<template>
    <div>
      <template>
       <!-- <el-input v-model="search"></el-input> -->
       搜索：<el-input v-model="fans"></el-input>
        <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="date"
      label="工作年限"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="工作地省份"
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
        <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
        <el-button type="text" size="small">添加</el-button>
      </template>
    </el-table-column>
  </el-table> 
  </template>
</div>
</template>
   
<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: rgb(12, 10, 10);
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }

  .my-autocomplete {
    line-height: normal;
  padding:7px;
  }


    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }


</style>
   
<script>
import axios from "axios";

export default {
    name: "gg",
    data() {
      return {
         tableData: [
        //    age:'5',
        //   name:'张三',
         
        //   address: '上海市普陀区金沙江路 1518 弄'
        //  }, {
          
        //   name: '李四',
          
        //   address: '上海市普陀区金沙江路 1517 弄'
        //  }, {
        //    date: '2016-05-01',
        //    name: '王小虎',
        //    address: '上海市普陀区金沙江路 1519 弄'
        //  }, {
        //   date: '2016-05-03',
        //   name: '王小虎',
        // address: '上海市普陀区金沙江路 1516 弄'
          ],
        
      search:""
      }
    },
     methods:{
        handleClick(){
            alert('确定删除吗？')
        }
     },
      getShops() {
            let order = "张三";
            axios
                .get("/user/getMyuser", {params:{
                    order:'张三'
                }})
                .then(res => {
                    this.shopLists = res.data.result.list
                    console.log(res);
                });
        },
    created() {
        this.getShops();
    },
    computed:{
        searchData(){
            if(this.users){
                return this.tableData.filter((value)=>{  //过滤数组元素
                    return value.name.includes(this.users); //如果包含字符返回true
                });
            }
            else{
                return this.tableData;
            }
        }
    }
};
//     methods: {
//     },
//     created(){
//      axios.get('/user/getUsers').then((response)=>{
//                let res=response.data;
//               if(res.status=='0'){
//                 console.log("见成果了");
//                  this.getCardList();
//                }
//             });
//     }
// };
</script>