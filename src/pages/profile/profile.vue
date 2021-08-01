<template>
  <div class="profile_container">
    <head-top goBack='true' head-title="我的"></head-top>
    <router-link class="profile_info" tag="div" :to="userInfo&&userInfo.user_id? '/profile/info' : '/login'">
      <div class="profile_left">
        <img :src="imgBaseUrl + userInfo.avatar" class="privateImage" v-if="userInfo&&userInfo.user_id">
        <div class="user_info">
          <p class="username">{{username}}</p>
          <p class="mobile">
            <span class="icon">
              <svg class="icon-mobile" fill="#fff">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
              </svg>
            </span>
            <span class="icon-mobile-number">{{mobile}}</span>
          </p>
        </div>
      </div>
      <div class="profile_right">
        <span>
          <svg class="arrow-svg" fill="#fff">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </span>
      </div>
    </router-link>
    <div class="profile_money clear">
      <router-link tag="div" to="/blance" class="money">
        <p><span class="amount">{{parseInt(balance).toFixed(2)}}</span>元</p>
        <p>我的余额</p>
      </router-link>
      <router-link tag="div" to="/benefit" class="fav">
        <p><span>{{count}}</span>个</p>
        <p>我的优惠</p>
      </router-link>
      <div class="credit">
        <p><span>{{pointNumber}}</span>分</p>
        <p>我的积分</p>
      </div>
    </div>
    <div class="profile-1reTe">
      <ul>
        <li>
          <span class="info">
            <span>
              <svg fill="#4aa5f0" class="svg">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
              </svg>
              我的订单
            </span>
          </span>
          <span class="narrow">
            <svg fill="#bbb">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </span>
        </li>
        <li>
          <span class="info">
            <span>
              <svg fill="#fc7b53" class="svg">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
              </svg>
              积分商城
            </span>
          </span>
          <span class="narrow">
            <svg fill="#bbb">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </span>
        </li>
        <li>
          <span class="info">
            <span>
              <svg fill="#ffc636" class="svg">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#service"></use>
              </svg>
              饿了么会员卡
            </span>
          </span>
          <p class="narrow">
            <svg fill="#bbb">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </p>
        </li>
      </ul>
    </div>
    <div class="profile-1reTe">
      <ul>
        <li>
          <span class="info">
            <span>
              <svg fill="#4aa5f0" class="svg">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#service"></use>
              </svg>
              服务中心
            </span>
          </span>
          <span class="narrow">
            <svg fill="#bbb">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </span>
        </li>
        <li>
          <span class="info">
            <span>
              <svg fill="#3cabff" class="svg">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use>
              </svg>
              下载饿了么APP
            </span>
          </span>
          <span class="narrow">
            <svg fill="#bbb">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </span>
        </li>
      </ul>
    </div>
    <footer-guide></footer-guide>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import headTop from '../../components/header/header'
import footerGuide from '../../components/footer/footerGuide'
import {mapState} from 'vuex'
import {imgBaseUrl} from 'src/config/env'
export default {
  components: {
    headTop,
    footerGuide
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {
    userInfo: function (value){
      this.initData()
    }
 },
  data() {
    return {
      username: '登录注册',
      mobile: '暂无绑定手机号',
      imgBaseUrl,
      balance: 0,
      count: 0,
      pointNumber: 0
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      if (this.userInfo.user_id) {
        this.username = this.userInfo.username
        this.mobile = this.userInfo.mobile || this.mobile;
        this.balance = this.userInfo.balance
        this.count = this.userInfo.gift_amount
        this.pointNumber = this.userInfo.point
      } else {
        this.username = '登录/注册';
        this.mobile = '暂无绑定手机号';
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
.profile_container{
  padding-top: 1.95rem;
  p, span{
    font-family: Helvetica Neue,Tahoma,Arial;
  }
  .profile_info {
    background-color: $blue;
    overflow: hidden;
    padding: .4rem;
    .profile_left {
      float: left;
      @include fj;
      align-items: center;
      img {
        @include wh(2.5rem, 2.5rem);
        border-radius: 50%;
        vertical-align: middle;
      }
      .user_info {
        padding: .5rem;
        .username {
          @include sc (.8rem, #fff);
          font-weight: 700;
        }
        .mobile {
          @include sc(.57rem, #fff);
          margin-top: .2rem;
          span {
            color: #fff;
          }
        }
        .icon {
          .icon-mobile {
            @include wh(.5rem, .75rem);
          }
          vertical-align: middle;
          line-height: .75rem;
        }
      }
    }
    .profile_right {
      float: right;
      margin-top: .8rem;
      margin-right: .6rem;
      .arrow-svg {
        @include wh(.47rem, .98rem);
      }
    }
  }
  .profile_money {
    background-color: #fff;
    .money, .credit, .fav {
      padding: .8rem 0;
      @include fj;
      align-items: center;
      flex-direction: column;
      float: left;
      width: 33%;
      p {
        @include sc(.57rem, #666);
        font-weight: 400;
      }
    }
    .money, .fav {
      border-right: 1px solid #f1f1f1;
    }
    .money {
      span {
        @include sc(1.2rem, #f90);
        font-weight: 700;
      }
    }
    .fav {
      span {
        @include sc(1.2rem, #ff5f3c);
      }
    }
    .credit {
      span {
        @include sc(1.2rem, #6ac20b);
      }
    }
  }
  .profile-1reTe {
    background-color: #fff;
    margin-top: .6rem;
    ul li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: .5rem;
      border-bottom: 1px solid #f1f1f1;
     .info span:nth-child(1) {
       @include fj;
       align-items: center;
       @include sc(.7rem, #333);
       .svg {
         padding-right: .3rem;
         @include wh(.7rem, .7rem);
       }
     } 
     .narrow {
       @include fj;
       @include wh(.46rem, .46rem);
     }
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
  }
}
</style>