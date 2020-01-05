<template>
  <div class="container">
   <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">

  </el-input>
      <el-table
    :data="searchData"
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
      prop="fans"
      label="粉丝量"
      width="180">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
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
        input3:'',
        shopList:[{
          shopname:'1',
        ordername:'2',
        kind:'3',
        level:'4',
        credit:'5',
        fans:'10'
        },
        {
          shopname:'6',
        ordername:'7',
        kind:'8',
        level:'9',
        credit:'10',
        fans:'10'
        }
        ]
        
      }
    },
    methods:{
     
    },
    computed:{
      searchData(){
            if(this.input3){
                return this.shopList.filter((value)=>{  //过滤数组元素
                    return value.shopname.includes(this.input3)||value.ordername.includes(this.input3)||value.kind.includes(this.input3)||value.level.includes(this.input3)
                    ||value.credit.includes(this.input3)||value.fans.includes(this.input3); //如果包含字符返回true
                });
            }
            else{
                return this.shopList;
            }
        }
    }
    // axios.get
  }
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
