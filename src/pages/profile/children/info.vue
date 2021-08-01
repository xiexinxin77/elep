<template>
  <div class="info_container">
    <head-top goBack='true' head-title='账户信息'></head-top>
    <div class="profile_info">
      <div class="headportrait">
        <input type="file" class="file_input" @change="uploadAvatar">
        <h2>头像</h2>
        <div class="headportrait_right">
          <span class="avater">
            <img v-if='userInfo' :src="imgBaseUrl + userInfo.avatar" alt="">
            <svg v-else>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
            </svg>
          </span>
          <span class="narrow">
            <svg fill="#d8d8d8">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </span>
        </div>
      </div>
      <router-link tag="div" to="/profile/info/setusername" class="headportrait">
        <h2>用户名</h2>
        <div class="headportrait_right">
          <span class="name">
            {{username}}
          </span>
          <span class="narrow">
            <svg fill="#d8d8d8">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </span>
        </div>
      </router-link>
      <router-link tag="div" to="/profile/info/address" class="headportrait">
        <h2>收货地址</h2>
        <div class="headportrait_right">
          <span class="narrow">
            <svg fill="#d8d8d8">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </span>
        </div>
      </router-link>
      <div class="bind_phone">
        账号绑定
      </div>
      <div class="headportrait" @click="bindPhone">
        <h2>
          <img src="../../../images/bindphone.png" style="display:inline-block;margin-right:.4rem;" alt="">
          手机
        </h2>
        <div class="headportrait_right">
          <span class="narrow">
            <svg fill="#d8d8d8">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </span>
        </div>
      </div>
      <div class="safe_set">
        安全设置
      </div>
       <div class="headportrait">
        <h2>登录密码</h2>
        <div class="headportrait_right">
          <span class="name">
            修改
          </span>
          <span class="narrow">
            <svg fill="#d8d8d8">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </span>
        </div>
      </div>
      <div class="exitLogin" @click="exitLogin">退出登录</div>
    </div>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>  
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import headTop from '../../../components/header/header'
import {imgBaseUrl} from 'src/config/env'
import {signout} from 'src/service/getData'
import {removeStore} from '../../../config/mUtils'
export default {
  components: {
    headTop
  },
  data() {
    return {
      username: '',
      imgBaseUrl
    }
  },
  activated() {
    console.log('dfdsfd')
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {
    userInfo: function(value) {
      if (value && value.user_id) {
        this.username = value.username
      }
    }
  },
  methods: {
    ...mapMutations(['OUT_LOGIN']),
    async uploadAvatar() {
      if (this.userInfo) {
        let input = document.querySelector('.file_input')
        let data = new FormData()
        data.append('file', input.files[0]);
        try {
          let response = await fetch('/eus/v1/users/' + this.userInfo.user_id + '/avatar', {
            method: 'POST',
            credentials: 'include',
            body: data
          })
          let res = await response.json();
          if (res.status == 1) {
            this.userInfo.avatar = res.image_path;
          }
        }catch(error) {
          console.log(error)
        }
      }
    },
    exitLogin() {
      this.$alert({
        alertText: '是否退出登录',
        confirmBtnText: '确定',
        cancelBtnText: '取消',
        confirmAction: async () => {
          this.OUT_LOGIN()
          this.$router.go(-1);
          removeStore('user_id')
          await signout()
        }
      })
    },
    bindPhone() {
      this.$alert({
        alertText: '请在手机APP中设置',
        confirmBtnText: '确认'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../style/mixin.scss';
.info_container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f2f2f2;
  z-index: 202;
  padding-top: 1.95rem;
  p, span{
      font-family: Helvetica Neue,Tahoma,Arial;
  }
  .profile_info {
    margin-top: .5rem;
    .headportrait {
      @include fj;
      align-items: center;
      padding: .5rem .6rem;
      border: 1px solid #ddd;
      background-color: #fff;
      margin-top: -1px;
      .file_input {
        display: block;
        position: absolute;
        opacity: 0;
        top: 2.35rem;
        left: 0;
        width: 100%;
        height: 3.1rem
      }
      h2 {
        @include fj;
        align-items: center;
        @include sc(.6rem, #333);
      }
      .headportrait_right {
        @include fj;
        align-items: center;
        .avater {
          @include fj;
          @include wh(2rem, 2rem);
          border-radius: 50%;
        }
        .name {
          @include fj;
          @include sc(.7rem, #999);
          @include wh(auto, 1.4rem);
          font-weight: 100;
          align-items: center;
        }
        .narrow {
          margin-left: .3rem;
          @include fj;
          @include wh(.67rem, 1.4rem);
        }
      }
    }
    .safe_set, .bind_phone {
      @include sc(.5rem, #666);
      padding: .4rem;
    }
    .exitLogin {
      width: 93%;
      @include sc(.6rem, #fff);
      text-align: center;
      background-color: #d8584a;
      border-radius: 5px;
      line-height: 1.5;
      margin: 1rem auto;
      padding: .3rem;
    }
  }
  
}
body .coverpart .cover-animate{
    transition:all 1s;
    animation:bounceIn .6s;
}
body .coverpart .cover-animate-leave{
    animation:zoomOut .4s;
}
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
</style>