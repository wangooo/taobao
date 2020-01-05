<template>
  <div>
     <el-table
    :data="newshoplist"
    border
    style="width: 100%" class="apply">
    <el-table-column
      fixed
      prop="ordername"
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
        <el-button @click="handleClick(scope.row)" type="text" size="small">通过</el-button>
        <el-button type="text" size="small">拒绝</el-button>
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
                  ordername:'1',
                  shopname:'2',
                  desc:'3',
                  credit:'4',
                  applytime:'5'
              }
          ]
      }
    },
  //  components:{FFF},
    methods:{
      
  }
  }
</script>

<style scoped>

</style>
