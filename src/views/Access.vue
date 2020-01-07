<template>
  <div class="container">
   <el-input placeholder="请输入内容" v-model="input1" class="input-with-select">

  </el-input>
   <el-button type="danger" plain class="add-shop" @click="addmanager">添加管理员</el-button>
      <el-table
    :data="searchData"
    style="width: 100%"
    max-height="250" class="ttt">
    <el-table-column
      fixed
      prop="name"
      label="姓名"
      width="150">
    </el-table-column>
    <el-table-column
      prop="age"
      label="工作年限"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="省区"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="180">
    </el-table-column>
    <el-table-column
      prop="adress"
      label="地址"
      width="180">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="clearuser(scope.row.name,scope.$index,searchData)">删除管理员</el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-table>
      
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "gg",
    data(){
      return{
        input3:'',
        userList:[
           {
             name:'',
             age:'',
             province:'',
             city:'',
             adress:'',

           }
        ]
        
      }
    },
    methods:{
     getuser(){
       axios
       .get("/user/getUser").then(res=>{
         this.userList=res.data.result.list
        //  this.shopList.map(item=>{
        //    item.fanss=item.fans.length
        //  })
       
       });
     
     },
    clearuser(user,index,rows){
       var con;
        con=confirm("确定要删除吗？");
        if(con==true)
        {
          console.log(user);
          rows.splice(index,1)
           axios
           .get("/user/clearuser",{params:{name:user}}).then(res => {
                    this.userList = res.data.result.list
                    console.log(res);
                });

        }
        
     },
    //  adduser(user1,arr,index,rows){


    //  }
    addmanager(){
       this.$router.push({ path: "/addmanager" });
     }
    },
    computed:{
      searchData(){
            if(this.input1){
                return this.userList.filter((value)=>{  //过滤数组元素
                    return value.name.includes(this.input1)||value.province.includes(this.input1)||value.city.includes(this.input1)||value.adress.includes(this.input1); //如果包含字符返回true
                });
            }
            else{
                return this.userList;
            }
        }
    },
     created() {
        this.getuser();
    }
  };
</script>

<style scoped>
.ttt{
  margin: 60px 150px 20px 0px;
  text-align: center;
}
.input-with-select{
  margin: 40px 150px 20px 0px;
}
</style>
