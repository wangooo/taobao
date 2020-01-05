<template>
  <div class="container">
   <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">

    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
      <el-table
    :data="shopList"
    style="width: 100%"
    max-height="250" class="ttt">
    <el-table-column
      fixed
      prop="shopname"
      label="店铺名称"
      width="150">
    </el-table-column>
    <el-table-column
      prop="ordername"
      label="店主"
      width="120">
    </el-table-column>
    <el-table-column
      prop="kind"
      label="种类"
      width="120">
    </el-table-column>
    <el-table-column
      prop="credit"
      label="信用"
      width="180">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click=""
          type="text"
          size="small">
          关闭店铺
        </el-button>
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
        shopList:[{
          shopname:'1',
        ordername:'1',
        kind:'1',
        level:'1',
        credit:'1'
        },
        {
          shopname:'2',
        ordername:'2',
        kind:'2',
        level:'2',
        credit:'2'
        }
        ]
        
      }
    },
    methods:{
      select(){

      }
    }
    // axios.get
  }
</script>

<style scoped>
.ttt{
  margin: 60px 150px 20px 150px;
  text-align: center;
}
.input-with-select{
  margin: 40px 150px 20px 150px;
}
</style>
