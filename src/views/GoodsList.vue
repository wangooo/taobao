<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span slot="bread">Goods!</span>
      <span slot="test">and try</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortChange">
            Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showright">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filters_by_show}">
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
                      <img v-bind:src="'/static/'+item.productImage">
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a
                        href="javascript:;"
                        class="btn btn--m"
                        @click="addCart(item.productId)"
                      >加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="busy"
                infinite-scroll-distance="30"
              >
                <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
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
      loading: false
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
    getGoodsList(flag) {
      this.loading = true;
      let pa = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        priceChecked: this.priceChecked
      };
      axios
        .get("/goods/list", {
          params: pa
        })
        .then(result => {
          this.loading = false;

          var res = result.data;
          console.log(res);
          if (res.status == "0") {
            if (flag) {
              this.goodsList = this.goodsList.concat(res.result.list);
              if (res.result.count == 0) {
                this.busy = true;
              } else {
                this.busy = false;
              }
            } else {
              this.goodsList = res.result.list;
              this.busy = false;
            }
          } else {
            this.goodsList = [];
          }
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
    sortChange() {
      this.sortFlag = !this.sortFlag;
      this.page = 1;
      this.getGoodsList();
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
    }
  }
};
</script>
