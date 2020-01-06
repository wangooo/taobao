<template>
  <div>
     <el-table
    :data="newshoplist"
    border
    style="width: 100%" class="apply">
    <el-table-column
      fixed
      prop="order"
      label="店主名称"
      width="150">
    </el-table-column>
    <el-table-column
      prop="shopname"
      label="新店名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="desc"
      label="描述信息"
      width="120">
    </el-table-column>
    <el-table-column
      prop="credit"
      label="店主信用"
      width="120">
    </el-table-column>
    <el-table-column
      prop="applytime"
      label="申请时间"
      width="120">
    </el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="Addshop(scope.row.order,scope.row,scope.$index,newshoplist)" type="text" size="small">通过</el-button>
        <el-button type="text" size="small" @click="refuse(scope.row.order,scope.$index,newshoplist)">拒绝</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
  import axios from 'axios'
  //import FFF from '@/components/Footer.vue'

  export default {
   // name: "gg",
    data(){
      return{
          newshoplist:[
              {
                  order: '',
                  desc: '',
                  credit: '',
                  applytime: '',
                  shopname: '',
              }
          ]
      }
    },
  //  components:{FFF},
    methods:{
      getnewshop(){
          axios
          .get("/check/getNewShop").then(res=>{
              this.newshoplist=res.data.result.list
          })
      },
      refuse(order1,index,rows){
        rows.splice(index,1);
        axios
        .get("/check/clearCheck",{params:{order:order1}}).then(res => {
                    this.newshoplist = res.data.result.list
                    console.log(res);
                });

      },
      Addshop(arr,index,rows){
        var con;
        con=confirm("确定要通过？");
        if(con==true)
        {
        
         axios
         .get("/shop/AddShop",{params:{
           shopname:arr.shopname,
           desc:arr.desc,
           order:arr.order
           }}).then(res=>{
              this.shopList=res.data.result.list
           })
           rows.splice(index,1)
            axios
         .get("/check/clearCheck",{params:{order:order1}}).then(res => {
                    this.newshoplist = res.data.result.list
                    console.log(res);
                });
        }
      }
  },
  created(){
      this.getnewshop();
  }
  }
</script>

<style scoped>

</style>
