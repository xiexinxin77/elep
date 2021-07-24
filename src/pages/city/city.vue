<template>
  <div class="city_container">
    <head-top :head-title="cityname" go-back='true'>
      <router-link to="/home" slot="changecity" class="change_city">切换城市</router-link>
    </head-top>
    <form v-on:submit.prevent>
      <div class="search_input" >
        <input type="text" name="city" required placeholder="输入学校,商务楼,地址" v-model="searchValue">
      </div>
      <div class="search_submit">
        <button @click="search">提交</button>
      </div>
    </form>
    <div class="search_result">
      <h5 v-if="historytitle">搜索历史</h5>
      <ul>
        <li v-for="(item, index) in placeList" :key="index" @click='goNext(index, item.geohash)'>
          <h4 class="pois_name ellipsis">{{item.name}}</h4>
          <p class="pois_address ellipsis">{{item.address}}</p>
        </li>
      </ul>
      <div class="clearA" v-if="historytitle&&placeList.length" @click="clearAll">清空所有</div>
      <div v-if="placeNone" class="search_none_place">很抱歉！无搜索结果</div>
    </div>
  </div>
</template>
<script>
import {currentcity, searchplace} from 'src/service/getData'
import {getStore, setStore, removeStore} from 'src/config/mUtils'
import headTop from '../../components/header/header'
export default {
  components: {
    headTop
  },
  data() {
    return {
      cityid: '',
      searchValue: '',
      placeList: [], // 搜索结果
      placeNone: false,
      historytitle: true,
      cityname: ''
    }
  },
  mounted() {
    this.cityid = this.$route.params.cityid
    currentcity(this.cityid).then(res => {
      this.cityname = res.name;
    })
    this.initData()
  },
  methods: {
    initData() {
      if (getStore('placeHistory')) {
        this.placeList = JSON.parse(getStore('placeHistory'))
      } else {
        this.placeList = []
      }
    },
    search() {
      if (this.searchValue) {
        searchplace(this.cityid, this.searchValue).then(res => {
          this.placeList = res
          this.historytitle = false
          if (this.placeList.length == 0) {
            this.placeNone = true
          }
        })
      }
    },
    clearAll() {
      removeStore('placeHistory')
      this.placeList = []
    },  
    goNext(index, geohash) {
      let history = getStore('placeHistory');
      let choosePlace = this.placeList[index];
      let historyPlace = []
      if (history) {
        let checkrepeat = false
        historyPlace = JSON.parse(history)
        historyPlace.forEach(item => {
          if (item.geohash == geohash) {
            checkrepeat = true; 
          }
        })
        if (!checkrepeat) {
          historyPlace.push(choosePlace)
        }
      } else {
        historyPlace.push(choosePlace)
      }
      setStore('placeHistory',historyPlace)
      this.$router.push({path:'/msite', query:{geohash}})
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
.city_container {
  padding-top: 2.3rem;
  form {
    background-color: #fff;
    padding: .4rem .8rem;
    border: 1px solid #e4e4e4;
    input,button {
      @include wh(100%, 1.4rem)
    }
    input {
      border: 1px solid #e4e4e4;
      margin-bottom: .4rem;
      padding: 0 .4rem;
    }
    button {
      background-color:$blue;
      @include sc(.65rem, #fff)
    }
  }
  .search_result {
    background-color: #fff;
    h5 {
      border-top: 1px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4;
      padding-left: .5rem;
      font-size: .4rem;
    }
    li {
      border-bottom: 1px solid #e4e4e4;
      padding: .4rem .8rem;
      .pois_name {
        @include sc(.65rem, #333);
        margin-bottom: .4rem;
      }
      .pois_address {
        @include sc(.45rem, #999)
      }
    }
    .clearA {
      font-size: .7rem;
      color: #666;
      text-align: center;
      line-height: 2rem;
      background-color: #fff;
    }
    .search_none_place {
      @include font(0.65rem, 1.75rem);
      color: #333;
      padding-left: .4rem;
    }
  }
  .change_city {
    @include ct;
    right: .4rem;
    @include sc(.45rem, #fff)
  }
}
</style>