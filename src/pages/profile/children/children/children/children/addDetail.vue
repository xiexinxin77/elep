<template>
  <div class="rating_page">
    <head-top goBack='true' head-title='搜索地址'></head-top>
    <div class="add_detail">
      <input v-model="searchValue" type="text" placeholder="请输入小区/写字楼/学校等">
      <button @click="searchPlace">确认</button>
    </div>
    <div class="warnpart">
      为了满足商家的送餐要求，建议您从列表中选择地址
    </div>
    <ul class="search_result">
      <li v-for="item in addressList" :key="item.geohash" @click="listClick(item.name)">
        <p>{{item.name}}</p>
        <p>{{item.address}}</p>
      </li>
    </ul>
    <div class="point" v-show="addressList.length === 0">
      <p>找不到地址？</p>
      <p>请尝试输入小区、写字楼或学校名</p>
      <p>详细地址（如门牌号）可稍后输入哦。</p>
    </div>
  </div>
</template>
<script>
import headTop from 'components/header/header'
import {searchNearby} from 'src/service/getData'
import {mapState, mapMutations} from 'vuex'
export default {
  components: {
    headTop
  },
  computed: {
    ...mapState(['addAddress'])
  },
  data() {
    return {
      searchValue: '',
      addressList: []
    }
  },
  created(){
    this.searchValue = this.addAddress || this.searchValue
  },
  methods: {
    ...mapMutations(['SAVE_ADDDETAIL']),
    async searchPlace() {
      if (this.searchValue) {
        let res = await searchNearby(this.searchValue)
        this.addressList = res
      }
    },
    listClick(address) {
      this.SAVE_ADDDETAIL(address)
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../../../style/mixin.scss';
.rating_page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f2f2f2;
  z-index: 202;
  padding-top: 1.95rem;
  .add_detail {
    background-color: #fff;
    @include fj;
    align-items: center;
    padding: .4rem .3rem;
    input {
      width: 11.8rem;
      padding: .4rem;
      background-color: #f2f2f2;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: .6rem;
    }
    button {
      width: 3rem;
      height: 100%;
      background-color: $blue;
      padding: .4rem;
      @include sc(.7rem, #fff);
      border-radius: 5px;
    }
  }
  .warnpart {
    @include sc(.62rem, #FF883F);
    text-align: center;
    background-color: #FFF6E4;
    padding: .3rem;
  }
  .search_result {
    li {
      padding: .4rem;
      border-bottom: 1px solid #ddd;
      p {
        @include sc(.65rem, #969696);
        padding: .1rem 0;
      }
    }
  }
  .point {
    @include center;
    width: 100%;
    p {
      @include sc(.7rem, #969696);
      margin-bottom: .4rem;
      text-align: center;
    }
  }
}
</style>