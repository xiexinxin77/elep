<template>
  <div class="page_container">
    <head-top goBack='true' head-title='在线支付'></head-top>
    <section class="show_time_amount">
      <section>
        <p>支付剩余时间</p>
        <p class="remainTime">{{remaining}}</p>
      </section>
    </section>
    <div class="pay_way">
      <header>选择支付方式</header>
      <ul>
        <li>
          <div class="pay_left">
            <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#weixin"></use>
            </svg>
            <span>微信</span>
          </div>
          <div class="pay_right">
            <svg class="choose_icon" @click="payWay = 1" :class="{choosed_way: payWay == 1}">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
            </svg>
          </div>
        </li>
        <li>
          <div class="pay_left">
            <svg-icon iconName='zhifubao'></svg-icon>
            <span>支付宝</span>
          </div>
          <div class="pay_right">
            <svg class="choose_icon" @click="payWay = 2" :class="{choosed_way: payWay == 2}">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
            </svg>
          </div>
        </li>
      </ul>
    </div>
    <div class="btn" @click="confrimPay">
      确认支付
    </div>
  </div>
</template>
<script>
import headTop from 'components/header/header'
export default {
  components: {
    headTop
  },
  data() {
    return {
      countNum: 900, // 倒计时15分钟
      timer: null,
      payWay: ''
    }
  },
  computed: {
    remaining() {
      let min = parseInt(this.countNum / 60)
      if (min < 10) {
        min = '0' + min
      }
      let second = parseInt(this.countNum % 60)
      if (second < 10) {
        second = '0' + min
      }
      return "00" + ":" + min + ":" + second
    }
  },
  mounted() {
    this.remainingTime()
  },
  methods: {
    remainingTime() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.countNum--;
        if (this.countNum == 0) {
          this.$alert({
            alertText: '支付超时',
            confirmBtnText: '确定'
          })
        }
      }, 1000) 
    },
    confrimPay() {
      this.$alert({
        alertText: '当前环境无法支付，请打开官方APP进行付款',
        confirmBtnText: '确定'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.page_container {
  padding-top: 1.95rem;
  .show_time_amount {
    position: relative;
    padding: .7rem;
    background-color: #fff;
    @include wh(100%, 7rem);
    section {
      @include center;
      p {
        text-align: center;
        margin-top: .5rem;
        @include sc(.6rem, #666);
      }
      .remainTime {
        @include sc(1.5rem, #333);
      }
    }
  }
  .pay_way {
    header {
      @include wh(100%, 2rem);
      padding-left: .7rem;
      line-height: 2rem;
      @include sc(.7rem, #666);
      background-color: #f1f1f1;
    }
    ul li {
      @include fj;
      align-items: center;
      padding: .6rem .7rem;
      background-color: #fff;
      border-bottom: 1px solid #f5f5f5;
      .pay_left {
        display: flex;
        align-items: center;
        svg {
          @include wh(2rem, 2rem);
          margin-right: .2rem;
        }
        span {
          @include sc(.7rem, #666);
        }
      }
      .pay_right {
        svg {
          @include wh(1rem, 1rem);
          fill: #ccc;
        }
        .choosed_way {
          fill: $green;
        }
      }
    }
  }
}
</style>