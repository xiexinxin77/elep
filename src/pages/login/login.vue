<template>
  <div class="login_container">
    <head-top goBack="true" head-title="密码登录"></head-top>
    <form>
      <section class="input_container">
        <input type="text" placeholder="账号" v-model="userAccount">
      </section>
      <section class="input_container">
        <input type="text" placeholder="密码" v-model="password">
      </section>
      <section class="input_container">
        <input type="text" placeholder="验证码" v-model="codeNumber">
        <div class="img_change_img">
          <img v-show="captchaCodeImg" :src="captchaCodeImg" alt="">
            <div class="change_img" @click="getCaptchaCode">
              <p>看不清</p>
              <p>换一张</p>
            </div>
        </div>
      </section>
    </form>
    <p class="login_tip">温馨提示：未注册过的账号，登录时将自动注册</p>
    <p class="login_tip">注册过的用户可凭账号密码登录</p>
    <div class="login_btn" @click="login">
      登录
    </div>
     <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
  </div>
</template>
<script>
import {mobileCode, checkExsis, sendLogin, getcaptchas, accountLogin} from '../../service/getData'
import headTop from '../../components/header/header.vue'
import alertTip from '../../components/common/alertTip.vue'
import {mapMutations}  from 'vuex'
export default {
  components: {
    headTop,
    alertTip
  },
  data() {
    return {
      captchaCodeImg: '', // 验证码图片地址
      showAlert: false,
      alertText: '',
      userAccount: '',
      password: '',
      codeNumber: ''
    }
  },
  mounted() {
    this.getCaptchaCode()
  },
  methods: {
    ...mapMutations(['RECORD_USERINFO']),
    // 获取验证码
    async getCaptchaCode() {
      let res = await getcaptchas()
      this.captchaCodeImg = res.code
    },
    closeTip() {
      this.showAlert = false
    },
    async login() {
      if (!this.userAccount) {
        this.showAlert = true;
        this.alertText = '请输入手机号/邮箱/用户名';
        return
      }else if(!this.password){
        this.showAlert = true;
        this.alertText = '请输入密码';
        return
      }else if(!this.codeNumber){
        this.showAlert = true;
        this.alertText = '请输入验证码';
        return
      }
      let userInfo = await accountLogin(this.userAccount, this.password, this.codeNumber)
      if (!userInfo.user_id) {
        this.showAlert = true
        this.alertText = userInfo.message
        this.getCaptchaCode()
      } else {
        this.RECORD_USERINFO(userInfo)
        this.$router.go(-1)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
.login_container {
  padding-top: 2.5rem;
  background-color: #fff;
  .input_container {
   @include fj;
   padding: .6rem .8rem;
   border-bottom: 1px solid #f1f1f1;
   input {
     @include sc(.7rem, #666);
     outline: none;
   }
   .img_change_img {
     img {
       @include wh(3.5rem, 1.5rem);
       margin-right: .5rem;
       vertical-align: middle;
     }
     .change_img {
       display: inline-block;
       width: 2rem;
       height: 1.5rem;
       font-size: .55rem;
     }
   }
  }
  .login_btn {
    @include sc(.7rem, #fff);
    text-align: center;
    margin: 0 .5rem 1rem;
    padding: .5rem 0;
    border-radius: .15rem;
    background-color: #4cd964;
  }
  .login_tip {
    @include sc(.5rem, red);
    padding: .3rem .55rem;
  }
}
</style>