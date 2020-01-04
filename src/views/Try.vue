<template>
    <div>
      <div class="t_main">
        <!--<button class="btn" @click="wsy()">王诗媛</button>-->
        <!--<button class="btn" @click="sgwj()">上官文杰</button>-->
        <router-link v-on:click.native="syy" :to="{path:'./oo',query: {id: 'oo'}}">wsy</router-link>
        <router-link v-on:click.native="syy" :to="{path:'./oo',query: {id: 'gg'}}">sgwj</router-link>
        <div class="t_show">
          <router-view :t_name="name"></router-view>
        </div>
      </div>

      <div>
        <input v-model="num1" type="text">
        <select v-model="czf">
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </select>
        <input v-model="num2" type="text">
        <button @click="suan()" class="btn">=</button>
        <br>
        <input v-model="res" type="text">
      </div>

      <p v-bind:class="[{'red':redFlag},'big']">这是一串文字</p>
      <p v-bind:class="{red:true,big:true}">这也是一串文字</p>
      <p v-bind:style="stylee">这还是一串文字</p>

      <p v-for="(val,key,i) in user">{{val}}--{{key}}--{{i}}</p>

      <label>id:
        <input type="text" v-model="id">
      </label>

      <label>name:
        <input type="text" v-model="name" @keyup.enter="add">
      </label>

      <button @click="add()" class="btn">添加</button>

      <label>搜索关键词:
        <input type="text" v-model="fil">
      </label>

      <div v-for="item in ser(fil)" :key="item.id">
        <p>{{item.id}} : {{item.name}} --创建时间: {{item.creTime}}</p>
        <button @click="del(item.id)">删除</button>
      </div>

      <router-link to="/try/oo?id=22&name=wsy">toO</router-link>
      <router-link to="/try/gg">toG</router-link>

      <router-view></router-view>

      <!--<love :china="zhu"></love>-->

      <love @say="parentS"></love>
      <p>{{sonmsg}}</p>

    </div>
</template>

<script>
  import love from '@/components/Love'

  // Vue.filter('zhuFormat',function(data){
  //   return replace('猪','pig');
  // })


  // import oo from '@/components/Oo'
    export default {
        name: "try",
        data(){
          return{
            zhu:'我是个猪，你是个猪，大家都是猪',
            name:'',
            age:'',
            num1:0,
            num2:0,
            czf:'+',
            res:0,
            redFlag:false,
            stylee:{color:'green',fontSize:'40px'},
            user:{
              name:'wsy',
              age:12,
              sex:'female'
            },
            id:'',
            name:'',
            list:[{
                id:1,
                name:'wsy',
                creTime:new Date()
              },
              {
                id:2,
                name:'sgwj',
                creTime:new Date()
              },
              {
                id:3,
                name:'zhuzhu',
                creTime:new Date()
              }],
            fil:'',
            sonmsg:''
          }
        },
      methods:{
          parentS(fromson){
            console.log('ooo');
            this.sonmsg=fromson;
          },

          ser(fil){
            // console.log(newArr);
            // var newlist=[];
            // this.list.forEach((item)=>{
            //   if(item.name.indexOf(fil)!=-1){
            //     newlist.push(item);
            //   }
            // })

            // this.list.forEach(function(item){
            //   if(item.name.indexOf(fil)!= -1){
            //     newlist.push(item);
            //   }
            // })

            var neww=this.list.filter((item)=>{
              if(item.name.includes(fil)){
                return item;
              }
            })

            return neww;

            // return newlist;
          },
          add(){
            this.list.push({id:this.id,name:this.name,creTime:new Date()});
            this.id='';
            this.name='';
          },
          del(id){
            // alert(id);
            this.list.some((item,index)=>{
              if(item.id==id){
                this.list.splice(index,1);
                return true;
              }
            })

          },
          suan(){
            switch(this.czf){
              case ('+'):this.res=parseInt(this.num1)+parseInt(this.num2);
              break;
              case ('-'):this.res=this.num1-this.num2;
                break;
              case ('*'):this.res=this.num1*this.num2;
                break;
              case ('/'):this.res=this.num1/this.num2;
                break;
            }
          },
        syy(){
          // // alert(1);
          // var a=this.$route.query.id;
          // console.log(a);
          // axios.post('/goods/tryy',{
          //   tryId:a
          // }).then((response)=>{
          //   var res=response.data;
          //   this.name=res.result.name;
          //   this.age=res.result.age;
          // })
        }

      },
      components:{love}
    }
</script>

<style scoped>
  .router-link-active{
    color:yellow;
  }
  .t_main{
    width: 800px;
    height:500px;
    /*background:pink;*/
  }
  .t_show{
    width: 500px;
    height: 450px;
    margin-top:20px;
    background:yellowgreen;
  }
  *{
    font-size:20px;
    margin:20px;
    color:black;
  }

  .red{
    color:red;
  }

  .big{
    font-size:50px;
  }
</style>
