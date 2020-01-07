<template>
    <div>
        <!-- <nav-header></nav-header>
    <nav-bread>
      <span slot="bread">Goods!</span>
      <span slot="test">and try</span>
        </nav-bread>-->
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">Sort by:</span>
                    <a href="javascript:void(0)" class="default cur" @click="sortChange(true)">已上架</a>
                    <a href="javascript:void(0)" class="price" @click="sortChange(false)">
                        待上架
                        <!-- <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
                        </svg>-->
                    </a>
                    <a
                        href="javascript:void(0)"
                        class="filterby stopPop"
                        @click="showright"
                    >Filter by</a>
                </div>
                <div class="accessory-result">
                    <!-- filter -->
                    <div
                        class="filter stopPop"
                        id="filter"
                        v-bind:class="{'filterby-show':filters_by_show}"
                    >
                        <el-button
                            type="warning"
                            style="margin:20px 0;width:200px"
                            @click="addGood($route.query.id,$route.query.shopname)"
                        >添加商品</el-button>
                        <dl class="filter-price">
                            <dt>Price:</dt>
                            <dd>
                                <a
                                    href="javascript:void(0)"
                                    v-bind:class="{'cur':priceChecked=='all'}"
                                    @click="selectAll()"
                                >All</a>
                            </dd>
                            <dd v-for="(item,index) in priceFilter" :key="index">
                                <a
                                    href="javascript:void(0)"
                                    v-bind:class="{'cur':priceChecked==index}"
                                    @click="selectIndex(index)"
                                >{{item.start}} - {{item.end}}</a>
                            </dd>
                        </dl>
                    </div>

                    <!-- search result accessories list -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                <li v-for="(item,index) in goodsList" :key="index">
                                    <div class="pic">
                                        <a href="#">
                                            <img v-bind:src="'/static/'+item.productImage" />
                                        </a>
                                    </div>
                                    <div class="main">
                                        <div class="name">{{item.productName}}</div>
                                        <div class="price">{{item.salePrice}}</div>
                                        <div class="btn-area">
                                            <!-- <a
                        href="javascript:;"
                        class="btn btn--m"
                        @click="addCart(item.productId)"
                                            >加入购物车</a>-->
                                            <el-button
                                                type="primary"
                                                style="width:45%"
                                                @click="editGood"
                                            >编辑</el-button>
                                            <el-button
                                                type="danger"
                                                style="width:45%"
                                                v-if="goodsState"
                                                @click="changeStatues('1')"
                                            >下架</el-button>
                                            <el-button type="danger" style="width:45%" v-else @click="changeStatues('2')">上架</el-button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div
                                v-infinite-scroll="loadMore"
                                infinite-scroll-disabled="busy"
                                infinite-scroll-distance="30"
                            >
                                <img
                                    src="./../assets/loading-spinning-bubbles.svg"
                                    v-show="loading"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" @click="hiddenright" v-show="zhezhao"></div>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
import "./../assets/css/base.css";
import "./../assets/css/product.css";
import "./../assets/css/checkout.css";
import "./../assets/css/login.css";

import NavHeader from "@/components/Header";
import NavFooter from "@/components/Footer";
import NavBread from "@/components/NavBread";

import axios from "axios";
import infinitescroll from "infinite-scroll";

export default {
    data() {
        return {
            goodsList: [],
            priceFilter: [
                {
                    start: "0.00",
                    end: "50.00"
                },
                {
                    start: "50.00",
                    end: "500.00"
                },
                {
                    start: "500.00",
                    end: "1000.00"
                },
                {
                    start: "1000.00",
                    end: "10000.00"
                }
            ],
            priceChecked: "all",
            filters_by_show: false,
            zhezhao: false,
            page: 1,
            pageSize: 8,
            sortFlag: true,
            busy: true,
            loading: false,
            goodsState: true
        };
    },
    components: {
        NavHeader,
        NavFooter,
        NavBread
    },
    mounted: function() {
        this.getGoodsList();
    },
    methods: {
        addGood(id,name) {
            console.log(id);
            this.$router.push({ path: "/goodForm",query:{id:id,shopname:name}});
        },
        editGood() {
            this.$router.push({ path: "/goodForm" });
        },
        getGoodsList(flag) {
            this.loading = true;
            let shopId = this.$route.query.id;

            let order = "wsy";
            axios
                .get("/shop/getGoods", {
                    params: {
                        id: shopId
                    }
                })
                .then(res => {
                    let arr= res.data.result.list.goods.filter(item=>{
                        if(item.state == this.goodsState){
                            return item;
                        }
                    });
                    this.goodsList = arr;
                    

                    this.loading = false;

                    console.log(res);
                });
        },
        showright() {
            (this.filters_by_show = true), (this.zhezhao = true);
        },
        hiddenright() {
            (this.filters_by_show = false), (this.zhezhao = false);
        },
        selectIndex(index) {
            (this.priceChecked = index),
                (this.filters_by_show = false),
                (this.zhezhao = false),
                (this.page = 1),
                this.getGoodsList();
        },
        selectAll() {
            (this.priceChecked = "all"),
                (this.filters_by_show = false),
                (this.zhezhao = false),
                (this.page = 1),
                this.getGoodsList();
        },
        sortChange(flag) {
            if (flag) {
                this.goodsState = true;
                this.getGoodsList()
                // let newList=this.goodsList.map(item=>{})
            } else {
                this.goodsState = false;
                this.getGoodsList()
            }
            // this.sortFlag = !this.sortFlag;
            // this.page = 1;
            // this.getGoodsList();
        },
        loadMore() {
            this.busy = true;
            setTimeout(() => {
                this.page++;
                this.getGoodsList(true);
            }, 500);
        },
        addCart(productId) {
            axios
                .post("/goods/addCart", {
                    productId: productId
                })
                .then(res => {
                    console.log(res.status);
                    if (res.data.status == 0) {
                        alert("插入成功");
                    } else {
                        alert("msg:" + res.msg);
                    }
                });
        },
        changeStatues(val){
            
        }
    }
};
</script>
