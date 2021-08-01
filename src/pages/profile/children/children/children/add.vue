<template>
<div class="rating_page">
  <head-top :goBack="true" headTitle="编辑地址"></head-top>
  <div class="add_wrap">
    <div class="input_item">
      <input type="text" placeholder="请填写你的姓名" v-model="message">
    </div>
    <router-link tag="div" to="/profile/info/address/add/addDetail" class="input_item">
      <input readonly v-model="addAddress" type="text" placeholder="小区/写字楼/学校等">
    </router-link>
    <div class="input_item">
      <input type="text" placeholder="请填写详细送餐地址" v-model="mesthree">
    </div>
    <div class="input_item">
      <input type="number" placeholder="请填写能够联系到您的手机号" v-model="telenum" required>
    </div>
    <div class="input_item">
      <input type="text" placeholder="备用联系电话(选填)" v-model="standbytelenum">
    </div>
  </div>
  <div class="submit_btn" @click="saveAddress">
    新增地址
  </div>
  <transition name="router-slid" mode="out-in">
    <router-view></router-view>
  </transition>
</div>  
</template>
<script>
import headTop from '../../../../../components/header/header.vue'
import {mapState, mapMutations} from 'vuex'
import {postAddAddress} from 'src/service/getData'
export default {
  components: {
    headTop
  },
  computed: {
    ...mapState(['addAddress', 'userInfo', 'geohash'])
  },
  data() {
    return {
      message:'', //信息
    	mesthree:'', //送餐地址
    	telenum:'', //手机号
    	standbytelenum:'', //备用手机号
    }
  },
  methods: {
    ...mapMutations(['ADD_ADDRESS']),
    async saveAddress() {
      let res = await postAddAddress(this.userInfo.user_id, this.mesthree, this.addAddress, this.geohash, this.message, this.telenum, this.standbytelenum, 0, 1, '公司', 4);
      if (res.message) {
        this.$alert({
          alertText: res.message,
          confirmBtnText: '确定'
        })
      } else {
        //保存的地址存入vuex
        this.ADD_ADDRESS({
          name: this.message,
          address: this.mesthree,
          address_detail: this.addAddress,
          geohash: 'wtw37r7cxep4',
          phone: this.telenum,
          phone_bk: this.standbytelenum,
          poi: this.addAddress,
          poi_type: 0,
        })
        this.$router.go(-1)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../../style/mixin.scss';
.rating_page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f2f2f2;
  z-index: 202;
  padding-top: 1.95rem;
  .add_wrap {
    padding: .3rem .4rem;
    background-color: #fff;
    .input_item {
      margin: .4rem 0;
      input {
        width: 15rem;
        padding: .3rem;
        background-color: #f2f2f2;
        border-radius: 3px;
        border: 1px solid #ddd;
      }
    }
  }
  .submit_btn {
    width: 93%;
    margin: 1rem auto;
    background-color: #4cd964;
    text-align: center;
    padding: .4rem;
    border-radius: 5px;
    @include sc(.7rem, #fff);
  }
}
.router-slid-enter-active, .router-slid-leave-active {
  	    transition: all .4s;
  	}
  	.router-slid-enter, .router-slid-leave-active {
  	    transform: translate3d(2rem, 0, 0);
        opacity: 0;
  	}
</style>