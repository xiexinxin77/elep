<template>
  <div class="search_container">
    <head-top goBack='true' head-title='搜索'></head-top>
    <div class="input_container">
      <input type="text" placeholder="请输入商家或美食名称" v-model="searchValue" @input="checkInput">
      <button @click="search('')">提交</button>
    </div>
    <div class="search_result">
      <ul>
        <li v-for="item in searchResult" :key="item.id">
          <div class="item_left">
            <img :src="imgBaseUrl + item.image_path" class="restaurant_img">
          </div>
          <div class="item_right">
            <p>
              <span>{{item.name}}</span>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="14" class="pay_icon">
                  <polygon points="0,14 4,0 24,0 20,14" style="fill:none;stroke:#FF6000;stroke-width:1" />
                  <line x1="1.5" y1="12" x2="20" y2="12" style="stroke:#FF6000;stroke-width:1.5"/>
                  <text x="3.5" y="9" style="fill:#FF6000;font-size:9;font-weight:bold;">支付</text>
              </svg>
            </p>
            <p>月售 {{item.month_sales||item.recent_order_num}} 单</p>
            <p>{{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离{{item.distance}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="search_history" v-if="searchHistory.length && !searchResult.length">
      <h4>搜索历史</h4>
      <ul>
        <li v-for="item in searchHistory" :key="item" class="search_item" @click="search(item)">
          <span class="history_text ellipsis">{{item}}</span>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="delete_icon" @click="deleteHistory(index)">
            <line x1="8" y1="8" x2="18" y2="18" style="stroke:#999;stroke-width:3" />
            <line x1="18" y1="8" x2="8" y2="18" style="stroke:#999;stroke-width:3" />
          </svg>
        </li>
        <li class="clearAll" @click="clearAll">清空搜索历史</li>
      </ul>
    </div>
  </div>
</template>
<script>
import headTop from 'components/header/header'
import {searchRestaurant} from 'src/service/getData'
import {getStore, setStore, removeStore} from '../../config/mUtils'
import {imgBaseUrl} from '../../config/env'
export default {
  components: {
    headTop
  },
  data() {
    return {
      searchValue: '', // 搜索内容
      searchHistory: [], // 搜索历史
      searchResult: [],
      imgBaseUrl
    }
  },
  mounted() {
    this.geohash = this.$route.params.geohash
    if (getStore('searchHistory')) {
      this.searchHistory = JSON.parse(getStore('searchHistory'))
    }
  },
  methods: {
    async search(searchValue) {
      if (searchValue) {
        this.searchValue = searchValue
      }
      if (!this.searchValue) {
        return
      }
      this.searchResult = await searchRestaurant(this.geohash, this.searchValue);
      if (!this.searchResult.length) {
        this.$alert({
          alertText: '很抱歉,没有搜索到结果',
          confirmBtnText: '确定'
        })
      }

      if (this.searchHistory.length) {
        let checkRepeat = false
        this.searchHistory.forEach(item => {
          if (item == this.searchValue) {
            checkRepeat = true
          }
        })
        if (!checkRepeat) {
          this.searchHistory.push(this.searchValue)
        }
      } else {
        this.searchHistory.push(this.searchValue)
      }
      setStore('searchHistory', this.searchHistory)
    },
    deleteHistory(index) {
      this.searchHistory.splice(index, 1)
      setStore('searchHistory', this.searchHistory)
    },
    clearAll() {
      this.searchHistory = []
      removeStore('searchHistory')
    },
    checkInput() {
      if (!this.searchValue) {
        this.searchResult = []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.search_container {
  padding-top: 1.95rem;
  .input_container {
    @include fj;
    background-color: #fff;
    padding: .5rem;
    input {
      flex: 4;
      @include sc(.65rem, #333);
      height: 1.5rem;
      background-color: #f2f2f2;
      font-weight: 700;
      border: .025rem solid #e4e4e4;
      padding: 0 .25rem;
    }
    button {
      flex: 1;
      height: 1.5rem;
      background-color: $blue;
      @include sc(.65rem, #fff);
      font-weight: 700;
      border-radius: 5px;
      padding: 0 .25rem;
      margin-left: .3rem;
    }
  }
  .search_result {
    ul {
      li {
        @include fj;
        align-items: center;
        padding: .4rem;
        .item_left {
          margin-right: 1rem;
          img {
            @include wh(1.7rem, 1.7rem)
          }
        }
        .item_right {
          flex: 1;
          p {
            @include sc(.55rem, #333);
          }
        }
      }
    }
  }
  .search_history {
    h4 {
      height: 2rem;
      line-height: 2rem;
      @include sc(.6rem, #666);
      font-weight: 700;
      padding-left: .4rem;
    }
    ul {
      background-color: #fff;
      li {
        @include fj;
        align-items: center;
        @include sc(.6rem, #333);
        padding: .5rem;
        border-bottom: 1px solid #ddd;
        .history_text {
          width: 80%;
        }
        .delete_icon{
          @include wh(1rem, 1rem);
        }
      }
      .clearAll {
        display: block;
        text-align: center;
        @include sc(.8rem, $blue);
        font-weight: 700;
      }
    }
  }
}
</style>