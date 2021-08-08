<template>
  <div class="rating_page">
    <head-top goBack='true' head-title='会员中心'></head-top>
    <section class="vip_container">
      <p class="buy_for">为账户<span>{{userInfo.username}}</span>购买会员</p>
      <div class="vip_prerogative">
        <header>
          <span class="vip_t">会员特权</span>
          <div class="vip_dec">
            <span>会员说明</span>
            <svg fill="#ccc">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </div>
        </header>
        <section class="vip_detail">
          <div class="vip_detail_left">
            <img src="../../images/sheng.jpeg" height="80" width="70">
          </div>
          <div class="vip_detail_right">
            <h4>减免配送费</h4>
            <p>每月减免30单,每日可减免3单,每单最高减4元</p>
            <p>蜂鸟专送专享</p>
          </div>
        </section>
        <section class="vip_detail">
          <div class="vip_detail_left">
            <img src="../../images/jifen.jpeg" height="80" width="70">
          </div>
          <div class="vip_detail_right">
            <h4>减免配送费</h4>
            <p>每月减免30单,每日可减免3单,每单最高减4元</p>
            <p>蜂鸟专送专享</p>
          </div>
        </section>
      </div>
      <router-link tag="div" to="/payment" class="open_vip">
        <header>开通会员</header>
        <section>
          <span>1个月<span class="price">$20</span></span>
          <span class="buy">购买</span>
        </section>
      </router-link>
      <router-link tag="div" to='/vipcard/useCart' class="head_style">
        <span class="head_left">兑换会员</span>
        <div class="head_right">
          <span>使用卡号卡密</span>
          <svg fill="#ccc">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </div>
      </router-link>
      <router-link tag="div" to="/vipcard/invoiceRecord" class="head_style">
        <span class="head_left">购买记录</span>
        <div class="head_right">
          <span>开发票</span>
          <svg fill="#ccc">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </div>
      </router-link>
    </section>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import headTop from 'components/header/header'
import {mapState} from 'vuex'
export default {
  components: {
    headTop
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.rating_page {
  padding-top: 1.95rem;
  .vip_container {
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
    .vip_prerogative {
      background-color: #fff;
      header {
        @include fj;
        padding: .5rem .7rem;
        border-bottom: 1px solid #f5f5f5;
        .vip_t {
          @include sc(.7rem, #333);
        }
        .vip_dec {
          display: flex;
          align-items: center;
          span {
            @include sc(.6rem, #999);
            margin-right: .2rem;
          }
          svg {
            @include wh(.5rem, .5rem);
          }
        }
      }
      .vip_detail {
        display: flex;
        align-items: center;
        padding: .5rem .7rem;
        border-bottom: 1px solid #f5f5f5;
        .vip_detail_left {
          img {
            @include wh(1.6rem, 1.8rem);
          }
        }
        .vip_detail_right {
          margin-left: .5rem;
          h4 {
            @include sc(.7rem, #333);
            font-weight: 400;
          }
          p {
            @include sc(.5rem, #999);
          }
        }
      }
    }
    .open_vip {
      background-color: #fff;
      margin-top: .7rem;
      header {
        @include sc(.7rem, #333);
        padding: .5rem .7rem;
        border-bottom: 1px solid #f5f5f5;
      }
      section {
        @include fj;
        padding: .5rem .7rem;
        span {
          font-size: .8rem;
        }
        .price {
          color: #f60;
          font-weight: 700;
        }
        .buy {
          @include wh(2.6rem, 1.2rem);
          border: 1px solid #f60;
          border-radius: .2rem;
          @include sc(.6rem, #f60);
          line-height: 1.2rem;
          text-align: center;
        }
      }
    }
    .head_style {
      @include fj;
      padding: .5rem .7rem;
      background-color: #fff;
      margin-top: .7rem;
      span {
        @include sc(.7rem, #333);
      }
      .head_right {
        display: flex;
        align-items: center;
        span {
          @include sc(.6rem, #999);
          margin-right: .2rem;
        }
        svg {
          @include wh(.5rem, .5rem);
        }
      }
    }
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