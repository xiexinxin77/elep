<template>
  <div class="page_container">
    <head-top goBack='true' head-title='兑换会员'></head-top>
    <p class="buy_for">
      成功兑换后将关联到账号: <span>{{userInfo.username}}</span>
    </p>
    <form>
      <input v-model="cartNumber" type="number" name="cartNumber" placeholder="请输入10位卡号">
      <input v-model="passWord" type="number" name="passWord" placeholder="请输入6位卡密">
    </form>
    <div class="btn" :class="{couldPay: couldPay}" @click="confrimPay">兑换</div>
  </div>
</template>
<script>
import headTop from 'components/header/header'
import {mapState} from 'vuex'
import {vipCart} from 'src/service/getData'
export default {
  components: {
    headTop
  },
  computed: {
    ...mapState(['userInfo']),
    couldPay: function (){
      return (/^\d{10}$/.test(this.cartNumber))&&(/^\d{6}$/.test(this.passWord)) ;
    },
  },
  data() {
    return {
      cartNumber: '',
      passWord: ''
    }
  },
  methods: {
    async confrimPay() {
      if (this.couldPay) {
        await vipCart(this.userInfo.id, this.cartNumber, this.passWord);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.page_container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 202;
  background-color: #f5f5f5;
  padding-top: 1.95rem;
  .buy_for {
    @include sc(.6rem, #666);
    @include wh(100%, 2rem);
    padding-left: .7rem;
    line-height: 2rem;
    span {
      font-weight: 700;
      margin: 0 .2rem;
    }
  }
  form {
    background-color: #fff;
    input {
      @include sc(.65rem, #999);
      width: 100%;
      padding-left: .7rem;
      height: 2rem;
      border-bottom: 1px solid #f5f5f5;
    }
  }
  .btn {
    @include wh(92%, 2rem);
    background-color: #ccc;
    @include sc(.7rem, #fff);
    text-align: center;
    line-height: 2rem;
    border-radius: 5px;
    font-weight: 700;
    margin: .7rem auto;
  }
  .couldPay {
    background-color: $green;
  }
}
</style>